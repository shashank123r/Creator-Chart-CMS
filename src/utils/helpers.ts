// Utility helper functions
import { ContentItem, ContentStatus, Platform } from '../types';

// Format date to relative string (e.g., "2 days ago")
export const formatRelativeDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
};

// Format date to short string
export const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Format number with K/M suffix
export const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// Calculate total engagement
export const calculateEngagement = (metrics: ContentItem['metrics']): number => {
    return metrics.views + metrics.likes * 10 + metrics.comments * 20 + metrics.shares * 30;
};

// Get engagement rate
export const getEngagementRate = (metrics: ContentItem['metrics']): string => {
    if (metrics.views === 0) return '0%';
    const engagements = metrics.likes + metrics.comments + metrics.shares;
    const rate = (engagements / metrics.views) * 100;
    return rate.toFixed(1) + '%';
};

// Check if content is stuck (>3 days in stage)
export const isStuck = (item: ContentItem): boolean => {
    return item.daysInStage > 3 && item.status !== 'Published';
};

// Check if content is very stuck (>5 days)
export const isVeryStuck = (item: ContentItem): boolean => {
    return item.daysInStage > 5 && item.status !== 'Published';
};

// Get border color based on stuck status
export const getStuckBorderColor = (item: ContentItem): string => {
    if (isVeryStuck(item)) return 'border-red-500';
    if (isStuck(item)) return 'border-yellow-500';
    return 'border-transparent';
};

// Generate unique ID
export const generateId = (): string => {
    return 'id_' + Math.random().toString(36).substring(2, 9);
};

// Get platform icon color class
export const getPlatformColorClass = (platform: Platform): string => {
    const colors: Record<Platform, string> = {
        LinkedIn: 'bg-[#0077B5]',
        Instagram: 'bg-[#E4405F]',
        X: 'bg-black',
        Reddit: 'bg-[#FF4500]',
        Substack: 'bg-[#FF6719]',
        YouTube: 'bg-[#FF0000]',
        Newsletter: 'bg-gray-500',
    };
    return colors[platform];
};

// Get status color class
export const getStatusColorClass = (status: ContentStatus): string => {
    const colors: Record<ContentStatus, string> = {
        Ideation: 'bg-gray-500',
        Drafting: 'bg-blue-500',
        Design: 'bg-purple-500',
        Review: 'bg-orange-500',
        Published: 'bg-green-500',
    };
    return colors[status];
};

// Get status badge classes
export const getStatusBadgeClasses = (status: ContentStatus): string => {
    const classes: Record<ContentStatus, string> = {
        Ideation: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        Drafting: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        Design: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        Review: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        Published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return classes[status];
};

// All statuses in order
export const ALL_STATUSES: ContentStatus[] = ['Ideation', 'Drafting', 'Design', 'Review', 'Published'];

// All platforms
export const ALL_PLATFORMS: Platform[] = ['LinkedIn', 'Instagram', 'X', 'Reddit', 'Substack', 'YouTube', 'Newsletter'];

// Filter content items
export const filterContent = (
    items: ContentItem[],
    search: string,
    platformFilter: Platform | 'all',
    statusFilter: ContentStatus | 'all'
): ContentItem[] => {
    return items.filter(item => {
        const matchesSearch = search === '' ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter;
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesPlatform && matchesStatus;
    });
};

// Export content to CSV
export const exportToCSV = (items: ContentItem[]): void => {
    const headers = ['Title', 'Platform', 'Status', 'Assigned To', 'Created', 'Views', 'Likes', 'Comments', 'Shares'];
    const rows = items.map(item => [
        item.title,
        item.platform,
        item.status,
        item.assignedTo,
        formatShortDate(item.createdDate),
        item.metrics.views,
        item.metrics.likes,
        item.metrics.comments,
        item.metrics.shares,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-export.csv';
    a.click();
    URL.revokeObjectURL(url);
};
