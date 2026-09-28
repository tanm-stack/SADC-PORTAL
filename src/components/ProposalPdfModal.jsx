import React from 'react';
import { Printer, Download, X, Shield, FileCheck, CheckCircle2, AlertCircle, Stamp } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ProposalPdfModal({ proposal, onClose }) {
  if (!proposal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto no-print">
      <div className="bg-white border border-sadc-border rounded-sm shadow-elevated w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Top Control Bar */}
        <div className="bg-sadc-navy text-white px-6 py-4 flex items-center justify-between border-b border-sadc-navy/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-sadc-gold-light text-sadc-navy flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4 text-sadc-navy" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold text-white">
                Official Proposal Approval Record
              </h3>
              <p className="text-[11px] font-mono text-sadc-gold">
                DOCUMENT ID: {proposal.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-sadc-gold hover:bg-sadc-gold-hover text-sadc-navy py-1.5 px-3 rounded-sm text-xs font-semibold flex items-center gap-1.5 shadow-token transition-colors"
            >
              <Printer className="w-4 h-4 text-sadc-navy" />
              <span>Print Official PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-300 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div className="p-8 overflow-y-auto bg-stone-50 flex-1">
          <div 
            id="printable-proposal-document" 
            className="bg-white border border-sadc-border p-8 sm:p-12 shadow-subtle max-w-3xl mx-auto text-sadc-text font-sans relative"
          >
            
            {/* Watermark / Seal Stamp Background */}
            <div className="absolute right-12 top-28 opacity-[0.05] pointer-events-none select-none">
              <img src="/sadc_logo.png" alt="Watermark" className="w-64 h-64 object-contain" />
            </div>

            {/* INSTITUTIONAL LETTERHEAD WITH OFFICIAL LOGOS */}
            <div className="border-b-2 border-sadc-navy pb-6 mb-6 text-center">
              <div className="flex items-center justify-center gap-6 mb-3">
                <img
                  src="/college_logo.png"
                  alt="St. Vincent Pallotti College Logo"
                  className="w-16 h-16 object-contain"
                />
                <img
                  src="/sadc_logo.png"
                  alt="Student Council SADC Torch Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-sadc-navy tracking-tight uppercase">
                STUDENT AFFAIRS AND DEVELOPMENT CELL (SADC)
              </h1>
              <p className="text-xs font-semibold text-sadc-navy uppercase tracking-wider mt-0.5">
                ST. VINCENT PALLOTTI COLLEGE OF ENGINEERING & TECHNOLOGY, NAGPUR
              </p>
              <p className="text-xs text-sadc-gold font-bold uppercase tracking-widest mt-0.5">
                ARISE & SHINE · STUDENT COUNCIL OFFICE
              </p>
              <p className="text-[11px] text-sadc-muted font-mono mt-0.5">
                Gavsi Manapur, Wardha Road, Nagpur - 441108 · Tel: +91 (07108) 244775
              </p>
              <div className="mt-3 inline-block bg-sadc-bg border border-sadc-border px-4 py-1 text-[11px] font-mono text-sadc-navy font-bold uppercase tracking-widest">
                OFFICIAL PROPOSAL SANCTION & FINANCIAL DISBURSEMENT SHEET
              </div>
            </div>

            {/* METADATA BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-sadc-bg p-3 border border-sadc-border rounded-sm text-xs font-mono mb-6">
              <div>
                <span className="text-[10px] text-sadc-muted block">PROPOSAL CODE</span>
                <span className="font-bold text-sadc-navy">{proposal.id}</span>
              </div>
              <div>
                <span className="text-[10px] text-sadc-muted block">SUBMISSION DATE</span>
                <span className="font-bold text-sadc-navy">{new Date(proposal.submittedAt).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-sadc-muted block">ACADEMIC TERM</span>
                <span className="font-bold text-sadc-navy">Autumn 2026-27</span>
              </div>
              <div>
                <span className="text-[10px] text-sadc-muted block">STATUS</span>
                <StatusBadge status={proposal.status} />
              </div>
            </div>

            {/* SECTION 1: APPLICANT DETAILS */}
            <div className="mb-6">
              <h3 className="font-serif text-xs font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-1 mb-3">
                1. Event & Organizing Committee Specification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-sadc-muted text-[11px]">Event Proposal Title:</p>
                  <p className="font-bold text-sadc-navy text-sm">{proposal.title}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Category / Domain:</p>
                  <p className="font-semibold text-sadc-text">{proposal.category}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Organizing Society / Club:</p>
                  <p className="font-semibold text-sadc-text">{proposal.organizer}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Department:</p>
                  <p className="font-semibold text-sadc-text">{proposal.department}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Student Lead Applicant:</p>
                  <p className="font-semibold text-sadc-navy">{proposal.applicantName} ({proposal.applicantRollNo})</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Faculty Advisor:</p>
                  <p className="font-semibold text-sadc-text">{proposal.facultyAdvisor}</p>
                </div>
              </div>
            </div>

            {/* SECTION 2: SCHEDULE & VENUE */}
            <div className="mb-6">
              <h3 className="font-serif text-xs font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-1 mb-3">
                2. Schedule, Venue & Participant Estimates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-sadc-bg/50 p-3 border border-sadc-border rounded-sm">
                <div>
                  <p className="text-sadc-muted text-[11px]">Proposed Date:</p>
                  <p className="font-semibold text-sadc-navy font-mono">{proposal.proposedDate}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Time Slot:</p>
                  <p className="font-semibold text-sadc-navy font-mono">{proposal.proposedTime}</p>
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Approved Venue:</p>
                  <p className="font-semibold text-sadc-navy">{proposal.venue}</p>
                </div>
              </div>
              <div className="mt-3 text-xs">
                <p className="text-sadc-muted text-[11px]">Executive Event Summary:</p>
                <p className="text-sadc-text leading-relaxed mt-0.5 p-2.5 bg-stone-50 border border-sadc-border rounded-sm">
                  {proposal.summary}
                </p>
              </div>
            </div>

            {/* SECTION 3: ITEMIZED FINANCIAL BUDGET */}
            <div className="mb-6">
              <h3 className="font-serif text-xs font-bold text-sadc-navy uppercase tracking-wider border-b border-sadc-border pb-1 mb-3">
                3. Itemized Budget Allocation Statement
              </h3>
              <table className="w-full text-xs border border-sadc-border text-left">
                <thead>
                  <tr className="bg-sadc-navy text-white font-mono text-[11px]">
                    <th className="p-2 border-r border-sadc-navy/30">#</th>
                    <th className="p-2 border-r border-sadc-navy/30">Expenditure Item & Specifications</th>
                    <th className="p-2 border-r border-sadc-navy/30">Justification / Notes</th>
                    <th className="p-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sadc-border">
                  {proposal.budgetBreakdown && proposal.budgetBreakdown.map((b, idx) => (
                    <tr key={idx} className="hover:bg-sadc-bg">
                      <td className="p-2 font-mono text-sadc-muted">{idx + 1}</td>
                      <td className="p-2 font-medium text-sadc-navy">{b.item}</td>
                      <td className="p-2 text-sadc-muted">{b.notes || '—'}</td>
                      <td className="p-2 text-right font-mono font-semibold">₹{b.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  <tr className="bg-sadc-bg font-bold">
                    <td colSpan="3" className="p-2.5 text-right font-mono text-sadc-navy uppercase tracking-wider">
                      Total Grant Sanctioned / Requested:
                    </td>
                    <td className="p-2.5 text-right font-mono text-sm text-sadc-navy border-t-2 border-sadc-navy">
                      ₹{proposal.budgetTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SECTION 4: DEAN OFFICE REMARKS */}
            <div className="mb-8 p-4 border border-sadc-border rounded-sm bg-sadc-gold-light/20">
              <h3 className="font-serif text-xs font-bold text-sadc-navy uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Stamp className="w-4 h-4 text-sadc-gold" />
                <span>4. SADC Administrative Board Review Remarks</span>
              </h3>
              <p className="text-xs text-sadc-text leading-relaxed font-sans">
                {proposal.adminRemarks || 'Official review in progress by SADC Dean Office.'}
              </p>
              {proposal.reviewedBy && (
                <p className="text-[11px] font-mono text-sadc-muted mt-2">
                  Decision recorded by: <strong className="text-sadc-navy">{proposal.reviewedBy}</strong> on {new Date(proposal.reviewedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* SECTION 5: INSTITUTIONAL SIGNATURE BLOCK */}
            <div className="pt-6 border-t-2 border-sadc-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-[10px] font-mono">
              <div className="space-y-8">
                <div className="h-10 border-b border-sadc-border flex items-end justify-center pb-1 text-sadc-muted italic font-serif">
                  {proposal.applicantName}
                </div>
                <div>
                  <p className="font-bold text-sadc-navy">STUDENT APPLICANT</p>
                  <p className="text-sadc-muted">Roll #{proposal.applicantRollNo}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-10 border-b border-sadc-border flex items-end justify-center pb-1 text-sadc-muted italic font-serif">
                  Verified Online
                </div>
                <div>
                  <p className="font-bold text-sadc-navy">FACULTY ADVISOR</p>
                  <p className="text-sadc-muted">{proposal.department}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-10 border-b border-sadc-border flex items-end justify-center pb-1 text-sadc-muted italic font-serif">
                  Dr. S. Rao
                </div>
                <div>
                  <p className="font-bold text-sadc-navy">SADC CONVENER</p>
                  <p className="text-sadc-muted">Activity Board</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-10 border-b-2 border-sadc-navy flex items-end justify-center pb-1 text-sadc-navy font-serif font-bold">
                  {proposal.status === 'Approved' ? 'Dr. V. Roy (SEAL)' : '[PENDING SEAL]'}
                </div>
                <div>
                  <p className="font-bold text-sadc-navy">DEAN STUDENT AFFAIRS</p>
                  <p className="text-sadc-gold">Official SADC Stamp</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
