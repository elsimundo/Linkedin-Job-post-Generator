'use client';

import { JobVacancy } from '@/lib/types';
import { MapPin, Banknote, Phone, Mail, Globe, Zap, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface JobImageCanvasProps {
  data: JobVacancy;
  canvasId?: string;
}

export default function JobImageCanvas({ data, canvasId = 'job-canvas' }: JobImageCanvasProps) {
  const getFontSize = (title: string) => {
    if (title.length > 50) return 'text-5xl';
    if (title.length > 30) return 'text-6xl';
    return 'text-7xl';
  };

  const showUrgencyBadge = false;

  const isBlueScheme = data.colorScheme === 'blue';
  const bgColor = isBlueScheme ? 'bg-white' : 'bg-[#25467a]';
  const textColor = isBlueScheme ? 'text-[#25467a]' : 'text-white';
  const logoSrc = isBlueScheme ? '/Quest.svg' : '/Quest Group white.svg';
  const compassSrc = isBlueScheme ? '/compass-black.png' : '/compass.svg';
  const borderStyle = isBlueScheme && canvasId === 'job-canvas' ? 'border border-gray-300' : '';

  return (
    <div
      id={canvasId}
      className={`relative ${bgColor} ${borderStyle} overflow-hidden`}
      style={{ width: '1080px', height: '1080px' }}
    >
      {/* Compass Background Overlay - fixed at 5% opacity */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.05 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={compassSrc}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-[68px]">
        {/* Header Section - Logo Only - TOP ALIGNED */}
        <div className="mb-6">
          <div className="relative w-[420px] h-[145px]">
            <Image
              src={logoSrc}
              alt="Quest Medical Group"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        {/* Middle Content - VERTICALLY CENTERED */}
        <div className="flex-1 flex flex-col justify-center">
          {/* WE'RE HIRING - Roboto Black (900) for maximum impact */}
          <div className="mb-3">
            <h1
              className={`${textColor} font-black text-8xl tracking-wide leading-tight uppercase`}
              style={{ fontWeight: 900 }}
            >
              WE&apos;RE HIRING
            </h1>
          </div>

          {/* Job Title - LARGE & IMPACTFUL (thin weight) */}
          <div className="mb-4">
            <h2 className={`${textColor} font-thin ${getFontSize(data.jobTitle)} leading-tight`}>
              {data.jobTitle || 'Job Title'}
            </h2>

            {/* Salary - Just the amount with £ (thin weight) */}
            {data.salary && (
              <div className="mt-6">
                <span className={`${textColor} font-thin text-5xl`}>{data.salary}</span>
              </div>
            )}

            {/* Inline pills for location, employment type, and custom tags - larger for mobile legibility */}
            {(data.location || data.employmentType || data.customPills.length > 0) && (
              <div className="flex flex-wrap items-center gap-5 mt-10">
                {data.location && !data.hideLocation && (
                  <div className={`inline-flex items-center gap-3 px-7 py-3 rounded-full border ${
                    isBlueScheme ? 'border-[#25467a]' : 'border-white'
                  }`}>
                    <MapPin className={`w-7 h-7 ${textColor}`} strokeWidth={2.2} />
                    <span className={`${textColor} font-thin text-3xl`}>{data.location}</span>
                  </div>
                )}

                {data.employmentType && !data.hideEmploymentType && (
                  <div className={`inline-flex items-center px-7 py-3 rounded-full border ${
                    isBlueScheme ? 'border-[#25467a]' : 'border-white'
                  }`}>
                    <span className={`${textColor} font-thin text-3xl`}>{data.employmentType}</span>
                  </div>
                )}

                {data.customPills.map((pill) => (
                  <div
                    key={pill}
                    className={`inline-flex items-center px-7 py-3 rounded-full border ${
                      isBlueScheme ? 'border-[#25467a]' : 'border-white'
                    }`}
                  >
                    <span className={`${textColor} font-thin text-3xl`}>{pill}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Section - Join our Team - BOTTOM ALIGNED */}
        <div className="pt-8">
          <div
            className={`w-full rounded-2xl px-8 py-6 flex items-start justify-between gap-10 ${
              isBlueScheme
                ? 'bg-[#25467a]/5 border border-[#25467a]/30'
                : 'bg-white/10 border border-white/40'
            }`}
          >
            {/* Left column: heading + optional blurb, aligned to bottom of CTA */}
            <div className="flex-1 flex flex-col gap-3 pr-6 justify-end">
              <h3 className={`${textColor} font-black text-4xl`}>Join our Team</h3>
              {data.footerDescription && (
                <p className={`${textColor} font-thin text-3xl leading-snug`}>{data.footerDescription}</p>
              )}
            </div>

            {/* Right column: Contact Details - larger for mobile legibility */}
            <div className="flex flex-col gap-3 items-start min-w-[320px]">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <Phone className={`${textColor} w-8 h-8`} strokeWidth={2.5} />
                <span className={`${textColor} font-thin text-3xl`}>{data.phone}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className={`${textColor} w-8 h-8`} strokeWidth={2.5} />
                <span className={`${textColor} font-thin text-3xl`}>{data.email}</span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 mt-1.5">
                <Globe className={`${textColor} w-8 h-8`} strokeWidth={2.5} />
                <span className={`${textColor} font-black text-3xl`}>{data.website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
