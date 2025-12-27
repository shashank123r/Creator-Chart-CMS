import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../App';
import { Sun, Moon, Bell, Plus, Search, X, Clock, FileText, Users, Sparkles } from 'lucide-react';
import AddContentModal from './AddContentModal';
import { activityLog } from '../data/sampleData';

interface HeaderProps {
    onAddContent?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState(activityLog);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'status_change': return <Clock className="w-4 h-4 text-blue-500" />;
            case 'content_added': return <FileText className="w-4 h-4 text-green-500" />;
            case 'ai_analysis': return <Sparkles className="w-4 h-4 text-purple-500" />;
            case 'creator_added': return <Users className="w-4 h-4 text-orange-500" />;
            default: return <Bell className="w-4 h-4 text-gray-500" />;
        }
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - new Date(date).getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    };

    const clearNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <>
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Search */}
                    <div className="flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search content, creators, team..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Quick Add Button */}
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add Content</span>
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={clearAllNotifications}
                                                className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                <p className="text-sm">No notifications</p>
                                            </div>
                                        ) : (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-50 dark:border-gray-700/50 last:border-0"
                                                >
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        {getActivityIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                                                            {notification.contentTitle || notification.description}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {notification.userName} • {formatTimeAgo(notification.timestamp)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => clearNotification(notification.id)}
                                                        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* User Avatar */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                SC
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Add Content Modal */}
            <AddContentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </>
    );
};

export default Header;
