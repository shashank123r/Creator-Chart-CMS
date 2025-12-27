// TypeScript interfaces for Creator Content Management System

// Platform types
export type Platform = 'LinkedIn' | 'Instagram' | 'X' | 'Reddit' | 'Substack' | 'YouTube' | 'Newsletter';

// Content status stages
export type ContentStatus = 'Ideation' | 'Drafting' | 'Design' | 'Review' | 'Published';

// Content Item - core data structure for content pieces
export interface ContentItem {
    id: string;
    title: string;
    description: string;
    platform: Platform;
    status: ContentStatus;
    assignedTo: string;
    createdDate: Date;
    lastUpdated: Date;
    publishDate: Date | null;
    metrics: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
    };
    aiSummary: string | null;
    aiTitles: string[] | null;
    daysInStage: number;
}

// Creator Profile - for intake form submissions
export interface CreatorProfile {
    id: string;
    name: string;
    email: string;
    platform: string;
    followerCount: string;
    description: string;
    goals: string[];
    aiNiche: string | null;
    aiPlatformFocus: string | null;
    aiStage: string | null;
    aiRecommendations: string[] | null;
    submittedDate: Date;
}

// Team Member
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    avatar: string;
    activeTasksCount: number;
}

// Activity log entry
export interface ActivityEntry {
    id: string;
    type: 'status_change' | 'content_added' | 'ai_analysis' | 'creator_added';
    contentId?: string;
    contentTitle?: string;
    userId: string;
    userName: string;
    description: string;
    timestamp: Date;
}

// Platform colors for consistent styling
export const PLATFORM_COLORS: Record<Platform, string> = {
    LinkedIn: '#0077B5',
    Instagram: '#E4405F',
    X: '#000000',
    Reddit: '#FF4500',
    Substack: '#FF6719',
    YouTube: '#FF0000',
    Newsletter: '#6B7280',
};

// Status colors
export const STATUS_COLORS: Record<ContentStatus, string> = {
    Ideation: '#6B7280',
    Drafting: '#3B82F6',
    Design: '#8B5CF6',
    Review: '#F59E0B',
    Published: '#10B981',
};

// AI Analysis result type
export interface AIContentAnalysis {
    summary: string;
    titleVariations: string[];
    topics: string[];
}

// AI Creator Classification result
export interface AICreatorClassification {
    niche: string;
    platformFocus: string;
    stage: string;
    recommendations: string[];
}
