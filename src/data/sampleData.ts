// Sample data for Creator Content Management System
import { ContentItem, CreatorProfile, TeamMember, ActivityEntry, Platform, ContentStatus } from '../types';

// Helper to create dates relative to today
const daysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

// Team Members (5-7 people with different roles)
export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Sarah Chen', role: 'Content Manager', email: 'sarah@creatorchart.com', avatar: 'SC', activeTasksCount: 5 },
    { id: 'tm2', name: 'Mike Johnson', role: 'Content Creator', email: 'mike@creatorchart.com', avatar: 'MJ', activeTasksCount: 4 },
    { id: 'tm3', name: 'Emily Rodriguez', role: 'Designer', email: 'emily@creatorchart.com', avatar: 'ER', activeTasksCount: 3 },
    { id: 'tm4', name: 'David Kim', role: 'Social Media Manager', email: 'david@creatorchart.com', avatar: 'DK', activeTasksCount: 6 },
    { id: 'tm5', name: 'Lisa Wang', role: 'Analyst', email: 'lisa@creatorchart.com', avatar: 'LW', activeTasksCount: 2 },
    { id: 'tm6', name: 'James Cooper', role: 'Video Producer', email: 'james@creatorchart.com', avatar: 'JC', activeTasksCount: 4 },
    { id: 'tm7', name: 'Anna Patel', role: 'Community Manager', email: 'anna@creatorchart.com', avatar: 'AP', activeTasksCount: 3 },
];

