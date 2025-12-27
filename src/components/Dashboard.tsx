import React from 'react';
import { useApp } from '../App';
import { ViewType } from '../App';
import { formatNumber, formatRelativeDate, isStuck, getEngagementRate } from '../utils/helpers';
import { TrendingUp, Eye, ThumbsUp, MessageCircle, Share2, AlertTriangle, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { activityLog } from '../data/sampleData';

const Dashboard: React.FC = () => {
    const { content, creators, team, navigateTo } = useApp();

    // Calculate metrics
    const totalContent = content.length;
    const publishedThisWeek = content.filter(c =>
        c.status === 'Published' &&
        c.publishDate &&
        (new Date().getTime() - c.publishDate.getTime()) < 7 * 24 * 60 * 60 * 1000
    ).length;
    const stuckItems = content.filter(isStuck).length;
    const totalViews = content.reduce((sum, c) => sum + c.metrics.views, 0);
    const totalLikes = content.reduce((sum, c) => sum + c.metrics.likes, 0);
    const avgEngagement = content.filter(c => c.status === 'Published').reduce((sum, c) => {
        const rate = parseFloat(getEngagementRate(c.metrics));
        return sum + (isNaN(rate) ? 0 : rate);
    }, 0) / (publishedThisWeek || 1);

    const metricCards: { label: string; value: string | number; icon: React.ReactNode; color: string; change: string; navigateTo: ViewType }[] = [
        { label: 'Total Content', value: totalContent, icon: <Zap className="w-5 h-5" />, color: 'from-blue-500 to-indigo-500', change: '+12%', navigateTo: 'database' },
        { label: 'Published This Week', value: publishedThisWeek, icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-500 to-emerald-500', change: '+5%', navigateTo: 'analytics' },
        { label: 'Total Views', value: formatNumber(totalViews), icon: <Eye className="w-5 h-5" />, color: 'from-purple-500 to-pink-500', change: '+24%', navigateTo: 'analytics' },
        { label: 'Stuck Items', value: stuckItems, icon: <AlertTriangle className="w-5 h-5" />, color: stuckItems > 0 ? 'from-red-500 to-orange-500' : 'from-gray-400 to-gray-500', change: stuckItems > 0 ? 'Needs attention' : 'All clear!', navigateTo: 'pipeline' },
    ];

    // Top performing content
    const topContent = [...content]
        .filter(c => c.status === 'Published')
        .sort((a, b) => b.metrics.views - a.metrics.views)
        .slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's your content performance overview.</p>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricCards.map((card, i) => (
                    <div
                        key={i}
                        onClick={() => navigateTo(card.navigateTo)}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                                {card.icon}
                            </div>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                                {card.change}
                                <ArrowUpRight className="w-3 h-3 ml-1" />
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {activityLog.slice(0, 5).map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                <div className={`
                  p-2 rounded-lg
                  ${activity.type === 'status_change' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : ''}
                  ${activity.type === 'ai_analysis' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : ''}
                  ${activity.type === 'content_added' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : ''}
                  ${activity.type === 'creator_added' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : ''}
                `}>
                                    {activity.type === 'status_change' && <TrendingUp className="w-4 h-4" />}
                                    {activity.type === 'ai_analysis' && <Zap className="w-4 h-4" />}
                                    {activity.type === 'content_added' && <MessageCircle className="w-4 h-4" />}
                                    {activity.type === 'creator_added' && <Share2 className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        <span className="font-medium">{activity.userName}</span> {activity.description}
                                        {activity.contentTitle && (
                                            <span className="text-indigo-600 dark:text-indigo-400"> "{activity.contentTitle}"</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {formatRelativeDate(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performers</h2>
                    <div className="space-y-4">
                        {topContent.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <span className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        index === 1 ? 'bg-gray-100 text-gray-700' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-50 text-gray-500'}
                `}>
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatNumber(item.metrics.views)} views • {formatNumber(item.metrics.likes)} likes
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
                    <Eye className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalViews)}</p>
                    <p className="text-sm opacity-80">Total Views</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 text-white">
                    <ThumbsUp className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{formatNumber(totalLikes)}</p>
                    <p className="text-sm opacity-80">Total Likes</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white">
                    <Clock className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</p>
                    <p className="text-sm opacity-80">Avg Engagement</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-4 text-white">
                    <Zap className="w-6 h-6 mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{creators.length}</p>
                    <p className="text-sm opacity-80">Creators Onboarded</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
