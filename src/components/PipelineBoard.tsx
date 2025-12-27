import React, { useState } from 'react';
import { useApp } from '../App';
import { ContentItem, ContentStatus, PLATFORM_COLORS } from '../types';
import { isStuck, isVeryStuck, getStatusColorClass, getPlatformColorClass, formatNumber } from '../utils/helpers';
import { teamMembers } from '../data/sampleData';
import { GripVertical, Clock, AlertTriangle, ChevronDown, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

const PipelineBoard: React.FC = () => {
    const { content, setContent } = useApp();
    const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);

    const statuses: ContentStatus[] = ['Ideation', 'Drafting', 'Design', 'Review', 'Published'];

    const getContentByStatus = (status: ContentStatus) =>
        content.filter(item => item.status === status);

    const getTeamMemberName = (id: string) => {
        const member = teamMembers.find(m => m.id === id);
        return member?.name || 'Unassigned';
    };

    const handleDragStart = (e: React.DragEvent, item: ContentItem) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, newStatus: ContentStatus) => {
        e.preventDefault();
        if (draggedItem && draggedItem.status !== newStatus) {
            setContent(prev => prev.map(item =>
                item.id === draggedItem.id
                    ? { ...item, status: newStatus, daysInStage: 0, lastUpdated: new Date() }
                    : item
            ));
        }
        setDraggedItem(null);
    };

    const moveToStatus = (item: ContentItem, newStatus: ContentStatus) => {
        setContent(prev => prev.map(c =>
            c.id === item.id
                ? { ...c, status: newStatus, daysInStage: 0, lastUpdated: new Date() }
                : c
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pipeline Board</h1>
                <p className="text-gray-500 dark:text-gray-400">Drag and drop content through your workflow stages.</p>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-3">
                {statuses.map((status) => {
                    const items = getContentByStatus(status);
                    const stuckCount = items.filter(isStuck).length;

                    return (
                        <div
                            key={status}
                            className="flex-1 min-w-[180px]"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            {/* Column Header */}
                            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColorClass(status)}`} />
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{status}</h3>
                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                                        {items.length}
                                    </span>
                                </div>
                                {stuckCount > 0 && (
                                    <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                        {stuckCount}
                                    </span>
                                )}
                            </div>

                            {/* Cards Container */}
                            <div className="space-y-3 min-h-[200px] bg-gray-50 dark:bg-gray-800/50 rounded-b-xl p-3 border border-t-0 border-gray-200 dark:border-gray-700">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        className={`
                      bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-2 cursor-grab active:cursor-grabbing
                      transition-all duration-200 hover:shadow-md
                      ${isVeryStuck(item) ? 'border-red-400' : isStuck(item) ? 'border-yellow-400' : 'border-transparent'}
                      ${draggedItem?.id === item.id ? 'opacity-50' : ''}
                    `}
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getPlatformColorClass(item.platform)}`}>
                                                {item.platform}
                                            </span>
                                            <GripVertical className="w-4 h-4 text-gray-400" />
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                                            {item.title}
                                        </h4>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            <span>{getTeamMemberName(item.assignedTo).split(' ')[0]}</span>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-3 h-3" />
                                                <span className={isStuck(item) ? 'text-yellow-600 dark:text-yellow-400 font-medium' : ''}>
                                                    {item.daysInStage}d
                                                </span>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 py-2 px-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                {item.status === 'Published' ? formatNumber(item.metrics.views) : '-'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3" />
                                                {item.status === 'Published' ? formatNumber(item.metrics.likes) : '-'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-3 h-3" />
                                                {item.status === 'Published' ? item.metrics.comments : '-'}
                                            </span>
                                        </div>

                                        {/* Quick Actions */}
                                        {status !== 'Published' && (
                                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                                <select
                                                    value=""
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            moveToStatus(item, e.target.value as ContentStatus);
                                                        }
                                                    }}
                                                    className="w-full px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                >
                                                    <option value="">Move to...</option>
                                                    {statuses.filter(s => s !== status).map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Stuck Warning */}
                                        {isStuck(item) && (
                                            <div className="mt-2 flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                                                <AlertTriangle className="w-3 h-3 mr-1" />
                                                Stuck for {item.daysInStage} days
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {items.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                                        No items in {status}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-yellow-400 rounded" />
                    <span>Stuck ({'>'}3 days)</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-red-400 rounded" />
                    <span>Very Stuck ({'>'}5 days)</span>
                </div>
            </div>
        </div>
    );
};

export default PipelineBoard;