// Content Items (20-25 diverse items)
export const contentItems: ContentItem[] = [
    // Published items with metrics
    {
        id: 'c1', title: '10 LinkedIn Growth Hacks for B2B Founders', description: 'Comprehensive guide on leveraging LinkedIn for business growth',
        platform: 'LinkedIn', status: 'Published', assignedTo: 'tm2', createdDate: daysAgo(14), lastUpdated: daysAgo(2), publishDate: daysAgo(2),
        metrics: { views: 12500, likes: 890, comments: 156, shares: 234 }, aiSummary: null, aiTitles: null, daysInStage: 2
    },
    {
        id: 'c2', title: 'Behind the Scenes: Our Content Creation Process', description: 'Instagram carousel showing our workflow',
        platform: 'Instagram', status: 'Published', assignedTo: 'tm3', createdDate: daysAgo(10), lastUpdated: daysAgo(3), publishDate: daysAgo(3),
        metrics: { views: 8900, likes: 1250, comments: 89, shares: 167 }, aiSummary: null, aiTitles: null, daysInStage: 3
    },
    {
        id: 'c3', title: 'The Future of AI in Content Marketing', description: 'Deep dive thread on AI tools transforming content creation',
        platform: 'X', status: 'Published', assignedTo: 'tm2', createdDate: daysAgo(7), lastUpdated: daysAgo(1), publishDate: daysAgo(1),
        metrics: { views: 45000, likes: 2340, comments: 456, shares: 890 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c4', title: 'How We Grew to 100K Subscribers', description: 'YouTube documentary on our newsletter growth journey',
        platform: 'YouTube', status: 'Published', assignedTo: 'tm6', createdDate: daysAgo(21), lastUpdated: daysAgo(5), publishDate: daysAgo(5),
        metrics: { views: 67000, likes: 4500, comments: 890, shares: 1200 }, aiSummary: null, aiTitles: null, daysInStage: 5
    },
    {
        id: 'c5', title: 'Weekly Creator Economy Insights #47', description: 'Newsletter covering latest trends and opportunities',
        platform: 'Newsletter', status: 'Published', assignedTo: 'tm1', createdDate: daysAgo(8), lastUpdated: daysAgo(1), publishDate: daysAgo(1),
        metrics: { views: 15600, likes: 0, comments: 45, shares: 230 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },

    // Review stage items
    {
        id: 'c6', title: 'Creator Monetization Strategies for 2024', description: 'Substack article on diverse revenue streams',
        platform: 'Substack', status: 'Review', assignedTo: 'tm1', createdDate: daysAgo(5), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c7', title: 'Reddit AMA: Building a Creator Business', description: 'Planned AMA session in r/Entrepreneur',
        platform: 'Reddit', status: 'Review', assignedTo: 'tm7', createdDate: daysAgo(4), lastUpdated: daysAgo(2), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 2
    },
    {
        id: 'c8', title: 'Instagram Reels: 5 Hooks That Convert', description: 'Educational reel on content hooks',
        platform: 'Instagram', status: 'Review', assignedTo: 'tm3', createdDate: daysAgo(3), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },

    // Design stage items
    {
        id: 'c9', title: 'The Ultimate Guide to Content Repurposing', description: 'Long-form LinkedIn article with infographics',
        platform: 'LinkedIn', status: 'Design', assignedTo: 'tm3', createdDate: daysAgo(6), lastUpdated: daysAgo(2), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 2
    },
    {
        id: 'c10', title: 'YouTube Thumbnail A/B Testing Results', description: 'Video breaking down our thumbnail experiments',
        platform: 'YouTube', status: 'Design', assignedTo: 'tm6', createdDate: daysAgo(4), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c11', title: 'Newsletter Design Best Practices', description: 'Collection of newsletter layout tips',
        platform: 'Newsletter', status: 'Design', assignedTo: 'tm3', createdDate: daysAgo(8), lastUpdated: daysAgo(4), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 4
    },

    // Drafting stage items (some stuck)
    {
        id: 'c12', title: 'X Threads That Went Viral: Analysis', description: 'Breaking down successful viral threads',
        platform: 'X', status: 'Drafting', assignedTo: 'tm2', createdDate: daysAgo(9), lastUpdated: daysAgo(5), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 5
    },
    {
        id: 'c13', title: 'Reddit Community Building Strategies', description: 'Guide to growing subreddit communities',
        platform: 'Reddit', status: 'Drafting', assignedTo: 'tm7', createdDate: daysAgo(7), lastUpdated: daysAgo(4), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 4
    },
    {
        id: 'c14', title: 'Substack vs ConvertKit: Deep Comparison', description: 'Detailed platform comparison article',
        platform: 'Substack', status: 'Drafting', assignedTo: 'tm5', createdDate: daysAgo(5), lastUpdated: daysAgo(2), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 2
    },
    {
        id: 'c15', title: 'Instagram Algorithm Changes 2024', description: 'Analysis of recent algorithm updates',
        platform: 'Instagram', status: 'Drafting', assignedTo: 'tm4', createdDate: daysAgo(11), lastUpdated: daysAgo(6), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 6
    },

    // Ideation stage items
    {
        id: 'c16', title: 'LinkedIn Creator Mode Deep Dive', description: 'Exploring all features of creator mode',
        platform: 'LinkedIn', status: 'Ideation', assignedTo: 'tm2', createdDate: daysAgo(2), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c17', title: 'YouTube Shorts Strategy Guide', description: 'How to leverage Shorts for growth',
        platform: 'YouTube', status: 'Ideation', assignedTo: 'tm6', createdDate: daysAgo(3), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c18', title: 'X Premium Features Worth Using', description: 'Review of X Premium subscription features',
        platform: 'X', status: 'Ideation', assignedTo: 'tm4', createdDate: daysAgo(1), lastUpdated: daysAgo(0), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 0
    },
    {
        id: 'c19', title: 'Newsletter Sponsorship Guide', description: 'How to attract and manage sponsors',
        platform: 'Newsletter', status: 'Ideation', assignedTo: 'tm1', createdDate: daysAgo(2), lastUpdated: daysAgo(1), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 1
    },
    {
        id: 'c20', title: 'Reddit Gold: Mining Niche Communities', description: 'Finding valuable subreddits for marketing',
        platform: 'Reddit', status: 'Ideation', assignedTo: 'tm7', createdDate: daysAgo(4), lastUpdated: daysAgo(2), publishDate: null,
        metrics: { views: 0, likes: 0, comments: 0, shares: 0 }, aiSummary: null, aiTitles: null, daysInStage: 2
    },

    // Additional published items for variety
    {
        id: 'c21', title: 'How to Build a Personal Brand on LinkedIn', description: 'Step-by-step branding guide',
        platform: 'LinkedIn', status: 'Published', assignedTo: 'tm2', createdDate: daysAgo(20), lastUpdated: daysAgo(12), publishDate: daysAgo(12),
        metrics: { views: 34000, likes: 2100, comments: 340, shares: 560 }, aiSummary: null, aiTitles: null, daysInStage: 12
    },
    {
        id: 'c22', title: 'Instagram Stories vs Reels: Data Analysis', description: 'Which format performs better',
        platform: 'Instagram', status: 'Published', assignedTo: 'tm5', createdDate: daysAgo(18), lastUpdated: daysAgo(10), publishDate: daysAgo(10),
        metrics: { views: 21000, likes: 1800, comments: 210, shares: 380 }, aiSummary: null, aiTitles: null, daysInStage: 10
    },
    {
        id: 'c23', title: 'The Psychology of Viral Content', description: 'What makes content shareable',
        platform: 'Substack', status: 'Published', assignedTo: 'tm1', createdDate: daysAgo(25), lastUpdated: daysAgo(18), publishDate: daysAgo(18),
        metrics: { views: 8900, likes: 620, comments: 89, shares: 145 }, aiSummary: null, aiTitles: null, daysInStage: 18
    },
    {
        id: 'c24', title: 'Creator Tools We Use Daily', description: 'Our tech stack revealed',
        platform: 'YouTube', status: 'Published', assignedTo: 'tm6', createdDate: daysAgo(15), lastUpdated: daysAgo(8), publishDate: daysAgo(8),
        metrics: { views: 52000, likes: 3200, comments: 567, shares: 890 }, aiSummary: null, aiTitles: null, daysInStage: 8
    },
    {
        id: 'c25', title: 'Building in Public: Month 6 Update', description: 'Transparent growth journey thread',
        platform: 'X', status: 'Published', assignedTo: 'tm4', createdDate: daysAgo(12), lastUpdated: daysAgo(6), publishDate: daysAgo(6),
        metrics: { views: 28000, likes: 1900, comments: 280, shares: 450 }, aiSummary: null, aiTitles: null, daysInStage: 6
    },
];

// Sample creator profiles
export const creatorProfiles: CreatorProfile[] = [
    {
        id: 'cr1', name: 'Alex Thompson', email: 'alex@startup.io', platform: 'LinkedIn', followerCount: '15000',
        description: 'Building SaaS products and sharing the journey. Focus on B2B marketing and growth strategies.',
        goals: ['Grow audience', 'Build authority'],
        aiNiche: 'Tech/Business', aiPlatformFocus: 'LinkedIn + X', aiStage: 'Growing Audience',
        aiRecommendations: ['Focus on thought leadership posts', 'Start a weekly newsletter', 'Engage with industry leaders', 'Create case studies'],
        submittedDate: daysAgo(5)
    },
    {
        id: 'cr2', name: 'Maya Patel', email: 'maya@designstudio.co', platform: 'Instagram', followerCount: '45000',
        description: 'UX designer sharing design tips, Figma tutorials, and creative process insights.',
        goals: ['Monetize content', 'Launch course'],
        aiNiche: 'Design/Creative', aiPlatformFocus: 'Instagram + YouTube', aiStage: 'Scaling & Monetizing',
        aiRecommendations: ['Launch a design course', 'Create template products', 'Partner with design tools', 'Start YouTube tutorials'],
        submittedDate: daysAgo(3)
    },
];

// Activity log
export const activityLog: ActivityEntry[] = [
    { id: 'a1', type: 'status_change', contentId: 'c3', contentTitle: 'The Future of AI in Content Marketing', userId: 'tm2', userName: 'Mike Johnson', description: 'Moved to Published', timestamp: daysAgo(1) },
    { id: 'a2', type: 'ai_analysis', contentId: 'c1', contentTitle: '10 LinkedIn Growth Hacks', userId: 'tm1', userName: 'Sarah Chen', description: 'Ran AI analysis', timestamp: daysAgo(2) },
    { id: 'a3', type: 'content_added', contentId: 'c18', contentTitle: 'X Premium Features Worth Using', userId: 'tm4', userName: 'David Kim', description: 'Created new content', timestamp: daysAgo(1) },
    { id: 'a4', type: 'creator_added', userId: 'tm1', userName: 'Sarah Chen', description: 'Added new creator: Maya Patel', timestamp: daysAgo(3) },
    { id: 'a5', type: 'status_change', contentId: 'c6', contentTitle: 'Creator Monetization Strategies', userId: 'tm1', userName: 'Sarah Chen', description: 'Moved to Review', timestamp: daysAgo(1) },
];

// Get team member by ID
export const getTeamMember = (id: string): TeamMember | undefined => {
    return teamMembers.find(tm => tm.id === id);
};

// Get content by status
export const getContentByStatus = (status: ContentStatus): ContentItem[] => {
    return contentItems.filter(item => item.status === status);
};

// Get stuck items (>3 days in stage)
export const getStuckItems = (): ContentItem[] => {
    return contentItems.filter(item => item.daysInStage > 3 && item.status !== 'Published');
};

// Get high performers (published with high engagement)
export const getHighPerformers = (): ContentItem[] => {
    return contentItems
        .filter(item => item.status === 'Published')
        .sort((a, b) => (b.metrics.views + b.metrics.likes * 10) - (a.metrics.views + a.metrics.likes * 10))
        .slice(0, 5);
};
