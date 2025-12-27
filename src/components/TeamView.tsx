import React from 'react';
import { useApp } from '../App';
import { teamMembers } from '../data/sampleData';
import { formatNumber } from '../utils/helpers';
import { Mail, Briefcase, CheckCircle2, Clock } from 'lucide-react';

const TeamView: React.FC = () => {
    const { content, team } = useApp();

    // Calculate workload for each team member
    const getWorkload = (memberId: string) => {
        return content.filter(c => c.assignedTo === memberId && c.status !== 'Published').length;
    };

    const getPublished = (memberId: string) => {
        return content.filter(c => c.assignedTo === memberId && c.status === 'Published').length;
    };

    const getTotalEngagement = (memberId: string) => {
        return content
            .filter(c => c.assignedTo === memberId && c.status === 'Published')
            .reduce((sum, c) => sum + c.metrics.views + c.metrics.likes * 10, 0);
    };

    // Color classes for avatars
    const avatarColors = [
        'from-blue-500 to-indigo-600',
        'from-pink-500 to-rose-600',
        'from-green-500 to-emerald-600',
        'from-purple-500 to-violet-600',
        'from-orange-500 to-amber-600',
        'from-cyan-500 to-teal-600',
        'from-red-500 to-pink-600',
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your team and track workload distribution.</p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Members</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{team.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Tasks</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {content.filter(c => c.status !== 'Published').length}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Published Content</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {content.filter(c => c.status === 'Published').length}
                    </p>
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => {
                    const workload = getWorkload(member.id);
                    const published = getPublished(member.id);
                    const engagement = getTotalEngagement(member.id);
                    const workloadPercent = Math.min((workload / 5) * 100, 100);

                    return (
                        <div
                            key={member.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            {/* Member Info */}
                            <div className="flex items-start space-x-4 mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{member.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                        <Briefcase className="w-3 h-3 mr-1" />
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center mt-1">
                                        <Mail className="w-3 h-3 mr-1" />
                                        {member.email}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{workload}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{published}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(engagement)}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                                </div>
                            </div>

                            {/* Workload Bar */}
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-500 dark:text-gray-400">Workload</span>
                                    <span className={`font-medium ${workloadPercent > 80 ? 'text-red-500' : workloadPercent > 50 ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {workload} tasks
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${workloadPercent > 80 ? 'bg-red-500' : workloadPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${workloadPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Workload Distribution Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workload Distribution</h2>
                <div className="space-y-3">
                    {teamMembers.map((member, index) => {
                        const workload = getWorkload(member.id);
                        const percent = Math.min((workload / 8) * 100, 100);
                        return (
                            <div key={member.id} className="flex items-center space-x-4">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                                    {member.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{member.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{workload} tasks</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full bg-gradient-to-r ${avatarColors[index % avatarColors.length]}`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TeamView;
