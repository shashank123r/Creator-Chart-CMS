import React, { useState } from 'react';
import { useApp } from '../App';
import { ContentItem, Platform, ContentStatus, PLATFORM_COLORS } from '../types';
import {
    formatRelativeDate,
    formatNumber,
    isStuck,
    getStuckBorderColor,
    getStatusBadgeClasses,
    getPlatformColorClass,
    filterContent,
    ALL_PLATFORMS,
    ALL_STATUSES,
    exportToCSV
} from '../utils/helpers';
import { teamMembers } from '../data/sampleData';
import { analyzeContentWithAI } from '../utils/mockAI';
import {
    Search,
    Filter,
    Download,
    Sparkles,
    Eye,
    ThumbsUp,
    MessageCircle,
    MoreVertical,
    AlertTriangle,
    X,
    Check,
    Loader2
} from 'lucide-react';

const ContentDatabase: React.FC = () => {
    const { content, setContent } = useApp();
    const [search, setSearch] = useState('');
    const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<ContentStatus | 'all'>('all');
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState({ message: '', progress: 0 });
    const [showAIResults, setShowAIResults] = useState(false);

    const filteredContent = filterContent(content, search, platformFilter, statusFilter);

    // Get team member name by ID
    const getTeamMemberName = (id: string) => {
        const member = teamMembers.find(m => m.id === id);
        return member?.name || 'Unassigned';
    };

    // Handle AI analysis
    const handleAnalyze = async (item: ContentItem) => {
        setSelectedContent(item);
        setIsAnalyzing(true);
        setShowAIResults(false);

        try {
            const result = await analyzeContentWithAI(
                item.title,
                item.description,
                item.platform,
                (message, progress) => setAnalysisProgress({ message, progress })
            );

            // Update content with AI results
            setContent(prev => prev.map(c =>
                c.id === item.id
                    ? { ...c, aiSummary: result.summary, aiTitles: result.titleVariations }
                    : c
            ));

            setSelectedContent(prev => prev ? {
                ...prev,
                aiSummary: result.summary,
                aiTitles: result.titleVariations
            } : null);

            setShowAIResults(true);
        } catch (error) {
            console.error('AI Analysis failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Database</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and analyze all your content in one place.</p>
                </div>
                <button
                    onClick={() => exportToCSV(filteredContent)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search content..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        />
                    </div>

                    {/* Platform Filter */}
                    <select
                        value={platformFilter}
                        onChange={(e) => setPlatformFilter(e.target.value as Platform | 'all')}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    >
                        <option value="all">All Platforms</option>
                        {ALL_PLATFORMS.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as ContentStatus | 'all')}
                        className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    >
                        <option value="all">All Statuses</option>
                        {ALL_STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* Platform chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <button
                        onClick={() => setPlatformFilter('all')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${platformFilter === 'all'
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        All ({content.length})
                    </button>
                    {ALL_PLATFORMS.map(platform => {
                        const count = content.filter(c => c.platform === platform).length;
                        return (
                            <button
                                key={platform}
                                onClick={() => setPlatformFilter(platform)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${platformFilter === platform
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {platform} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Platform</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metrics</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredContent.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-l-4 ${getStuckBorderColor(item)}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-start space-x-3">
                                            {isStuck(item) && (
                                                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.description}</p>
                                                {item.aiSummary && (
                                                    <span className="inline-flex items-center mt-1 text-xs text-purple-600 dark:text-purple-400">
                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                        AI Analyzed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white ${getPlatformColorClass(item.platform)}`}
                                        >
                                            {item.platform}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(item.status)}`}>
                                            {item.status}
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.daysInStage}d in stage</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{getTeamMemberName(item.assignedTo)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status === 'Published' ? (
                                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center"><Eye className="w-3 h-3 mr-1" />{formatNumber(item.metrics.views)}</span>
                                                <span className="flex items-center"><ThumbsUp className="w-3 h-3 mr-1" />{formatNumber(item.metrics.likes)}</span>
                                                <span className="flex items-center"><MessageCircle className="w-3 h-3 mr-1" />{item.metrics.comments}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleAnalyze(item)}
                                            disabled={isAnalyzing}
                                            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            <span>Analyze with AI</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredContent.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No content found matching your filters.</p>
                    </div>
                )}
            </div>

            {/* AI Analysis Modal */}
            {(isAnalyzing || showAIResults) && selectedContent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6">
                        {isAnalyzing ? (
                            <div className="text-center py-8">
                                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyzing Content</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{analysisProgress.message}</p>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${analysisProgress.progress}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="w-5 h-5 text-purple-500" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analysis Results</h3>
                                    </div>
                                    <button onClick={() => setShowAIResults(false)} className="text-gray-400 hover:text-gray-600">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                            {selectedContent.aiSummary}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title Variations</h4>
                                        <div className="space-y-2">
                                            {selectedContent.aiTitles?.map((title, i) => (
                                                <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
                                                    <button className="text-indigo-500 hover:text-indigo-600 text-xs font-medium">Copy</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowAIResults(false)}
                                    className="w-full mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentDatabase;
