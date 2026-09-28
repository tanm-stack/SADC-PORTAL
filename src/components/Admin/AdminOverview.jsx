import React from 'react';
import { Inbox, CheckCircle2, Clock, DollarSign, ArrowRight, ShieldCheck, FileCheck, History, AlertCircle } from 'lucide-react';
import StatusBadge from '../StatusBadge';

export default function AdminOverview({ proposals, onNavigate, onOpenActionModal, onSelectProposal }) {
  const pendingProposals = proposals.filter(p => p.status === 'Pending');
  const approvedProposals = proposals.filter(p => p.status === 'Approved');
  const rejectedProposals = proposals.filter(p => p.status === 'Rejected');
  
  const totalSanctionedBudget = approvedProposals.reduce((sum, p) => sum + p.budgetTotal, 0);

  return (
    <div className="space-y-6">
      
      {/* Admin Executive Header */}
      <div className="bg-sadc-navy text-white p-6 border border-sadc-navy/30 rounded-sm shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-sadc-gold uppercase tracking-widest block mb-1">
            OFFICE OF STUDENT AFFAIRS & DEVELOPMENT CELL (SADC)
          </span>
          <h2 className="font-serif text-2xl font-semibold text-white">
            Administrative Executive Control Desk
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Logged in as: <strong>Dr. Vikramaditya Roy</strong> (Associate Dean, Student Affairs)
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('proposals')}
          className="bg-sadc-gold hover:bg-sadc-gold-hover text-sadc-navy px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-sadc-gold shadow-token transition-colors flex-shrink-0"
        >
          <Inbox className="w-4 h-4 text-sadc-navy" />
          <span>Review Proposals ({pendingProposals.length} Pending)</span>
        </button>
      </div>

      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Pending Decisions</span>
            <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-900 font-bold">
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{pendingProposals.length}</p>
          <p className="text-[11px] text-amber-800 font-semibold mt-1">Requires Dean Office Action</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Approved Grants</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-gold-light border border-sadc-gold/40 flex items-center justify-center text-sadc-navy font-bold">
              <CheckCircle2 className="w-4 h-4 text-sadc-gold" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{approvedProposals.length}</p>
          <p className="text-[11px] text-sadc-gold font-semibold mt-1">Sanctioned for Autumn 2026</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Total Disbursed Funds</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-bg border border-sadc-border flex items-center justify-center text-sadc-navy font-mono font-bold text-xs">
              ₹
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-sadc-navy mt-2 font-mono">
            ₹{totalSanctionedBudget.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-sadc-muted mt-1">Approved financial allocation</p>
        </div>

        <div className="bg-white p-5 border border-sadc-border rounded-sm shadow-token">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-sadc-muted uppercase tracking-wider">Total Evaluated</span>
            <div className="w-8 h-8 rounded-sm bg-sadc-bg border border-sadc-border flex items-center justify-center text-sadc-navy font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-sadc-navy mt-2">{proposals.length}</p>
          <p className="text-[11px] text-sadc-muted mt-1">Total applications logged</p>
        </div>

      </div>

      {/* Main Grid: Pending Approval Action Queue & Institutional Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Urgent Action Queue (2 columns) */}
        <div className="lg:col-span-2 bg-white border border-sadc-border rounded-sm shadow-token overflow-hidden">
          <div className="px-6 py-4 border-b border-sadc-border flex items-center justify-between bg-sadc-navy text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sadc-gold" />
              <h3 className="font-serif text-base font-semibold">
                Pending Decisions Action Queue ({pendingProposals.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('proposals')}
              className="text-xs font-semibold text-sadc-gold hover:underline uppercase tracking-wider"
            >
              Go to Proposals Desk →
            </button>
          </div>

          <div className="divide-y divide-sadc-border">
            {pendingProposals.length === 0 ? (
              <div className="p-8 text-center text-sadc-muted text-xs font-mono">
                No proposals currently pending administrative review.
              </div>
            ) : (
              pendingProposals.map((p) => (
                <div key={p.id} className="p-5 hover:bg-sadc-bg/70 transition-colors space-y-3">
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-sadc-muted">
                        <span className="font-bold text-sadc-navy">{p.id}</span>
                        <span>•</span>
                        <span>{p.category}</span>
                        <span>•</span>
                        <span>Date: {p.proposedDate}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-sadc-navy mt-0.5">{p.title}</h4>
                      <p className="text-xs text-sadc-muted mt-0.5">
                        Applicant: <strong className="text-sadc-text">{p.applicantName}</strong> ({p.applicantRollNo}) · Dept: {p.department}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 font-mono">
                      <span className="text-[10px] text-sadc-muted block uppercase">Requested Grant</span>
                      <span className="font-bold text-sadc-navy text-sm">₹{p.budgetTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Inline Action Buttons */}
                  <div className="pt-2 border-t border-sadc-border flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectProposal(p)}
                      className="text-xs font-mono text-sadc-navy font-semibold underline hover:text-sadc-gold"
                    >
                      Preview Official PDF Document
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenActionModal(p, 'Rejected')}
                        className="px-3 py-1.5 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 rounded-sm text-xs font-semibold"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenActionModal(p, 'Approved')}
                        className="px-3 py-1.5 bg-sadc-navy hover:bg-sadc-navy-hover text-white rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-token"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sadc-gold" />
                        <span>Approve Grant</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Institutional Activity Log (1 column) */}
        <div className="bg-white border border-sadc-border rounded-sm shadow-token p-6 space-y-4">
          <div className="flex items-center gap-2 text-sadc-navy border-b border-sadc-border pb-3">
            <History className="w-5 h-5 text-sadc-gold" />
            <h3 className="font-serif text-base font-semibold">
              Dean Office Audit Log
            </h3>
          </div>

          <div className="space-y-3 text-xs text-sadc-text">
            <div className="p-3 bg-sadc-bg border border-sadc-border rounded-sm">
              <span className="text-[10px] font-mono text-sadc-muted block">TODAY · 11:30 AM</span>
              <p className="font-semibold text-sadc-navy mt-0.5">Approved Grant #PROP-2026-089</p>
              <p className="text-[11px] text-sadc-muted">Sanctioned ₹1,45,000 for Inter-College Hackathon HackSphere 2026.</p>
            </div>

            <div className="p-3 bg-sadc-bg border border-sadc-border rounded-sm">
              <span className="text-[10px] font-mono text-sadc-muted block">YESTERDAY · 04:15 PM</span>
              <p className="font-semibold text-sadc-navy mt-0.5">Circular #44/2026 Issued</p>
              <p className="text-[11px] text-sadc-muted">Updated sound amplification policy published to all student societies.</p>
            </div>

            <div className="p-3 bg-sadc-bg border border-sadc-border rounded-sm">
              <span className="text-[10px] font-mono text-sadc-muted block">SEP 20, 2026</span>
              <p className="font-semibold text-sadc-navy mt-0.5">Gallery Album Published</p>
              <p className="text-[11px] text-sadc-muted">Media Cell uploaded 28 photos for Robotics National Exposition.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
