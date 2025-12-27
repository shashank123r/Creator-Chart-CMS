import React from 'react';
import { useApp } from '../App';
import { Platform, ContentStatus, PLATFORM_COLORS, STATUS_COLORS } from '../types';
import { formatNumber } from '../utils/helpers';
import { teamMembers } from '../data/sampleData';
import { TrendingUp, Eye, ThumbsUp, MessageCircle, Share2, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
    const { content } = useApp();

    // Platform distribution
    const platformData = (['LinkedIn', 'Instagram', 'X', 'Reddit', 'Substack', 'YouTube', 'Newsletter'] as Platform[]).map(platform => ({
        platform,
        count: content.filter(c => c.platform === platform).length,
        published: content.filter(c => c.platform === platform && c.status === 'Published').length,
        views: content.filter(c => c.platform === platform).reduce((sum, c) => sum + c.metrics.views, 0),
        color: PLATFORM_COLORS[platform],
    }));

    // Status distribution
    const statusData = (['Ideation', 'Drafting', 'Design', 'Review', 'Published'] as ContentStatus[]).map(status => ({
        status,
        count: content.filter(c => c.status === status).length,
        color: STATUS_COLORS[status],
    }));

    // Team performance
    const teamData = teamMembers.map(member => ({
        member,
        published: content.filter(c => c.assignedTo === member.id && c.status === 'Published').length,
        views: content.filter(c => c.assignedTo === member.id).reduce((sum, c) => sum + c.metrics.views, 0),
    })).sort((a, b) => b.views - a.views);

    // Top content
    const topContent = [...content]
        .filter(c => c.status === 'Published')
        .sort((a, b) => b.metrics.views - a.metrics.views)
        .slice(0, 5);

    // Total metrics
    const totalViews = content.reduce((sum, c) => sum + c.metrics.views, 0);
    const totalLikes = content.reduce((sum, c) => sum + c.metrics.likes, 0);
    const totalComments = content.reduce((sum, c) => sum + c.metrics.comments, 0);
    const totalShares = content.reduce((sum, c) => sum + c.metrics.shares, 0);

    const maxPlatformViews = Math.max(...platformData.map(p => p.views));
    const maxTeamViews = Math.max(...teamData.map(t => t.views));
    const totalStatusCount = statusData.reduce((sum, s) => sum + s.count, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400">Track your content performance across all platforms.</p>
            </div>

            {/* Total Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                    <Eye className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalViews)}</p>
                    <p className="text-sm opacity-80">Total Views</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 text-white">
                    <ThumbsUp className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalLikes)}</p>
                    <p className="text-sm opacity-80">Total Likes</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
                    <MessageCircle className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalComments)}</p>
                    <p className="text-sm opacity-80">Comments</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
                    <Share2 className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalShares)}</p>
                    <p className="text-sm opacity-80">Shares</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
                        Content by Platform
                    </h2>
                    <div className="space-y-4">
                        {platformData.map(({ platform, count, views, color }) => (
                            <div key={platform}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{platform}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatNumber(views)} views</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${maxPlatformViews ? (views / maxPlatformViews) * 100 : 0}%`,
                                            backgroundColor: color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Distribution (Donut-like visualization) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Status Distribution</h2>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-40 h-40">
                            {/* Simple pie-like visualization */}
                            <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700" />
                            {statusData.map((item, index) => {
                                const angle = (item.count / totalStatusCount) * 360;
                                const previousAngle = statusData.slice(0, index).reduce((sum, s) => sum + (s.count / totalStatusCount) * 360, 0);
                                return (
                                    <div
                                        key={item.status}
                                        className="absolute inset-2 rounded-full"
                                        style={{
                                            background: `conic-gradient(transparent ${previousAngle}deg, ${item.color} ${previousAngle}deg ${previousAngle + angle}deg, transparent ${previousAngle + angle}deg)`,
                                        }}
                                    />
                                );
                            })}
                            <div className="absolute inset-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{content.length}</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {statusData.map(({ status, count, color }) => (
                            <div key={status} className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{status} ({count})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Performance */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Team Performance
                    </h2>
                    <div className="space-y-4">
                        {teamData.slice(0, 5).map(({ member, published, views }) => (
                            <div key={member.id}>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                            {member.avatar}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{member.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{published} published</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                                        style={{ width: `${maxTeamViews ? (views / maxTeamViews) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performing Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Content</h2>
                    <div className="space-y-4">
                        {topContent.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <span className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        index === 1 ? 'bg-gray-100 text-gray-700' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-50 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}
                `}>
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                                    <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span style={{ color: PLATFORM_COLORS[item.platform] }}>{item.platform}</span>
                                        <span>{formatNumber(item.metrics.views)} views</span>
                                        <span>{formatNumber(item.metrics.likes)} likes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
