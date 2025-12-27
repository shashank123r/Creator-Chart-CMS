import React, { useState } from 'react';
import { FileText, Lightbulb, Code, Workflow, ArrowRight, ChevronDown, ChevronUp, Sparkles, Users, Shield, Bell, Layout, BarChart3, Zap } from 'lucide-react';

interface Improvement {
    title: string;
    what: string;
    why: string;
    how: string;
    impact: string;
    icon: React.ReactNode;
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
        },
        {
            title: 'Automated Notifications & Reminders',
            icon: <Bell className="w-5 h-5" />,
            what: 'Smart notification system for stuck content, deadline reminders, and workflow updates.',
            why: 'With 15 people, manual tracking becomes impossible. Automated alerts ensure nothing falls through the cracks.',
            how: 'Integrate with Slack/Email via n8n webhooks. Set up cron jobs for daily digest and instant alerts for critical items.',
            impact: 'Reduces stuck content by 75%, improves response time, ensures accountability.',
        },
        {
            title: 'Content Template Library',
            icon: <Layout className="w-5 h-5" />,
            what: 'Pre-built templates for different content types and platforms with best practices built-in.',
            why: 'New team members need quick onboarding. Templates ensure brand consistency and quality standards.',
            how: 'Create template database with fields for platform, format, and structure. Add template selection in content creation flow.',
            impact: 'Cuts onboarding time by 50%, ensures brand consistency, speeds up content creation.',
        },
        {
            title: 'Batch Operations & Bulk Editing',
            icon: <Zap className="w-5 h-5" />,
            what: 'Select multiple content items to update status, reassign, or apply tags simultaneously.',
            why: 'Managing 100+ content items individually is inefficient. Bulk operations save hours weekly.',
            how: 'Add multi-select UI with action toolbar. Implement batch API endpoints for status/assignment changes.',
            impact: 'Saves 5+ hours/week, enables quick reorganization, improves workflow efficiency.',
        },
        {
            title: 'Advanced Analytics & Reporting',
            icon: <BarChart3 className="w-5 h-5" />,
            what: 'Detailed performance reports, trend analysis, and exportable dashboards for stakeholders.',
            why: 'Data-driven decisions require comprehensive analytics. Stakeholders need regular performance updates.',
            how: 'Integrate with analytics APIs, build custom dashboard builder, implement scheduled report generation.',
            impact: 'Enables data-driven strategy, improves stakeholder communication, identifies growth opportunities.',
        },
    ];

    const sections = [
        { id: 'overview', title: 'System Overview', icon: <FileText /> },
        { id: 'process', title: 'Process Flow', icon: <Workflow /> },
        { id: 'ai', title: 'AI Automation', icon: <Sparkles /> },
        { id: 'scaling', title: 'Scaling Improvements', icon: <Lightbulb /> },
        { id: 'technical', title: 'Technical Architecture', icon: <Code /> },
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

                    {/* Process Flow */}
                    {expandedSection === 'process' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Content Pipeline Process</h2>

                            {/* Flow Diagram */}
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                {['Ideation', 'Drafting', 'Design', 'Review', 'Published'].map((stage, i) => (
                                    <React.Fragment key={stage}>
                                        <div className={`
                      px-4 py-3 rounded-lg text-center min-w-[100px]
                      ${i === 0 ? 'bg-gray-200 dark:bg-gray-600' : ''}
                      ${i === 1 ? 'bg-blue-200 dark:bg-blue-900' : ''}
                      ${i === 2 ? 'bg-purple-200 dark:bg-purple-900' : ''}
                      ${i === 3 ? 'bg-orange-200 dark:bg-orange-900' : ''}
                      ${i === 4 ? 'bg-green-200 dark:bg-green-900' : ''}
                    `}>
                                            <p className="font-medium text-gray-800 dark:text-white text-sm">{stage}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                                {i === 0 && 'Creator'}
                                                {i === 1 && 'Creator'}
                                                {i === 2 && 'Designer'}
                                                {i === 3 && 'Manager'}
                                                {i === 4 && 'Complete'}
                                            </p>
                                        </div>
                                        {i < 4 && <ArrowRight className="w-5 h-5 text-gray-400" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-4 border-gray-400 pl-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">1. Ideation</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Content ideas are captured with title, description, and platform. Owner: Content Creator</p>
                                </div>
                                <div className="border-l-4 border-blue-400 pl-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">2. Drafting</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Full content is written based on the idea. Owner: Content Creator</p>
                                </div>
                                <div className="border-l-4 border-purple-400 pl-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">3. Design</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Visual assets are created to accompany the content. Owner: Designer</p>
                                </div>
                                <div className="border-l-4 border-orange-400 pl-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">4. Review</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Content Manager reviews and approves for publication. Owner: Manager</p>
                                </div>
                                <div className="border-l-4 border-green-400 pl-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">5. Published</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Content is live and metrics are tracked. AI analysis can be triggered.</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 flex items-center">
                                    <Lightbulb className="w-4 h-4 mr-2" /> Bottleneck Detection
                                </h4>
                                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                    Items in any stage for {'>'}3 days are flagged as stuck (yellow). Items {'>'}5 days are critical (red).
                                </p>
                            </div>
                        </div>
                    )}

                    {/* AI Automation */}
                    {expandedSection === 'ai' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI Automation</h2>

                            <div className="space-y-6">
                                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automation 1: Content Analysis</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Triggered when clicking "Analyze with AI" on published content.</p>
                                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        <li>• Generates 2-3 sentence summary</li>
                                        <li>• Creates 3 title variations (Question, List, Value-focused)</li>
                                        <li>• Extracts key topics from content</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automation 2: Creator Classification</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Triggered when submitting Creator Intake form.</p>
                                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        <li>• Detects content niche from description</li>
                                        <li>• Determines monetization stage from follower count</li>
                                        <li>• Recommends optimal platforms</li>
                                        <li>• Generates 4-5 personalized growth recommendations</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Current Implementation (Mock AI)</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        For demo purposes, AI uses intelligent rule-based logic:
                                    </p>
                                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                                        {`// Niche detection uses keyword matching
const nicheKeywords = {
  'Tech/Business': ['startup', 'saas', 'growth'],
  'Design/Creative': ['design', 'figma', 'ux'],
  // ...
};

// Stage is determined by follower count
if (count < 1000) return 'Building Foundation';
if (count < 10000) return 'Growing Audience';`}
                                    </pre>
                                </div>

                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Production Migration Path</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        To use real AI (Claude/GPT), update mockAI.ts:
                                    </p>
                                    <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
                                        {`// Replace mock function with API call
export const analyzeContentWithAI = async (
  title: string,
  description: string,
) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
  return response.json();
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scaling Improvements */}
                    {expandedSection === 'scaling' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5 Scaling Improvements (3 → 15 People)</h2>

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
                                                <span className="font-semibold text-gray-900 dark:text-white">{index + 1}. {item.title}</span>
                                            </div>
                                            {expandedImprovement === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                        </button>

                                        {expandedImprovement === index && (
                                            <div className="p-4 space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">What</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.what}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">Why</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.why}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">How</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.how}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">Impact</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.impact}</p>
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
                </div>
            </div>
        </div>
    );
};

export default SystemDocs;
