// Mock AI utilities for content analysis and creator classification
import { AIContentAnalysis, AICreatorClassification } from '../types';

// Simulate API delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Keywords for niche detection
const nicheKeywords: Record<string, string[]> = {
    'Tech/Business': ['startup', 'saas', 'business', 'entrepreneur', 'tech', 'software', 'b2b', 'growth', 'marketing', 'product'],
    'Design/Creative': ['design', 'creative', 'art', 'ux', 'ui', 'figma', 'visual', 'brand', 'graphic', 'illustration'],
    'Health & Wellness': ['fitness', 'health', 'wellness', 'nutrition', 'workout', 'mental', 'meditation', 'yoga', 'mindfulness'],
    'Finance': ['finance', 'invest', 'money', 'trading', 'crypto', 'wealth', 'financial', 'stocks', 'budget', 'savings'],
    'Education': ['learn', 'teach', 'education', 'course', 'tutorial', 'skills', 'training', 'knowledge', 'study'],
    'Lifestyle': ['lifestyle', 'travel', 'food', 'fashion', 'beauty', 'home', 'decor', 'personal', 'daily'],
    'Entertainment': ['entertainment', 'gaming', 'music', 'comedy', 'movies', 'streaming', 'fun', 'humor'],
};

// Platform recommendations by niche
const platformRecommendations: Record<string, string[]> = {
    'Tech/Business': ['LinkedIn', 'X', 'Substack'],
    'Design/Creative': ['Instagram', 'YouTube', 'Dribbble'],
    'Health & Wellness': ['Instagram', 'YouTube', 'TikTok'],
    'Finance': ['YouTube', 'X', 'Substack'],
    'Education': ['YouTube', 'LinkedIn', 'Substack'],
    'Lifestyle': ['Instagram', 'YouTube', 'TikTok'],
    'Entertainment': ['YouTube', 'TikTok', 'X'],
};

// Topics extraction from text
const extractTopics = (text: string): string[] => {
    const words = text.toLowerCase().split(/\s+/);
    const topics: string[] = [];

    const topicPatterns = [
        { pattern: /linkedin|professional|network/i, topic: 'LinkedIn Strategy' },
        { pattern: /instagram|reels|stories/i, topic: 'Instagram Marketing' },
        { pattern: /youtube|video|subscriber/i, topic: 'YouTube Growth' },
        { pattern: /twitter|x|thread/i, topic: 'X/Twitter Engagement' },
        { pattern: /content|creator|create/i, topic: 'Content Creation' },
        { pattern: /ai|automation|tool/i, topic: 'AI & Automation' },
        { pattern: /growth|scale|audience/i, topic: 'Audience Growth' },
        { pattern: /monetiz|revenue|income/i, topic: 'Monetization' },
        { pattern: /brand|personal|authority/i, topic: 'Personal Branding' },
        { pattern: /engag|community|follower/i, topic: 'Community Building' },
    ];

    topicPatterns.forEach(({ pattern, topic }) => {
        if (pattern.test(text) && !topics.includes(topic)) {
            topics.push(topic);
        }
    });

    return topics.slice(0, 4);
};

// Generate summary based on content
const generateSummary = (title: string, description: string, platform: string): string => {
    const topics = extractTopics(title + ' ' + description);
    const mainTopic = topics[0] || 'content strategy';

    const templates = [
        `This ${platform} content explores ${mainTopic.toLowerCase()}, providing actionable insights for creators looking to expand their reach. The piece combines practical strategies with real-world examples.`,
        `A comprehensive guide to ${mainTopic.toLowerCase()} tailored for ${platform} audiences. This content offers valuable takeaways for both beginners and experienced creators.`,
        `Focused on ${mainTopic.toLowerCase()}, this ${platform} piece delivers expert insights and proven strategies for building a sustainable creator business.`,
    ];

    return templates[Math.floor(Math.random() * templates.length)];
};

// Generate title variations
const generateTitleVariations = (title: string): string[] => {
    // Extract key concepts from title
    const words = title.split(' ');
    const mainConcept = words.slice(0, 3).join(' ');

    // Clean up the title for template insertion
    const topic = title.replace(/^\d+\s+/, '').replace(/^(How to|The|A|An)\s+/i, '');

    return [
        // Question-based
        `How Can ${topic} Transform Your Creator Journey?`,
        // List-based
        `7 Proven Ways to Master ${topic} in 2024`,
        // Value-focused
        `The Complete Guide to ${topic} for Modern Creators`,
    ];
};

