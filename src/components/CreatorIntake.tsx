import React, { useState } from 'react';
import { useApp } from '../App';
import { CreatorProfile } from '../types';
import { classifyCreatorWithAI } from '../utils/mockAI';
import { generateId, formatRelativeDate } from '../utils/helpers';
import {
    User,
    Mail,
    Users,
    FileText,
    Target,
    Loader2,
    Check,
    Sparkles,
    X,
    ChevronRight
} from 'lucide-react';

const CreatorIntake: React.FC = () => {
    const { creators, setCreators } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        platform: '',
        followerCount: '',
        description: '',
        goals: [] as string[],
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState({ message: '', progress: 0 });
    const [showResults, setShowResults] = useState(false);
    const [lastCreator, setLastCreator] = useState<CreatorProfile | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const goalOptions = [
        'Grow audience',
        'Build authority',
        'Monetize content',
        'Launch course',
        'Get sponsorships',
        'Build community',
    ];

    const platformOptions = ['LinkedIn', 'Instagram', 'X', 'YouTube', 'TikTok', 'Substack', 'Other'];

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.platform) newErrors.platform = 'Please select a platform';
        if (!formData.followerCount.trim()) newErrors.followerCount = 'Follower count is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.goals.length === 0) newErrors.goals = 'Please select at least one goal';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsAnalyzing(true);
        setShowResults(false);

        try {
            const result = await classifyCreatorWithAI(
                formData.name,
                formData.platform,
                formData.followerCount,
                formData.description,
                formData.goals,
                (message, progress) => setAnalysisProgress({ message, progress })
            );

            const newCreator: CreatorProfile = {
                id: generateId(),
                ...formData,
                aiNiche: result.niche,
                aiPlatformFocus: result.platformFocus,
                aiStage: result.stage,
                aiRecommendations: result.recommendations,
                submittedDate: new Date(),
            };

            setCreators(prev => [newCreator, ...prev]);
            setLastCreator(newCreator);
            setShowResults(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                platform: '',
                followerCount: '',
                description: '',
                goals: [],
            });
        } catch (error) {
            console.error('Classification failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const toggleGoal = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...prev.goals, goal],
        }));
        setErrors(prev => ({ ...prev, goals: '' }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Creator Intake</h1>
                <p className="text-gray-500 dark:text-gray-400">Onboard new creators with AI-powered classification and recommendations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                        Submit New Creator
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <User className="w-4 h-4 inline mr-1" /> Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => { setFormData(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, name: '' })); }}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                placeholder="Creator name"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Mail className="w-4 h-4 inline mr-1" /> Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => { setFormData(prev => ({ ...prev, email: e.target.value })); setErrors(prev => ({ ...prev, email: '' })); }}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        {/* Platform */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Users className="w-4 h-4 inline mr-1" /> Primary Platform
                            </label>
                            <select
                                value={formData.platform}
                                onChange={(e) => { setFormData(prev => ({ ...prev, platform: e.target.value })); setErrors(prev => ({ ...prev, platform: '' })); }}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white ${errors.platform ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                            >
                                <option value="">Select platform</option>
                                {platformOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            {errors.platform && <p className="text-xs text-red-500 mt-1">{errors.platform}</p>}
                        </div>

                        {/* Follower Count */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Users className="w-4 h-4 inline mr-1" /> Follower Count
                            </label>
                            <input
                                type="text"
                                value={formData.followerCount}
                                onChange={(e) => { setFormData(prev => ({ ...prev, followerCount: e.target.value })); setErrors(prev => ({ ...prev, followerCount: '' })); }}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white ${errors.followerCount ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                placeholder="e.g., 15000 or 15K"
                            />
                            {errors.followerCount && <p className="text-xs text-red-500 mt-1">{errors.followerCount}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <FileText className="w-4 h-4 inline mr-1" /> Content Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => { setFormData(prev => ({ ...prev, description: e.target.value })); setErrors(prev => ({ ...prev, description: '' })); }}
                                rows={3}
                                className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                placeholder="Describe your content focus, niche, and expertise..."
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>

                        {/* Goals */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <Target className="w-4 h-4 inline mr-1" /> Goals
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {goalOptions.map(goal => (
                                    <button
                                        key={goal}
                                        type="button"
                                        onClick={() => toggleGoal(goal)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${formData.goals.includes(goal)
                                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        {formData.goals.includes(goal) && <Check className="w-3 h-3 inline mr-1" />}
                                        {goal}
                                    </button>
                                ))}
                            </div>
                            {errors.goals && <p className="text-xs text-red-500 mt-1">{errors.goals}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isAnalyzing}
                            className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Submit & Analyze
                                </>
                            )}
                        </button>
                    </form>

                    {/* Progress */}
                    {isAnalyzing && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{analysisProgress.message}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${analysisProgress.progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Results or Creators List */}
                <div className="space-y-6">
                    {/* AI Results Modal */}
                    {showResults && lastCreator && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                                    AI Classification Results
                                </h3>
                                <button onClick={() => setShowResults(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Niche</p>
                                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{lastCreator.aiNiche}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stage</p>
                                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">{lastCreator.aiStage}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Platforms</p>
                                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{lastCreator.aiPlatformFocus}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations</p>
                                <ul className="space-y-2">
                                    {lastCreator.aiRecommendations?.map((rec, i) => (
                                        <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                            <ChevronRight className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Creators Database */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Creators Database</h2>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {creators.map(creator => (
                                <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{creator.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {creator.aiNiche} • {creator.aiStage} • {formatRelativeDate(creator.submittedDate)}
                                        </p>
                                    </div>
                                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                                        {creator.platform}
                                    </span>
                                </div>
                            ))}
                            {creators.length === 0 && (
                                <p className="text-center text-gray-400 dark:text-gray-500 py-8">No creators onboarded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorIntake;
