'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { JobVacancy } from '@/lib/types';
import { getSavedTemplates, saveTemplate, deleteTemplate, loadTemplate } from '@/lib/templateStorage';
import type { SavedTemplate } from '@/lib/types';

interface TemplateManagerProps {
  currentData: JobVacancy;
  onLoadTemplate: (data: JobVacancy) => void;
}

export default function TemplateManager({ currentData, onLoadTemplate }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTemplates(getSavedTemplates());
  }, []);

  const handleSave = () => {
    if (!templateName.trim()) {
      setStatus('error');
      setMessage('Please enter a template name');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    try {
      saveTemplate(templateName, currentData);
      setTemplates(getSavedTemplates());
      setTemplateName('');
      setShowSaveForm(false);
      setStatus('success');
      setMessage('Template saved successfully!');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to save template');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id);
      setTemplates(getSavedTemplates());
      setStatus('success');
      setMessage('Template deleted');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const handleLoad = (id: string) => {
    const data = loadTemplate(id);
    if (data) {
      onLoadTemplate(data);
      setStatus('success');
      setMessage('Template loaded!');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Saved Templates</h3>
        <button
          onClick={() => setShowSaveForm(!showSaveForm)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-[#25467a] hover:bg-[#1d3560] rounded-lg transition-colors"
          aria-label="Save current template"
        >
          <Save className="w-4 h-4" />
          Save Current
        </button>
      </div>

      {showSaveForm && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template name (e.g., Medical Engineer)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none"
            maxLength={50}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveForm(false);
                setTemplateName('');
              }}
              className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status !== 'idle' && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {status === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <p className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        </div>
      )}

      {templates.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No saved templates yet. Save your first template above!
        </p>
      ) : (
        <div className="space-y-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#25467a] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{template.name}</p>
                <p className="text-xs text-gray-500">
                  {template.data.jobTitle || 'Untitled'} • {template.data.location || 'No location'}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleLoad(template.id)}
                  className="px-3 py-1 text-sm text-white bg-[#25467a] hover:bg-[#1d3560] rounded transition-colors"
                  aria-label={`Load ${template.name} template`}
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  aria-label={`Delete ${template.name} template`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Maximum 5 templates • {5 - templates.length} remaining
      </p>
    </div>
  );
}
