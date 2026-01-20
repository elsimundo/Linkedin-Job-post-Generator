'use client';

import { useState, useEffect } from 'react';
import JobImageCanvas from '@/components/JobImageCanvas';
import JobForm from '@/components/JobForm';
import DownloadButton from '@/components/DownloadButton';
import TemplateManager from '@/components/TemplateManager';
import { JobVacancy, DEFAULT_JOB_VACANCY } from '@/lib/types';
import { Eye, EyeOff } from 'lucide-react';

export default function Home() {
  const [jobData, setJobData] = useState<JobVacancy>(DEFAULT_JOB_VACANCY);
  const [showPreview, setShowPreview] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if (confirm('Reset all fields to default values?')) {
      setJobData(DEFAULT_JOB_VACANCY);
    }
  };

  const handleLoadTemplate = (data: JobVacancy) => {
    setJobData(data);
  };

  const isValid = !!(jobData.jobTitle && jobData.location && jobData.employmentType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#25467a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold">Quest Medical - Job Vacancy Generator</h1>
          <p className="text-blue-100 mt-2">Create professional LinkedIn job posts (1080x1080px)</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Form (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <JobForm 
                data={jobData} 
                onChange={setJobData} 
                onReset={handleReset}
              />
            </div>

            {/* Download Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <DownloadButton 
                canvasId="job-canvas" 
                jobTitle={jobData.jobTitle}
                isValid={isValid}
              />
            </div>

            {/* Template Manager */}
            {isClient && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <TemplateManager 
                  currentData={jobData}
                  onLoadTemplate={handleLoadTemplate}
                />
              </div>
            )}
          </div>

          {/* Right Column - Preview (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label={showPreview ? 'Hide preview' : 'Show preview'}
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>

              {showPreview && (
                <div className="flex justify-center">
                  <div className="transform scale-[0.4] origin-top">
                    <JobImageCanvas data={jobData} canvasId="job-canvas" />
                  </div>
                </div>
              )}

              {!showPreview && (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Preview hidden</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden Canvas for Export */}
        <div className="fixed -left-[9999px] -top-[9999px]">
          <JobImageCanvas data={jobData} canvasId="job-canvas-export" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Quest Medical Group. Professional recruitment solutions.
          </p>
        </div>
      </footer>
    </div>
  );
}
