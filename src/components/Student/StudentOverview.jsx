import React from 'react';
import { FilePlus, FileText, CheckCircle2, Clock, AlertCircle, ArrowRight, Shield, Award, HelpCircle } from 'lucide-react';
import StatusBadge from '../StatusBadge';

export default function StudentOverview({ proposals, onNavigate, onSelectProposal }) {
  const myProposals = proposals.filter(p => p.applicantRollNo === '2024-CS-042');
  const approvedCount = myProposals.filter(p => p.status === 'Approved').length;
  const pendingCount = myProposals.filter(p => p.status === 'Pending').length;
  const totalSanctionedBudget = myProposals
    .filter(p => p.status === 'Approved')
    .reduce((acc, p) => acc + p.budgetTotal, 0);

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Banner */}
      <div className="bg-sadc-navy text-white p-6 border border-sadc-navy/30 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-sadc-gold uppercase tracking-widest block mb-1">
            ACADEMIC SESSION 2026-27 · AUTUMN TERM
          </span>
          <h2 className="font-serif text-2xl font-semibold text-white">
            Welcome, Aarav Sharma
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Roll #2024-CS-042 · Computer Science & Engineering · Coding & Robotics Club Lead
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('submit-proposal')}
          className="bg-sadc-gold hover:bg-sadc-gold-hover text-sadc-navy px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-sadc-gold shadow-token transition-colors flex-shrink-0"
        >
          <FilePlus className="w-4 h-4 text-sadc-navy" />
          <span>Submit Event Proposal</span>
        </button>
      </div>

      {/* Structured Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Total Submitted</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-bg border border-sadc-border flex items-center justify-center text-sadc-navy">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{myProposals.length}</p>
          <p className="text-[11px] text-sadc-muted mt-1">Proposals logged on portal</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Approved Grants</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-gold-light border border-sadc-gold/40 flex items-center justify-center text-sadc-navy">
              <CheckCircle2 className="w-4 h-4 text-sadc-gold" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{approvedCount}</p>
          <p className="text-[11px] text-sadc-gold font-semibold mt-1">Sanctioned by Dean Office</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Under Review</span>
            <div className="w-8 h-8 rounded-sm bg-stone-100 border border-sadc-border flex items-center justify-center text-sadc-navy">
              <Clock className="w-4 h-4 text-sadc-muted" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{pendingCount}</p>
          <p className="text-[11px] text-sadc-muted mt-1">Pending board evaluation</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Disbursed Funds</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-bg border border-sadc-border flex items-center justify-center text-sadc-navy font-mono font-bold text-xs">
              ₹
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-sadc-navy mt-2 font-mono">
            ₹{totalSanctionedBudget.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-sadc-muted mt-1">Total grant value approved</p>
        </div>

      </div>

      {/* Main Grid: Recent Proposals & Institutional Policy Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Proposals List (2 columns) */}
        <div className="lg:col-span-2 bg-white border border-sadc-border rounded-sm shadow-token overflow-hidden">
          <div className="px-6 py-4 border-b border-sadc-border flex items-center justify-between bg-sadc-bg">
            <h3 className="font-serif text-base font-semibold text-sadc-navy">
              My Recent Proposal Log
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('my-proposals')}
              className="text-xs font-semibold text-sadc-navy hover:text-sadc-gold flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-sadc-border">
            {myProposals.slice(0, 4).map((p) => (
              <div key={p.id} className="p-5 hover:bg-sadc-bg/60 transition-colors flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-sadc-muted font-bold">{p.id}</span>
                    <span className="text-[11px] font-mono text-sadc-muted">• {p.proposedDate}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-sadc-navy">{p.title}</h4>
                  <p className="text-xs text-sadc-muted">
                    Venue: <span className="text-sadc-text">{p.venue}</span> · Budget: <span className="font-mono font-semibold text-sadc-navy">₹{p.budgetTotal.toLocaleString('en-IN')}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={p.status} />
                  <button
                    type="button"
                    onClick={() => onSelectProposal(p)}
                    className="p-1.5 border border-sadc-border hover:border-sadc-navy rounded-sm text-sadc-navy bg-white hover:bg-sadc-navy hover:text-white transition-colors text-xs font-semibold"
                    title="View official document"
                  >
                    Doc
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Policy Guidelines Card (1 column) */}
        <div className="bg-white border border-sadc-border rounded-sm shadow-token p-6 space-y-4">
          <div className="flex items-center gap-2 text-sadc-navy border-b border-sadc-border pb-3">
            <Shield className="w-5 h-5 text-sadc-gold" />
            <h3 className="font-serif text-base font-semibold">
              SADC Approval Directives
            </h3>
          </div>

          <ul className="space-y-3 text-xs text-sadc-text">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sadc-gold mt-1.5 flex-shrink-0"></span>
              <span><strong>Advance Notice:</strong> Event proposals must be submitted at least 14 days prior to proposed date.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sadc-gold mt-1.5 flex-shrink-0"></span>
              <span><strong>Faculty Concurrence:</strong> Digital endorsement from Faculty Advisor is required for financial grants exceeding ₹25,000.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sadc-gold mt-1.5 flex-shrink-0"></span>
              <span><strong>Sound Cutoff:</strong> Outdoor campus events must conclude sound amplification by 09:30 PM.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sadc-gold mt-1.5 flex-shrink-0"></span>
              <span><strong>Post-Event Audit:</strong> Original bills and receipts must be submitted to SADC Office within 7 days of event completion.</span>
            </li>
          </ul>

          <div className="pt-2 border-t border-sadc-border">
            <a
              href="#policy"
              onClick={(e) => { e.preventDefault(); alert('Downloading SADC Policy Guidelines 2026-27 (PDF)'); }}
              className="text-xs font-mono text-sadc-navy font-semibold underline hover:text-sadc-gold flex items-center gap-1"
            >
              <span>Download Full SADC Rulebook PDF</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
