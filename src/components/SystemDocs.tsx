import React, { useState } from 'react';
import { FileText, Lightbulb, Code, Workflow, ArrowRight, ChevronDown, ChevronUp, Sparkles, Users, Shield, Bell, Layout, BarChart3, Zap, Database, BookOpen, Clock, AlertTriangle, CheckCircle, GitBranch, Server, Cpu, TrendingUp, DollarSign, Target, Layers, Settings, Table } from 'lucide-react';

interface Improvement {
    title: string;
    what: string;
    why: string;
    how: string;
    impact: string;
    icon: React.ReactNode;
    currentChallenge: string;
    timeline: string;
    costEstimate: string;
    successMetrics: string;
    exampleTools: string[];
    detailedDescription: string[];
}

const SystemDocs: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>('overview');
    const [expandedImprovement, setExpandedImprovement] = useState<number | null>(null);

    const improvements: Improvement[] = [
        {
            title: 'Role-Based Access Control',
            icon: <Shield className="w-5 h-5" />,
            what: 'Implement granular permissions system with roles like Admin, Manager, Creator, and Viewer.',
            why: 'As the team grows from 3 to 15, not everyone needs access to everything. Prevent accidental changes and maintain security.',
            how: 'Add user roles table, middleware for permission checks, and role assignment UI. Use JWT claims for role verification.',
            impact: 'Reduces errors by 60%, improves security, enables delegation of responsibilities.',
            currentChallenge: 'Currently all team members have identical access levels. A creator can accidentally delete content, modify analytics, or change system settings. This creates risk of data loss and makes it difficult to onboard contractors or part-time contributors safely.',
            timeline: '2-3 weeks',
            costEstimate: '$2,000 - $5,000',
            successMetrics: '60% reduction in accidental modifications, 100% of sensitive actions logged, ability to onboard contractors without security concerns',
            exampleTools: ['Auth0', 'Clerk', 'NextAuth.js', 'Supabase Auth'],
            detailedDescription: [
                'The Role-Based Access Control (RBAC) system addresses a critical scaling challenge: as teams grow, the risk of accidental or unauthorized changes multiplies exponentially. With 15 people having identical access, the probability of someone accidentally deleting important content or misconfiguring settings becomes unacceptable.',
                'Implementation involves creating a roles database table, adding permission middleware to all API endpoints, and building an admin UI for role assignment. Each user action will be checked against their role\'s permission set before execution. JWT tokens will carry role claims for efficient client-side permission checking.',
                'The ROI on this improvement is substantial: enterprise clients consistently report 60%+ reduction in support tickets related to "accidental changes" after implementing RBAC. Additionally, this enables hiring contractors and freelancers without security concerns, which is essential for scaling content production.',
            ],
        },
        {
            title: 'Automated Notifications & Reminders',
            icon: <Bell className="w-5 h-5" />,
            what: 'Smart notification system for stuck content, deadline reminders, and workflow updates.',
            why: 'With 15 people, manual tracking becomes impossible. Automated alerts ensure nothing falls through the cracks.',
            how: 'Integrate with Slack/Email via n8n webhooks. Set up cron jobs for daily digest and instant alerts for critical items.',
            impact: 'Reduces stuck content by 75%, improves response time, ensures accountability.',
            currentChallenge: 'Items can sit in stages for days without anyone noticing. The Content Manager manually checks the pipeline board daily but still misses stuck items. No one is automatically notified when content is assigned to them or when items approach deadlines.',
            timeline: '1-2 weeks',
            costEstimate: '$500 - $1,500',
            successMetrics: '75% reduction in items stuck >3 days, average response time under 4 hours, 100% of assignments acknowledged',
            exampleTools: ['n8n', 'Slack API', 'SendGrid', 'Twilio'],
            detailedDescription: [
                'The current system relies entirely on team members manually checking the pipeline board. This works with 3 people but completely breaks down at 15. The psychology is simple: if no one is pinging you about something, it\'s easy to forget. Automated notifications solve this by proactively reaching out when action is needed.',
                'The notification system uses n8n (self-hosted automation) to connect pipeline status changes to communication channels. When content moves to a new stage, the next owner gets a Slack message. When items are stuck >3 days, the content manager gets an alert. Daily digests summarize the entire pipeline state.',
                'This improvement has one of the fastest ROIs: teams typically see 75% reduction in stuck content within the first week of deployment. The psychological shift from "pull" (checking the board) to "push" (notifications finding you) dramatically improves response times and accountability.',
            ],
        },
        {
            title: 'Content Template Library',
            icon: <Layout className="w-5 h-5" />,
            what: 'Pre-built templates for different content types and platforms with best practices built-in.',
            why: 'New team members need quick onboarding. Templates ensure brand consistency and quality standards.',
            how: 'Create template database with fields for platform, format, and structure. Add template selection in content creation flow.',
            impact: 'Cuts onboarding time by 50%, ensures brand consistency, speeds up content creation.',
            currentChallenge: 'Each creator reinvents the wheel for every piece of content. New hires take weeks to understand brand voice and format preferences. Content quality varies widely depending on who creates it. No institutional knowledge is captured.',
            timeline: '2-3 weeks',
            costEstimate: '$1,000 - $3,000',
            successMetrics: '50% reduction in onboarding time, 90%+ brand consistency score, 30% faster content creation for templated types',
            exampleTools: ['Notion Templates', 'Craft', 'Slite', 'Custom Template Engine'],
            detailedDescription: [
                'Content templates are the secret weapon of high-performing creator teams. Without them, every new content piece starts from a blank slate. With them, creators start with 50% of the work already done: structure, format, key sections, and brand voice are all pre-configured.',
                'The template library includes templates for each platform (LinkedIn post, Instagram carousel, X thread, etc.) and content type (how-to, listicle, case study, etc.). Each template includes: suggested structure, word count targets, visual asset requirements, and example hooks that have performed well historically.',
                'Beyond creation efficiency, templates are essential for maintaining brand consistency at scale. When 15 people are creating content, slight variations in tone and format can dilute brand identity. Templates ensure that regardless of who creates the content, it feels cohesive and on-brand.',
            ],
        },
        {
            title: 'Batch Operations & Bulk Editing',
            icon: <Zap className="w-5 h-5" />,
            what: 'Select multiple content items to update status, reassign, or apply tags simultaneously.',
            why: 'Managing 100+ content items individually is inefficient. Bulk operations save hours weekly.',
            how: 'Add multi-select UI with action toolbar. Implement batch API endpoints for status/assignment changes.',
            impact: 'Saves 5+ hours/week, enables quick reorganization, improves workflow efficiency.',
            currentChallenge: 'Reassigning 20 items from one creator to another requires 20 individual clicks. Changing the status of all items in "Review" to "Published" after approval takes forever. The Content Manager spends hours on tedious one-by-one operations.',
            timeline: '1-2 weeks',
            costEstimate: '$1,000 - $2,000',
            successMetrics: '5+ hours saved per week, ability to reorganize 50+ items in under 5 minutes, 90% of operations completed in batch mode',
            exampleTools: ['Custom Multi-Select UI', 'Airtable-style Batch API', 'Notion Bulk Operations'],
            detailedDescription: [
                'Batch operations seem like a minor convenience until you\'re managing 100+ content items. At that scale, individual operations become a significant time sink. A content restructuring that would take 2 hours with one-by-one operations can be completed in 10 minutes with batch editing.',
                'Implementation involves adding a multi-select mode to the content table and pipeline board, along with an action toolbar that appears when items are selected. Backend batch endpoints are optimized to handle 100+ items in a single transaction, with proper error handling for partial failures.',
                'The psychological benefit of batch operations is also important: they make large-scale changes feel achievable rather than daunting. When restructuring content feels easy, teams are more likely to regularly reorganize and optimize their pipeline rather than letting it accumulate cruft.',
            ],
        },
        {
            title: 'Advanced Analytics & Reporting',
            icon: <BarChart3 className="w-5 h-5" />,
            what: 'Detailed performance reports, trend analysis, and exportable dashboards for stakeholders.',
            why: 'Data-driven decisions require comprehensive analytics. Stakeholders need regular performance updates.',
            how: 'Integrate with analytics APIs, build custom dashboard builder, implement scheduled report generation.',
            impact: 'Enables data-driven strategy, improves stakeholder communication, identifies growth opportunities.',
            currentChallenge: 'Performance data is scattered across 7+ platforms with no unified view. The team manually compiles metrics into spreadsheets monthly. There\'s no way to see which content types perform best or identify trends over time.',
            timeline: '3-4 weeks',
            costEstimate: '$3,000 - $8,000',
            successMetrics: 'All metrics in one dashboard, automated weekly reports, ability to answer any performance question in under 1 minute',
            exampleTools: ['Mixpanel', 'Amplitude', 'Metabase', 'Looker'],
            detailedDescription: [
                'Analytics at scale is fundamentally different from analytics for a small team. With 3 people and 20 content pieces, you can track performance in your head. With 15 people and 200+ content pieces, you need systematic analysis to understand what\'s working and what\'s not.',
                'The advanced analytics system pulls metrics from all platform APIs (LinkedIn, Instagram, YouTube, X, etc.) into a unified dashboard. Custom reports can be configured to track KPIs like engagement rate by platform, content type performance, creator productivity, and pipeline velocity.',
                'Perhaps most importantly, scheduled reports keep stakeholders informed without manual effort. Weekly performance summaries, monthly trend reports, and quarterly strategic reviews are automatically generated and distributed. This frees up the Content Manager from hours of manual report building.',
            ],
        },
    ];

    const sections = [
        { id: 'overview', title: 'System Overview', icon: <FileText /> },
        { id: 'database', title: 'Database Architecture', icon: <Database /> },
        { id: 'process', title: 'Workflow Process', icon: <Workflow /> },
        { id: 'ai', title: 'AI Automation', icon: <Sparkles /> },
        { id: 'scaling', title: 'Scaling Improvements', icon: <Lightbulb /> },
        { id: 'technical', title: 'Technical Architecture', icon: <Code /> },
        { id: 'notion', title: 'Notion Implementation', icon: <BookOpen /> },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Documentation</h1>
                <p className="text-gray-500 dark:text-gray-400">Complete guide to the Creator Chart Content Management System.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Documentation</h3>
                        <nav className="space-y-1">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setExpandedSection(section.id)}
                                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${expandedSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {section.icon}
                                    <span>{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* System Overview */}
                    {expandedSection === 'overview' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">System Overview</h2>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Creator Chart CMS is a comprehensive content management system designed for creator teams. It provides end-to-end workflow management from ideation to publication.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Key Features</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> Multi-platform content tracking (7+ platforms)</li>
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> 5-stage pipeline: Ideation → Drafting → Design → Review → Published</li>
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> AI-powered content analysis and title generation</li>
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> Creator onboarding with intelligent classification</li>
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> Team workload visualization and management</li>
                                    <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> Bottleneck detection (items stuck {'>'}3 days)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">User Roles</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Content Manager</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Oversees pipeline, assigns tasks, reviews content</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Content Creator</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Creates and drafts content pieces</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Designer</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Creates visual assets and designs</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Analyst</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tracks performance and generates insights</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Database Architecture */}
                    {expandedSection === 'database' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Database className="w-6 h-6 mr-2 text-indigo-500" />
                                Database Architecture
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                The system uses three interconnected databases to manage content workflow, team coordination, and creator onboarding. Each database is designed with specific fields to support the complete content lifecycle.
                            </p>

                            {/* Table 1: Content Pipeline */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Table className="w-5 h-5 mr-2 text-blue-500" />
                                    1. Content Pipeline Database
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Tracks all content pieces from ideation to publication with performance metrics.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Field</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Type</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Purpose</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr><td className="px-3 py-2 font-mono text-xs">id</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Unique identifier (UUID)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">title</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Content headline/title</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">description</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Content summary/brief</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">platform</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">Platform</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Target platform (LinkedIn, Instagram, X, etc.)</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">status</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">ContentStatus</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Current pipeline stage</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">assignedTo</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Team member ID (FK to Team Members)</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">createdDate</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">Date</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">When content was created</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">lastUpdated</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">Date</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Last modification timestamp</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">publishDate</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">Date | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Publication date (null if unpublished)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">metrics</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">Object</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">{'{views, likes, comments, shares}'}</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">daysInStage</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">number</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Days in current stage (bottleneck tracking)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">aiSummary</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">AI-generated content summary</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">aiTitles</td><td className="px-3 py-2 text-indigo-600 dark:text-indigo-400">string[] | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">AI-generated title alternatives</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Table 2: Team Members */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-green-500" />
                                    2. Team Members Database
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Stores team member profiles and workload information for task assignment.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Field</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Type</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Purpose</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr><td className="px-3 py-2 font-mono text-xs">id</td><td className="px-3 py-2 text-green-600 dark:text-green-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Unique identifier (e.g., 'tm1')</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">name</td><td className="px-3 py-2 text-green-600 dark:text-green-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Full name</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">role</td><td className="px-3 py-2 text-green-600 dark:text-green-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Job title (Manager, Creator, Designer, etc.)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">email</td><td className="px-3 py-2 text-green-600 dark:text-green-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Contact email</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">avatar</td><td className="px-3 py-2 text-green-600 dark:text-green-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Initials for avatar display</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">activeTasksCount</td><td className="px-3 py-2 text-green-600 dark:text-green-400">number</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Current workload indicator</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Table 3: Creators Intake */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                                    3. Creators Intake Database
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Captures creator onboarding data with AI-generated classification and recommendations.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Field</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Type</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Purpose</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr><td className="px-3 py-2 font-mono text-xs">id</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Unique identifier</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">name</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Creator's full name</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">email</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Contact email (validated)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">platform</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Primary content platform</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">followerCount</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Audience size (for stage detection)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">description</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Content focus description</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">goals</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string[]</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Selected growth goals</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">aiNiche</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">AI-detected content niche</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">aiPlatformFocus</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">AI-recommended platforms</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">aiStage</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">AI-detected monetization stage</td></tr>
                                            <tr><td className="px-3 py-2 font-mono text-xs">aiRecommendations</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">string[] | null</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Personalized growth tips (4-5)</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-mono text-xs">submittedDate</td><td className="px-3 py-2 text-purple-600 dark:text-purple-400">Date</td><td className="px-3 py-2 text-gray-600 dark:text-gray-400">Form submission timestamp</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Relationships */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <GitBranch className="w-5 h-5 mr-2 text-orange-500" />
                                    Table Relationships
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                                        <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-300 font-medium">Content Pipeline</div>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <div className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">assignedTo (FK)</div>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-300 font-medium">Team Members</div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">One-to-Many: Each team member can be assigned multiple content items</p>
                                </div>
                            </div>

                            {/* View Configurations */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Settings className="w-5 h-5 mr-2 text-cyan-500" />
                                    Database View Configurations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">📊 Content Database View</h4>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Filter: Platform, Status, Assignee</li>
                                            <li>• Sort: Date, Views, Days in Stage</li>
                                            <li>• Search: Title, Description</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">📋 Pipeline Board View</h4>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Group by: Status (Kanban)</li>
                                            <li>• Highlight: Stuck items ({'>'}3 days)</li>
                                            <li>• Drag-drop: Status changes</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">👥 Team View</h4>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Group by: Team Member</li>
                                            <li>• Show: Active task count</li>
                                            <li>• Sort: Workload (high to low)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Process Flow */}
                    {expandedSection === 'process' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Workflow className="w-6 h-6 mr-2 text-indigo-500" />
                                Detailed Workflow Process
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                The content pipeline follows a structured 5-stage workflow designed to ensure quality, accountability, and efficient content production. Each stage has defined owners, expected durations, and clear handoff points.
                            </p>

                            {/* Flow Diagram */}
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                {['Ideation', 'Drafting', 'Design', 'Review', 'Published'].map((stage, i) => (
                                    <React.Fragment key={stage}>
                                        <div className={`px-4 py-3 rounded-lg text-center min-w-[100px]
                                            ${i === 0 ? 'bg-gray-200 dark:bg-gray-600' : ''}
                                            ${i === 1 ? 'bg-blue-200 dark:bg-blue-900' : ''}
                                            ${i === 2 ? 'bg-purple-200 dark:bg-purple-900' : ''}
                                            ${i === 3 ? 'bg-orange-200 dark:bg-orange-900' : ''}
                                            ${i === 4 ? 'bg-green-200 dark:bg-green-900' : ''}`}>
                                            <p className="font-medium text-gray-800 dark:text-white text-sm">{stage}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                                {i === 0 && '1-2 days'}
                                                {i === 1 && '2-3 days'}
                                                {i === 2 && '1-2 days'}
                                                {i === 3 && '1 day'}
                                                {i === 4 && 'Ongoing'}
                                            </p>
                                        </div>
                                        {i < 4 && <ArrowRight className="w-5 h-5 text-gray-400" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Detailed Stage Documentation */}
                            <div className="space-y-6">
                                {/* Stage 1: Ideation */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs mr-2">1</div>
                                            Ideation Stage
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div><span className="text-gray-500 dark:text-gray-400">Owner:</span><p className="font-medium text-gray-900 dark:text-white">Content Creator</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Duration:</span><p className="font-medium text-gray-900 dark:text-white">1-2 days</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Decision:</span><p className="font-medium text-gray-900 dark:text-white">Is topic viable?</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Inputs:</span><p className="text-gray-600 dark:text-gray-400">Trends, audience feedback, content calendar</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Outputs:</span><p className="text-gray-600 dark:text-gray-400">Content brief (title + description + platform)</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Actions:</span><p className="text-gray-600 dark:text-gray-400">Research, brainstorm, validate with team</p></div>
                                    </div>
                                </div>

                                {/* Stage 2: Drafting */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 border-b border-blue-200 dark:border-blue-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">2</div>
                                            Drafting Stage
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div><span className="text-gray-500 dark:text-gray-400">Owner:</span><p className="font-medium text-gray-900 dark:text-white">Content Creator</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Duration:</span><p className="font-medium text-gray-900 dark:text-white">2-3 days</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Decision:</span><p className="font-medium text-gray-900 dark:text-white">Is draft complete?</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Inputs:</span><p className="text-gray-600 dark:text-gray-400">Content brief, research notes, brand guidelines</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Outputs:</span><p className="text-gray-600 dark:text-gray-400">Complete draft with structure and copy</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Actions:</span><p className="text-gray-600 dark:text-gray-400">Write, edit, self-review, format</p></div>
                                    </div>
                                </div>

                                {/* Stage 3: Design */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-purple-100 dark:bg-purple-900/50 px-4 py-3 border-b border-purple-200 dark:border-purple-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs mr-2">3</div>
                                            Design Stage
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div><span className="text-gray-500 dark:text-gray-400">Owner:</span><p className="font-medium text-gray-900 dark:text-white">Designer</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Duration:</span><p className="font-medium text-gray-900 dark:text-white">1-2 days</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Decision:</span><p className="font-medium text-gray-900 dark:text-white">Are assets ready?</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Inputs:</span><p className="text-gray-600 dark:text-gray-400">Draft content, brand assets, platform specs</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Outputs:</span><p className="text-gray-600 dark:text-gray-400">Visual assets (images, thumbnails, carousels)</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Actions:</span><p className="text-gray-600 dark:text-gray-400">Design, iterate, export for platform</p></div>
                                    </div>
                                </div>

                                {/* Stage 4: Review */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-orange-100 dark:bg-orange-900/50 px-4 py-3 border-b border-orange-200 dark:border-orange-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">4</div>
                                            Review Stage
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div><span className="text-gray-500 dark:text-gray-400">Owner:</span><p className="font-medium text-gray-900 dark:text-white">Content Manager</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Duration:</span><p className="font-medium text-gray-900 dark:text-white">1 day</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Decision:</span><p className="font-medium text-gray-900 dark:text-white">Approved or revisions?</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Inputs:</span><p className="text-gray-600 dark:text-gray-400">Complete content + design package</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Outputs:</span><p className="text-gray-600 dark:text-gray-400">Approval or feedback for revisions</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Actions:</span><p className="text-gray-600 dark:text-gray-400">Review, edit, approve/reject</p></div>
                                    </div>
                                </div>

                                {/* Stage 5: Published */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-green-100 dark:bg-green-900/50 px-4 py-3 border-b border-green-200 dark:border-green-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2">5</div>
                                            Published Stage
                                        </h3>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div><span className="text-gray-500 dark:text-gray-400">Owner:</span><p className="font-medium text-gray-900 dark:text-white">Analyst / System</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Duration:</span><p className="font-medium text-gray-900 dark:text-white">Ongoing</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Decision:</span><p className="font-medium text-gray-900 dark:text-white">Performance OK?</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Inputs:</span><p className="text-gray-600 dark:text-gray-400">Published content, platform APIs</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Outputs:</span><p className="text-gray-600 dark:text-gray-400">Metrics (views, likes, comments, shares)</p></div>
                                        <div><span className="text-gray-500 dark:text-gray-400">Actions:</span><p className="text-gray-600 dark:text-gray-400">Track, analyze, report, AI analysis</p></div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottleneck Detection */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                                    Bottleneck Detection Logic
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                                        <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">⚠️ Warning State ({'>'}3 Days)</h4>
                                        <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">Items in any stage for more than 3 days are flagged yellow.</p>
                                        <pre className="text-xs bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded overflow-x-auto">
                                            {`const isStuck = (item) => 
  item.daysInStage > 3 && 
  item.status !== 'Published';`}
                                        </pre>
                                    </div>
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">🚨 Critical State ({'>'}5 Days)</h4>
                                        <p className="text-sm text-red-700 dark:text-red-400 mb-2">Items stuck for more than 5 days require immediate attention.</p>
                                        <pre className="text-xs bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-x-auto">
                                            {`const isVeryStuck = (item) => 
  item.daysInStage > 5 && 
  item.status !== 'Published';`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Handoff Points */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <GitBranch className="w-5 h-5 mr-2 text-cyan-500" />
                                    Handoff Points Between Team Members
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                                        <div className="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg font-medium">Creator</div>
                                        <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 rounded text-xs text-blue-700 dark:text-blue-300">Drafting → Design</div>
                                        <div className="px-3 py-2 bg-purple-200 dark:bg-purple-800 rounded-lg font-medium">Designer</div>
                                        <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 rounded text-xs text-purple-700 dark:text-purple-300">Design → Review</div>
                                        <div className="px-3 py-2 bg-orange-200 dark:bg-orange-800 rounded-lg font-medium">Manager</div>
                                        <div className="px-2 py-1 bg-green-100 dark:bg-green-900/50 rounded text-xs text-green-700 dark:text-green-300">Review → Published</div>
                                        <div className="px-3 py-2 bg-green-200 dark:bg-green-800 rounded-lg font-medium">Analyst</div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                                        Each handoff automatically notifies the next owner and resets daysInStage to 0.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI Automation */}
                    {expandedSection === 'ai' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
                                AI Automation Technical Details
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                The system implements two AI-powered automations: Content Analysis for published content and Creator Classification for new signups. Both are designed with mock implementations that can be upgraded to production Claude API.
                            </p>

                            {/* Content Analysis - 6 Step Process */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Cpu className="w-5 h-5 mr-2 text-indigo-500" />
                                    Content Analysis: 6-Step Process
                                </h3>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3"><strong>Trigger:</strong> User clicks "Analyze with AI" button on any content item in Content Database view.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-indigo-400">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">STEP 1</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Parse Input</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Extract title + description + platform</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-indigo-400">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">STEP 2</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Extract Topics</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">10 regex patterns for topic detection</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-indigo-400">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">STEP 3</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Generate Summary</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Template-based 2-3 sentence summary</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-purple-400">
                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">STEP 4</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Title Variations</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Question, List, Value-focused formats</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-purple-400">
                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">STEP 5</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Compile Results</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Build AIContentAnalysis object</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-purple-400">
                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">STEP 6</span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Return + Update</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Store in content item, show modal</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">⚠️ Error Handling</p>
                                    <p className="text-xs text-red-700 dark:text-red-400">All errors are caught in try/catch, logged to console, and user sees graceful failure message. No data is lost on error.</p>
                                </div>
                            </div>

                            {/* Creator Intake Classification */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-green-500" />
                                    Creator Intake: Form Validation & Classification
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">📝 Form Validation (6 Fields)</h4>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• <strong>name:</strong> Required, non-empty string</li>
                                            <li>• <strong>email:</strong> Required, regex: /\S+@\S+\.\S+/</li>
                                            <li>• <strong>platform:</strong> Required, select from list</li>
                                            <li>• <strong>followerCount:</strong> Required, numeric string</li>
                                            <li>• <strong>description:</strong> Required, text area</li>
                                            <li>• <strong>goals:</strong> Required, min 1 selected</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">🎯 Classification Logic</h4>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• <strong>Niche:</strong> Keyword matching (7 categories)</li>
                                            <li>• <strong>Stage:</strong> Follower thresholds (4 levels)</li>
                                            <li>• <strong>Platforms:</strong> Niche-based recommendations</li>
                                            <li>• <strong>Recommendations:</strong> Stage + goals matrix</li>
                                        </ul>
                                        <pre className="text-xs bg-blue-100 dark:bg-blue-900/40 p-2 rounded mt-2 overflow-x-auto">
                                            {`const stages = {
  '<1K': 'Building Foundation',
  '<10K': 'Growing Audience',
  '<50K': 'Scaling & Monetizing',
  '50K+': 'Established Creator'
};`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Mock vs Production Comparison */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Code className="w-5 h-5 mr-2 text-orange-500" />
                                    Mock AI vs Production Claude API
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs mr-2">CURRENT</span>
                                            Mock Implementation
                                        </h4>
                                        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                                            {`// mockAI.ts - Keyword matching
const detectNiche = (desc: string) => {
  const keywords = {
    'Tech/Business': ['startup', 
      'saas', 'b2b', 'growth'],
    'Design/Creative': ['design', 
      'figma', 'ux', 'visual'],
    // ...7 categories total
  };
  
  for (const [niche, kws] of 
       Object.entries(keywords)) {
    const matches = kws.filter(
      kw => desc.includes(kw)
    );
    if (matches.length >= 2) 
      return niche;
  }
  return 'General Creator';
};`}
                                        </pre>
                                    </div>
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                                            <span className="px-2 py-0.5 bg-indigo-200 dark:bg-indigo-800 rounded text-xs mr-2">PRODUCTION</span>
                                            Claude API Implementation
                                        </h4>
                                        <pre className="text-xs bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded overflow-x-auto">
                                            {`// production/aiService.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

export const detectNiche = async (
  description: string
) => {
  const response = await anthropic
    .messages.create({
      model: 'claude-3-sonnet',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: \`Classify this 
          creator: \${description}\`
      }]
    });
  return response.content[0].text;
};`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Production Readiness */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Server className="w-5 h-5 mr-2 text-cyan-500" />
                                    Production Readiness Considerations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                        <div className="text-2xl mb-2">🚦</div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Rate Limiting</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">100 req/min per user, exponential backoff on 429</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                        <div className="text-2xl mb-2">💾</div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Response Caching</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Redis cache, 5-min TTL, hash key on inputs</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                        <div className="text-2xl mb-2">📊</div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Logging</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Structured logs, request ID tracking, PII redaction</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                        <div className="text-2xl mb-2">🔔</div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">Monitoring</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">DataDog/Sentry, latency alerts, error rate thresholds</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scaling Improvements */}
                    {expandedSection === 'scaling' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                                5 Scaling Improvements (3 → 15 People)
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                These five improvements address the key challenges teams face when scaling from a small team of 3 to a larger organization of 15. Each includes implementation details, cost estimates, and success metrics.
                            </p>

                            <div className="space-y-4">
                                {improvements.map((item, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedImprovement(expandedImprovement === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                                    {item.icon}
                                                </div>
                                                <div className="text-left">
                                                    <span className="font-semibold text-gray-900 dark:text-white">{index + 1}. {item.title}</span>
                                                    <div className="flex items-center space-x-3 mt-1">
                                                        <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{item.timeline}</span>
                                                        <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">{item.costEstimate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {expandedImprovement === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                        </button>

                                        {expandedImprovement === index && (
                                            <div className="p-4 space-y-6">
                                                {/* Current Challenge */}
                                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                    <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center">
                                                        <AlertTriangle className="w-4 h-4 mr-1" /> Current Challenge
                                                    </h4>
                                                    <p className="text-sm text-red-600 dark:text-red-400">{item.currentChallenge}</p>
                                                </div>

                                                {/* What, Why, How, Impact Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                                        <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">What</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.what}</p>
                                                    </div>
                                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                        <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">Why</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.why}</p>
                                                    </div>
                                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                        <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">How</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.how}</p>
                                                    </div>
                                                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                                        <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">Impact</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.impact}</p>
                                                    </div>
                                                </div>

                                                {/* Implementation Details */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                                        <Clock className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Timeline</p>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.timeline}</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                                        <DollarSign className="w-5 h-5 mx-auto text-green-500 mb-1" />
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Cost Estimate</p>
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.costEstimate}</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                                        <Target className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Success Metrics</p>
                                                        <p className="text-xs text-gray-900 dark:text-white">{item.successMetrics}</p>
                                                    </div>
                                                </div>

                                                {/* Example Tools */}
                                                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                                                    <h4 className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 mb-2 flex items-center">
                                                        <Layers className="w-4 h-4 mr-1" /> Example Tools & Technologies
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.exampleTools.map((tool, i) => (
                                                            <span key={i} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Detailed Description (3-4 paragraphs) */}
                                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Detailed Analysis</h4>
                                                    <div className="space-y-3">
                                                        {item.detailedDescription.map((paragraph, i) => (
                                                            <p key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{paragraph}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Technical Architecture */}
                    {expandedSection === 'technical' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technical Architecture</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tech Stack</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'].map(tech => (
                                            <div key={tech} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Component Structure</h3>
                                    <pre className="text-xs bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto">
                                        {`src/
├── App.tsx                 # Main app with routing
├── components/
│   ├── Header.tsx          # Top navigation
│   ├── Sidebar.tsx         # Side navigation
│   ├── Dashboard.tsx       # KPIs & overview
│   ├── ContentDatabase.tsx # Content table
│   ├── PipelineBoard.tsx   # Kanban board
│   ├── TeamView.tsx        # Team management
│   ├── Analytics.tsx       # Charts & stats
│   ├── CreatorIntake.tsx   # Intake form
│   └── SystemDocs.tsx      # Documentation
├── types/index.ts          # TypeScript types
├── data/sampleData.ts      # Mock data
└── utils/
    ├── mockAI.ts           # AI logic
    └── helpers.ts          # Utilities`}
                                    </pre>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">State Management</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Uses React Context (AppContext) for shared state including content items, creators, and team data. Theme is managed via ThemeContext with localStorage persistence.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Future Integration Points</h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> <strong>Notion API:</strong> Sync content items with Notion database</li>
                                        <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> <strong>n8n Webhooks:</strong> Trigger automations on status changes</li>
                                        <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> <strong>Claude/OpenAI:</strong> Replace mock AI with real API calls</li>
                                        <li className="flex items-start"><ArrowRight className="w-4 h-4 mr-2 mt-1 text-indigo-500" /> <strong>Analytics APIs:</strong> Pull real metrics from platforms</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notion Implementation Guide */}
                    {expandedSection === 'notion' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <BookOpen className="w-6 h-6 mr-2 text-orange-500" />
                                Notion Implementation Guide
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                This guide provides step-by-step instructions for recreating this system's core functionality in Notion, along with recommendations for a hybrid approach that combines Notion's collaboration features with this custom dashboard.
                            </p>

                            {/* Step 1: Database Setup */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">1</div>
                                    Create Core Databases
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">📋 Content Pipeline</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Main database for tracking content through stages.</p>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Title (Title property)</li>
                                            <li>• Description (Text)</li>
                                            <li>• Platform (Select: LinkedIn, Instagram, X, YouTube, TikTok)</li>
                                            <li>• Status (Select: Ideation, Drafting, Design, Review, Published)</li>
                                            <li>• Assignee (Person)</li>
                                            <li>• Created (Created time)</li>
                                            <li>• Last Edited (Last edited time)</li>
                                            <li>• Published Date (Date)</li>
                                            <li>• Days in Stage (Formula)</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">👥 Team Members</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Team directory with workload tracking.</p>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Name (Title)</li>
                                            <li>• Email (Email)</li>
                                            <li>• Role (Select: Manager, Creator, Designer, Analyst)</li>
                                            <li>• Active Tasks (Rollup from Content Pipeline)</li>
                                            <li>• Avatar (Files)</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">🌟 Creator Intake</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Form submissions from new creators.</p>
                                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>• Name (Title)</li>
                                            <li>• Email (Email)</li>
                                            <li>• Platform (Select)</li>
                                            <li>• Follower Count (Text)</li>
                                            <li>• Description (Text)</li>
                                            <li>• Goals (Multi-select)</li>
                                            <li>• Submitted (Created time)</li>
                                            <li>• AI Niche (Text - manual)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: View Configuration */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">2</div>
                                    Configure Database Views
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">View Name</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Type</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Group By</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Filter</th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Sort</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr><td className="px-3 py-2 font-medium">Pipeline Board</td><td className="px-3 py-2 text-orange-600 dark:text-orange-400">Board</td><td className="px-3 py-2">Status</td><td className="px-3 py-2">None</td><td className="px-3 py-2">Created ↑</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-medium">All Content</td><td className="px-3 py-2 text-blue-600 dark:text-blue-400">Table</td><td className="px-3 py-2">None</td><td className="px-3 py-2">None</td><td className="px-3 py-2">Last edited ↓</td></tr>
                                            <tr><td className="px-3 py-2 font-medium">By Platform</td><td className="px-3 py-2 text-blue-600 dark:text-blue-400">Table</td><td className="px-3 py-2">Platform</td><td className="px-3 py-2">None</td><td className="px-3 py-2">Created ↓</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-medium">My Tasks</td><td className="px-3 py-2 text-blue-600 dark:text-blue-400">Table</td><td className="px-3 py-2">Status</td><td className="px-3 py-2">Assignee = Me</td><td className="px-3 py-2">Created ↑</td></tr>
                                            <tr><td className="px-3 py-2 font-medium">Published</td><td className="px-3 py-2 text-green-600 dark:text-green-400">Gallery</td><td className="px-3 py-2">Platform</td><td className="px-3 py-2">Status = Published</td><td className="px-3 py-2">Published ↓</td></tr>
                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50"><td className="px-3 py-2 font-medium">Stuck Items</td><td className="px-3 py-2 text-red-600 dark:text-red-400">Table</td><td className="px-3 py-2">Assignee</td><td className="px-3 py-2">Days in Stage {'>'} 3</td><td className="px-3 py-2">Days ↓</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Step 3: Formula Fields */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">3</div>
                                    Set Up Formula Fields
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Days in Stage Formula</h4>
                                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto mb-3">
                                        {`// Notion Formula (2.0 syntax)
if(
  prop("Status") == "Published",
  0,
  dateBetween(now(), prop("Last edited"), "days")
)`}
                                    </pre>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">This calculates days since last edit. For true "days in current status", you'd need an automation to update a "Status Changed" date property when status changes.</p>
                                </div>
                            </div>

                            {/* Step 4: Automations */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">4</div>
                                    Configure Notion Automations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">📌 Status Change Notifications</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Trigger:</strong> Property "Status" changed</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Action:</strong> Send notification to new assignee</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Uses Notion's built-in automation or connects to Slack via Zapier/n8n.</p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">⏰ Stuck Item Alerts</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Trigger:</strong> Daily at 9 AM</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Condition:</strong> Days in Stage {'>'} 3</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Sends Slack message listing all stuck items. Requires n8n or Make integration.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5: Hybrid Approach */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs mr-2">5</div>
                                    Recommended: Hybrid Approach
                                </h3>
                                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Why Hybrid? Best of Both Worlds</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h5 className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">📝 Use Notion For:</h5>
                                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                                <li>• Content creation & collaboration</li>
                                                <li>• Rich text editing with embeds</li>
                                                <li>• Comments & discussions</li>
                                                <li>• Template library</li>
                                                <li>• Team documentation</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">📊 Use This Dashboard For:</h5>
                                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                                <li>• Real-time pipeline visualization</li>
                                                <li>• AI-powered analysis</li>
                                                <li>• Advanced analytics & charts</li>
                                                <li>• Creator intake with AI classification</li>
                                                <li>• Custom metrics & KPIs</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🔗 Sync Architecture</h5>
                                        <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                                            {`Notion Database ←→ n8n Webhook ←→ This Dashboard
                    ↓
         Bidirectional sync on:
         • Status changes
         • New content creation
         • Assignment updates`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SystemDocs;
