import { GitHubCalendar } from 'react-github-calendar';

const purpleTheme = {
  light: ['#ebedf0', '#3c1866', '#5d249a', '#7d2ecd', '#8a2be2'],
  dark: ['#161b22', '#3c1866', '#5d249a', '#7d2ecd', '#8a2be2']
};

export const GithubSection = () => {
    return (
        <section className="py-16 px-4 relative">
            <div className="container mx-auto max-w-5xl flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    GitHub <span className="text-gradient-xaise pb-1">Activity</span>
                </h2>
                
                <div className="bg-card p-4 md:p-8 rounded-2xl shadow-lg gradient-border w-full overflow-x-auto flex justify-center">
                    <div className="min-w-max">
                        {/* Desktop Calendar */}
                        <div className="hidden md:block pb-2">
                            <GitHubCalendar 
                                username="DomingoLenar" 
                                colorScheme="dark"
                                theme={purpleTheme}
                                year="last"
                                blockSize={12}
                                blockMargin={4}
                                fontSize={14}
                            />
                        </div>
                        {/* Mobile Calendar */}
                        <div className="block md:hidden pb-2">
                            <GitHubCalendar 
                                username="DomingoLenar" 
                                colorScheme="dark"
                                theme={purpleTheme}
                                year="last"
                                blockSize={4}
                                blockMargin={2}
                                fontSize={10}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
