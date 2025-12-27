import React from 'react';
import { ViewType } from '../App';
import {
    LayoutDashboard,
    Database,
    Kanban,
    Users,
    BarChart3,
    UserPlus,
    FileText,
    Sparkles
} from 'lucide-react';

interface SidebarProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
    onStartTour: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onStartTour }) => {
    const menuItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'database', label: 'Content Database', icon: <Database className="w-5 h-5" /> },
        { id: 'pipeline', label: 'Pipeline Board', icon: <Kanban className="w-5 h-5" /> },
        { id: 'team', label: 'Team', icon: <Users className="w-5 h-5" /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 'intake', label: 'Creator Intake', icon: <UserPlus className="w-5 h-5" /> },
        { id: 'docs', label: 'System Docs', icon: <FileText className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Creator Chart</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Content Management</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${activeView === item.id
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
            `}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <button
                    onClick={onStartTour}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors border border-gray-200 dark:border-gray-600"
                >
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span>Restart Tour</span>
                </button>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">AI-Powered</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Content analysis and creator classification powered by intelligent automation.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
