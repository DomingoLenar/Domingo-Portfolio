import { useSyncExternalStore } from "react";

// Live Discord presence via Lanyard (https://github.com/Phineas/lanyard).
// Works because the account is a member of the Lanyard Discord server. No key needed; the user ID is public.
// One shared WebSocket for every component that calls useLanyard().

export const DISCORD_USER_ID = "322304768280100864";

const REST_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const SOCKET_URL = "wss://api.lanyard.rest/socket";

let presence = null;
const listeners = new Set();
let socket = null;
let heartbeat = null;
let reconnectTimer = null;
let retries = 0;

const emit = (next) => {
    presence = next;
    listeners.forEach((listener) => listener());
};

// Initial state over REST, so the cards show something even before the socket connects
const fetchOnce = async () => {
    try {
        const res = await fetch(REST_URL);
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && !presence) emit(json.data);
    } catch {
        // Offline / blocked: the socket (or nothing) will fill in
    }
};

const connect = () => {
    if (socket || typeof WebSocket === "undefined") return;

    const ws = new WebSocket(SOCKET_URL);
    socket = ws;

    ws.onmessage = (event) => {
        if (socket !== ws) return;
        let message;
        try {
            message = JSON.parse(event.data);
        } catch {
            return;
        }

        if (message.op === 1) {
            // Hello: start heartbeating and subscribe to this user
            clearInterval(heartbeat);
            heartbeat = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
            }, message.d.heartbeat_interval);
            ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }));
        } else if (message.op === 0 && (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE")) {
            retries = 0;
            emit(message.d);
        }
    };

    ws.onclose = () => {
        if (socket !== ws) return; // an old socket we already replaced or closed on purpose
        clearInterval(heartbeat);
        socket = null;
        if (listeners.size === 0) return;
        // Reconnect with backoff: 1s, 2s, 4s ... up to 30s
        reconnectTimer = setTimeout(connect, Math.min(30_000, 1000 * 2 ** retries++));
    };

    ws.onerror = () => ws.close();
};

const disconnect = () => {
    clearTimeout(reconnectTimer);
    clearInterval(heartbeat);
    const ws = socket;
    socket = null;
    ws?.close();
};

const subscribe = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
        if (!presence) fetchOnce();
        connect();
    }
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) disconnect();
    };
};

/** Latest Lanyard presence object, or null until it loads. */
export const useLanyard = () => useSyncExternalStore(subscribe, () => presence, () => null);
