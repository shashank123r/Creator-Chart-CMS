import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, LayoutDashboard, Database, Kanban, Users, BarChart3, UserPlus, Bell, Plus } from 'lucide-react';

interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    targetSelector?: string;
    position: 'center' | 'left' | 'right' | 'bottom';
}

const tourSteps: TourStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to Creator Chart! 🎉',
        description: 'Your all-in-one content management system for creators. Let us show you around!',
        icon: <Sparkles className="w-8 h-8" />,
        position: 'center'
    },
    {
        id: 'dashboard',
        title: 'Dashboard Overview',
        description: 'Get a quick snapshot of your content performance. Click on any stat card to dive deeper into that section.',
        icon: <LayoutDashboard className="w-6 h-6" />,
        position: 'center'
    },
    {
        id: 'sidebar',
        title: 'Navigation Sidebar',
        description: 'Use the sidebar to navigate between different sections: Dashboard, Content Database, Pipeline, Team, Analytics, and more.',
        icon: <LayoutDashboard className="w-6 h-6" />,
        position: 'right'
    },
    {
        id: 'content-database',
        title: 'Content Database',
        description: 'Manage all your content in one place. Filter by platform, status, and search for specific items. Use AI analysis to get insights!',
        icon: <Database className="w-6 h-6" />,
        position: 'center'
    },
    {
        id: 'pipeline',
        title: 'Pipeline Board',
        description: 'Visualize your content workflow with a Kanban-style board. Drag and drop items between stages: Ideation → Drafting → Design → Review → Published.',
        icon: <Kanban className="w-6 h-6" />,
        position: 'center'
    },
    {
        id: 'team',
        title: 'Team Management',
        description: 'View your team members, their roles, and workload. See who is assigned to which content pieces.',
        icon: <Users className="w-6 h-6" />,
        position: 'center'
    },
    {
        id: 'analytics',
        title: 'Analytics Dashboard',
        description: 'Track your content performance with detailed analytics. See views, engagement rates, and trends over time.',
        icon: <BarChart3 className="w-6 h-6" />,
        position: 'center'
    },
    {
        id: 'add-content',
        title: 'Add New Content',
        description: 'Click the "Add Content" button to create a new content piece. Fill in the details and assign it to a team member.',
        icon: <Plus className="w-6 h-6" />,
        position: 'left'
    },
    {
        id: 'notifications',
        title: 'Stay Updated',
        description: 'Click the bell icon to see recent activity and notifications. You can dismiss individual items or clear all at once.',
        icon: <Bell className="w-6 h-6" />,
        position: 'left'
    },
    {
        id: 'complete',
        title: "You're All Set! 🚀",
        description: 'You now know the basics. Start creating amazing content! You can restart this tour anytime from the sidebar.',
        icon: <Sparkles className="w-8 h-8" />,
        position: 'center'
    }
];

interface OnboardingTourProps {
    onComplete: () => void;
    isOpen: boolean;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, isOpen }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const step = tourSteps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === tourSteps.length - 1;
    const progress = ((currentStep + 1) / tourSteps.length) * 100;

    const handleNext = useCallback(() => {
        if (isLastStep) {
            onComplete();
        } else {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 150);
        }
    }, [isLastStep, onComplete]);

    const handlePrev = useCallback(() => {
        if (!isFirstStep) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                setIsAnimating(false);
            }, 150);
        }
    }, [isFirstStep]);

    const handleSkip = useCallback(() => {
        onComplete();
    }, [onComplete]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'Escape') {
                handleSkip();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev, handleSkip]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleSkip}
            />

            {/* Tour Card */}
            <div
                className={`
                    relative z-10 w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden
                    transform transition-all duration-300
                    ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
            >
                {/* Progress Bar */}
                <div className="h-1 bg-gray-100 dark:bg-gray-700">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Step {currentStep + 1} of {tourSteps.length}
                    </span>
                    <button
                        onClick={handleSkip}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Skip tour (Esc)"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-8 text-center">
                    <div className={`
                        inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                        bg-gradient-to-br from-indigo-500 to-purple-600 text-white
                    `}>
                        {step.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                    </p>
                </div>

                {/* Navigation */}
                <div className="px-6 pb-6 flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={isFirstStep}
                        className={`
                            flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${isFirstStep
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                        `}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    {/* Step Dots */}
                    <div className="flex items-center gap-1.5">
                        {tourSteps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`
                                    w-2 h-2 rounded-full transition-all
                                    ${index === currentStep
                                        ? 'w-6 bg-indigo-500'
                                        : index < currentStep
                                            ? 'bg-indigo-300 dark:bg-indigo-700'
                                            : 'bg-gray-200 dark:bg-gray-600'}
                                `}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        {isLastStep ? 'Get Started' : 'Next'}
                        {!isLastStep && <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>

                {/* Keyboard Hint */}
                <div className="px-6 pb-4 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Use ← → arrows to navigate, Esc to skip
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OnboardingTour;
