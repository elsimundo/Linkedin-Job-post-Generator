'use client';

import { useState } from 'react';
import { JobVacancy } from '@/lib/types';
import { 
  Briefcase, 
  PoundSterling, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Image as ImageIcon,
  Type,
  RotateCcw
} from 'lucide-react';
import { DEFAULT_JOB_VACANCY } from '@/lib/types';

interface JobFormProps {
  data: JobVacancy;
  onChange: (data: JobVacancy) => void;
  onReset: () => void;
}

export default function JobForm({ data, onChange, onReset }: JobFormProps) {
  const [pillInput, setPillInput] = useState('');

  const updateField = (field: keyof JobVacancy, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddPill = (pill: string) => {
    const trimmed = pill.trim();
    if (!trimmed) return;
    if (data.customPills.includes(trimmed)) return;
    if (data.customPills.length >= 5) return; // allow more flexibility while keeping layout clean
    onChange({ ...data, customPills: [...data.customPills, trimmed] });
    setPillInput('');
  };

  const handleRemovePill = (pill: string) => {
    onChange({
      ...data,
      customPills: data.customPills.filter((p) => p !== pill),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Job Title */}
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Job Title <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          id="jobTitle"
          type="text"
          maxLength={80}
          value={data.jobTitle}
          onChange={(e) => updateField('jobTitle', e.target.value)}
          placeholder="e.g., Medical Equipment Engineer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
          required
        />
        <p className="text-xs text-gray-500 mt-1">{data.jobTitle.length}/80 characters</p>
      </div>

      {/* Salary */}
      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <PoundSterling className="w-4 h-4" />
            Salary/Wage Range
          </div>
        </label>
        <input
          id="salary"
          type="text"
          value={data.salary}
          onChange={(e) => updateField('salary', e.target.value)}
          placeholder="e.g., £28,000 - £35,000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Employment Type */}
      <div>
        <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Employment Type <span className="text-red-500">*</span>
          </div>
        </label>
        <select
          id="employmentType"
          value={data.employmentType}
          onChange={(e) => updateField('employmentType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all bg-white"
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
        </select>
        <div className="mt-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={data.hideEmploymentType || false}
              onChange={(e) => updateField('hideEmploymentType', e.target.checked as any)}
              className="w-4 h-4 text-[#25467a] focus:ring-[#25467a] rounded"
            />
            Hide employment type on image
          </label>
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location <span className="text-red-500">*</span>
          </div>
        </label>
        <input
          id="location"
          type="text"
          value={data.location}
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="e.g., Manchester, UK"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
          required
        />
        <div className="mt-2">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={data.hideLocation || false}
              onChange={(e) => updateField('hideLocation', e.target.checked as any)}
              className="w-4 h-4 text-[#25467a] focus:ring-[#25467a] rounded"
            />
            Hide location on image
          </label>
        </div>
      </div>

      {/* Custom Pills */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Pills (optional)</h3>
        <p className="text-xs text-gray-500 mb-3">Add short tags like team names, shift patterns, or key highlights. Max 4.</p>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            maxLength={50}
            placeholder="e.g., Static Role"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none text-sm"
            value={pillInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddPill(pillInput);
              }
            }}
            onChange={(e) => setPillInput(e.target.value)}
          />
          <button
            type="button"
            className="px-3 py-2 text-sm text-white bg-[#25467a] hover:bg-[#1d3560] rounded-lg"
            onClick={() => handleAddPill(pillInput)}
          >
            Add
          </button>
        </div>

        {data.customPills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.customPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => handleRemovePill(pill)}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-800 hover:bg-gray-200"
                aria-label={`Remove pill ${pill}`}
              >
                <span>{pill}</span>
                <span className="text-gray-500 text-[10px]">✕</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer description under Join our Team */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short blurb under "Join our Team" (optional)
          </label>
          <textarea
            rows={3}
            maxLength={160}
            value={data.footerDescription || ''}
            onChange={(e) => updateField('footerDescription', e.target.value)}
            placeholder="e.g., Join a growing team supporting hospitals and clinics across the UK."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none text-sm resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">Max 160 characters.</p>
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Color Scheme
          </div>
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="colorScheme"
              value="white"
              checked={data.colorScheme === 'white'}
              onChange={(e) => updateField('colorScheme', e.target.value)}
              className="w-4 h-4 text-[#25467a] focus:ring-[#25467a]"
            />
            <span className="text-sm text-gray-700">White on Blue (Default)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="colorScheme"
              value="blue"
              checked={data.colorScheme === 'blue'}
              onChange={(e) => updateField('colorScheme', e.target.value)}
              className="w-4 h-4 text-[#25467a] focus:ring-[#25467a]"
            />
            <span className="text-sm text-gray-700">Blue on White</span>
          </label>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
        
        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </div>
          </label>
          <input
            id="phone"
            type="text"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </div>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </div>
          </label>
          <input
            id="website"
            type="text"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25467a] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Advanced Options removed: compass opacity is now fixed at design level */}
    </div>
  );
}
