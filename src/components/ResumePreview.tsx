'use client';

import { useRef, useState } from 'react';

interface ResumePreviewProps {
  resume: any;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  if (!resume) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No resume data to preview
      </div>
    );
  }

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0.5,
          filename: `${resume.personalInfo?.fullName || 'resume'}_resume.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .save();
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#147d70]">Live document</p>
          <h2 className="mt-1 text-lg font-extrabold text-[#17211f]">Resume preview</h2>
        </div>
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="flex items-center gap-2 rounded-full bg-[#17211f] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0c514a] disabled:opacity-50"
        >
          {exporting ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Exporting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </>
          )}
        </button>
      </div>

      <div ref={previewRef} className="mx-auto max-w-2xl rounded-2xl border border-[#d8e1db] bg-white p-8 shadow-lift sm:p-10">
        <div className="mb-7 border-b-2 border-[#17211f] pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#17211f]">
            {resume.personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className="mt-3 space-y-1 text-sm text-[#697572]">
            {resume.personalInfo?.email && <p>{resume.personalInfo.email}</p>}
            {resume.personalInfo?.phone && <p>{resume.personalInfo.phone}</p>}
            {resume.personalInfo?.location && <p>{resume.personalInfo.location}</p>}
            <div className="flex justify-center gap-4 mt-2">
              {resume.personalInfo?.linkedin && (
                <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {resume.personalInfo?.website && (
                <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {resume.personalInfo?.summary && (
          <div className="mb-6">
            <h2 className="mb-3 border-b border-[#dfe6e1] pb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#147d70]">Professional Summary</h2>
            <p className="whitespace-pre-wrap text-sm leading-6 text-[#3f4d49]">{resume.personalInfo.summary}</p>
          </div>
        )}

        {resume.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="mt-2 text-gray-700 whitespace-pre-wrap">{exp.description}</p>}
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-700">
                      {exp.achievements.map((a: string, i: number) => <li key={i}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {resume.education.map((edu: any, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {resume.languages?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">Languages</h2>
            <p className="text-gray-700">{resume.languages.join(', ')}</p>
          </div>
        )}

        {resume.certifications?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">Certifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              {resume.certifications.map((cert: string, index: number) => <li key={index}>{cert}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
