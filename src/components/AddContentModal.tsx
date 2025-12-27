import React, { useState } from 'react';
import { useApp } from '../App';
import { ContentItem, Platform, ContentStatus } from '../types';
import { generateId } from '../utils/helpers';
import { teamMembers } from '../data/sampleData';
import { X, FileText, Users, Layout, User } from 'lucide-react';

interface AddContentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose }) => {
    const { setContent } = useApp();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        platform: 'LinkedIn' as Platform,
        assignedTo: 'tm1',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const platforms: Platform[] = ['LinkedIn', 'Instagram', 'X', 'Reddit', 'Substack', 'YouTube', 'Newsletter'];

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const newContent: ContentItem = {
            id: generateId(),
            title: formData.title,
            description: formData.description,
            platform: formData.platform,
            status: 'Ideation' as ContentStatus,
            assignedTo: formData.assignedTo,
            createdDate: new Date(),
            lastUpdated: new Date(),
            publishDate: null,
            metrics: { views: 0, likes: 0, comments: 0, shares: 0 },
            aiSummary: null,
            aiTitles: null,
            daysInStage: 0,
        };

        setContent(prev => [newContent, ...prev]);

        // Reset form and close
        setFormData({ title: '', description: '', platform: 'LinkedIn', assignedTo: 'tm1' });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-indigo-500" />
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Content</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <FileText className="w-4 h-4 inline mr-1" /> Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => { setFormData(prev => ({ ...prev, title: e.target.value })); setErrors(prev => ({ ...prev, title: '' })); }}
                            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white ${errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                            placeholder="e.g., 10 LinkedIn Tips for Founders"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => { setFormData(prev => ({ ...prev, description: e.target.value })); setErrors(prev => ({ ...prev, description: '' })); }}
                            rows={3}
                            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                            placeholder="Brief description of the content..."
                        />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {/* Platform */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Layout className="w-4 h-4 inline mr-1" /> Platform
                        </label>
                        <select
                            value={formData.platform}
                            onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value as Platform }))}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        >
                            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <User className="w-4 h-4 inline mr-1" /> Assign To
                        </label>
                        <select
                            value={formData.assignedTo}
                            onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        >
                            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name} - {m.role}</option>)}
                        </select>
                    </div>

                    {/* Info */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        New content will be added to the <span className="font-medium text-gray-700 dark:text-gray-300">Ideation</span> stage.
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Add Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContentModal;