// Detect niche from description
const detectNiche = (description: string): string => {
    const lowerDesc = description.toLowerCase();

    for (const [niche, keywords] of Object.entries(nicheKeywords)) {
        const matches = keywords.filter(kw => lowerDesc.includes(kw));
        if (matches.length >= 2) {
            return niche;
        }
    }

    // Default based on single keyword match
    for (const [niche, keywords] of Object.entries(nicheKeywords)) {
        if (keywords.some(kw => lowerDesc.includes(kw))) {
            return niche;
        }
    }

    return 'General Creator';
};

// Determine monetization stage from follower count
const determineStage = (followerCount: string): string => {
    const count = parseInt(followerCount.replace(/[^\d]/g, '')) || 0;

    if (count < 1000) return 'Building Foundation';
    if (count < 10000) return 'Growing Audience';
    if (count < 50000) return 'Scaling & Monetizing';
    return 'Established Creator';
};

// Generate recommendations based on profile
const generateRecommendations = (
    niche: string,
    stage: string,
    platform: string,
    goals: string[]
): string[] => {
    const recommendations: string[] = [];

    // Stage-based recommendations
    switch (stage) {
        case 'Building Foundation':
            recommendations.push('Focus on consistent posting schedule (3-5x weekly)');
            recommendations.push('Engage actively with your target audience daily');
            recommendations.push('Study top creators in your niche for inspiration');
            break;
        case 'Growing Audience':
            recommendations.push('Start collaborating with creators of similar size');
            recommendations.push('Consider launching a newsletter to own your audience');
            recommendations.push('Experiment with different content formats');
            break;
        case 'Scaling & Monetizing':
            recommendations.push('Explore sponsorship and brand partnership opportunities');
            recommendations.push('Consider creating a digital product or course');
            recommendations.push('Build a team to help with content production');
            break;
        case 'Established Creator':
            recommendations.push('Focus on diversifying revenue streams');
            recommendations.push('Consider building a media company or agency');
            recommendations.push('Mentor emerging creators in your space');
            break;
    }

    // Niche-specific additions
    if (niche === 'Tech/Business') {
        recommendations.push('Share behind-the-scenes of your business journey');
    } else if (niche === 'Design/Creative') {
        recommendations.push('Create tutorials and process videos');
    }

    // Goal-based additions
    if (goals.includes('Grow audience')) {
        recommendations.push('Optimize your profile for discoverability');
    }
    if (goals.includes('Monetize content')) {
        recommendations.push('Research monetization programs for ' + platform);
    }

    return recommendations.slice(0, 5);
};

// Main function: Analyze content with AI
export const analyzeContentWithAI = async (
    title: string,
    description: string,
    platform: string,
    onProgress?: (message: string, progress: number) => void
): Promise<AIContentAnalysis> => {
    // Simulate progress updates
    onProgress?.('Analyzing content structure...', 20);
    await delay(800);

    onProgress?.('Extracting key topics and themes...', 40);
    await delay(700);

    onProgress?.('Generating title variations...', 60);
    await delay(600);

    onProgress?.('Creating content summary...', 80);
    await delay(500);

    onProgress?.('Finalizing recommendations...', 100);
    await delay(400);

    return {
        summary: generateSummary(title, description, platform),
        titleVariations: generateTitleVariations(title),
        topics: extractTopics(title + ' ' + description),
    };
};

// Main function: Classify creator profile
export const classifyCreatorWithAI = async (
    name: string,
    platform: string,
    followerCount: string,
    description: string,
    goals: string[],
    onProgress?: (message: string, progress: number) => void
): Promise<AICreatorClassification> => {
    onProgress?.('Analyzing your content focus...', 25);
    await delay(800);

    const niche = detectNiche(description);
    onProgress?.('Identifying growth opportunities...', 50);
    await delay(700);

    const stage = determineStage(followerCount);
    onProgress?.('Mapping monetization potential...', 75);
    await delay(600);

    const platformFocus = platformRecommendations[niche]?.slice(0, 2).join(' + ') || platform;
    const recommendations = generateRecommendations(niche, stage, platform, goals);

    onProgress?.('Generating personalized recommendations...', 100);
    await delay(500);

    return {
        niche,
        platformFocus,
        stage,
        recommendations,
    };
};
