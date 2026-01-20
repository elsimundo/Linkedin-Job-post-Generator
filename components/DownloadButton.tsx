'use client';

import { useState } from 'react';
import { Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateJobImage } from '@/lib/generateImage';

interface DownloadButtonProps {
  canvasId: string;
  jobTitle: string;
  isValid: boolean;
}

export default function DownloadButton({ canvasId, jobTitle, isValid }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    setIsGenerating(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await generateJobImage('job-canvas-export', jobTitle);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate image');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-white transition-all ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-600 hover:bg-green-700'
            : status === 'error'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-[#25467a] hover:bg-[#1d3560] shadow-lg hover:shadow-xl'
        }`}
        aria-label="Download PNG image"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Downloaded!
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle className="w-5 h-5" />
            Error
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download PNG (1080x1080)
          </>
        )}
      </button>

      {status === 'error' && errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

    </div>
  );
}
