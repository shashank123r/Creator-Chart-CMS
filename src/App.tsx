import React, { useState, createContext, useContext, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentDatabase from './components/ContentDatabase';
import PipelineBoard from './components/PipelineBoard';
import TeamView from './components/TeamView';
import Analytics from './components/Analytics';
import CreatorIntake from './components/CreatorIntake';
import SystemDocs from './components/SystemDocs';
import OnboardingTour from './components/OnboardingTour';
import { ContentItem, CreatorProfile, TeamMember } from './types';
import { contentItems as initialContent, teamMembers, creatorProfiles as initialCreators, activityLog } from './data/sampleData';

// View type
export type ViewType = 'dashboard' | 'database' | 'pipeline' | 'team' | 'analytics' | 'intake' | 'docs';

// Theme context
interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ isDark: false, toggleTheme: () => { } });

// App context for shared state
interface AppContextType {
    content: ContentItem[];
    setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
    creators: CreatorProfile[];
    setCreators: React.Dispatch<React.SetStateAction<CreatorProfile[]>>;
    team: TeamMember[];
    navigateTo: (view: ViewType) => void;
}

export const AppContext = createContext<AppContextType>({
    content: [],
    setContent: () => { },
    creators: [],
    setCreators: () => { },
    team: [],
    navigateTo: () => { },
});

// Custom hook to use app context
export const useApp = () => useContext(AppContext);
export const useTheme = () => useContext(ThemeContext);

const App: React.FC = () => {
    // State
    const [activeView, setActiveView] = useState<ViewType>('dashboard');
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });
    const [content, setContent] = useState<ContentItem[]>(initialContent);
    const [creators, setCreators] = useState<CreatorProfile[]>(initialCreators);

    // Onboarding tour state
    const [showTour, setShowTour] = useState(() => {
        const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
        return !hasSeenTour;
    });

    // Apply dark mode class to document
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const handleTourComplete = () => {
        setShowTour(false);
        localStorage.setItem('hasSeenOnboardingTour', 'true');
    };

    const startTour = () => {
        setShowTour(true);
    };

    // Render active view
    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'database':
                return <ContentDatabase />;
            case 'pipeline':
                return <PipelineBoard />;
            case 'team':
                return <TeamView />;
            case 'analytics':
                return <Analytics />;
            case 'intake':
                return <CreatorIntake />;
            case 'docs':
                return <SystemDocs />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <AppContext.Provider value={{ content, setContent, creators, setCreators, team: teamMembers, navigateTo: setActiveView }}>
                <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
                    <div className="flex">
                        {/* Sidebar */}
                        <Sidebar activeView={activeView} onViewChange={setActiveView} onStartTour={startTour} />

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1 p-6 overflow-auto">
                                {renderView()}
                            </main>
                        </div>
                    </div>
                </div>

                {/* Onboarding Tour */}
                <OnboardingTour isOpen={showTour} onComplete={handleTourComplete} />
            </AppContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;

