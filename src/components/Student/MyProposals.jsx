import React, { useState } from 'react';
import { Search, Filter, Printer, FileText, ChevronRight, Eye, Calendar, MapPin, DollarSign, Download } from 'lucide-react';
import StatusBadge from '../StatusBadge';

export default function MyProposals({ proposals, onSelectProposal, onNewProposal }) {
  const myProposals = proposals.filter(p => p.applicantRollNo === '2024-CS-042');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProposalDrawer, setSelectedProposalDrawer] = useState(null);

  const filteredProposals = myProposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="bg-white border border-sadc-border p-5 rounded-sm shadow-token flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy">
            My Proposal Records & Applications
          </h2>
          <p className="text-xs text-sadc-muted mt-0.5">
            Track status, official Dean Office endorsements, and printable sanction documents.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewProposal}
          className="bg-sadc-navy hover:bg-sadc-navy-hover text-white px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-sadc-navy shadow-token"
        >
          <FileText className="w-4 h-4 text-sadc-gold" />
          <span>New Proposal</span>
        </button>
      </div>

      {/* Filter Tabs & Search Input */}
      <div className="bg-white border border-sadc-border p-4 rounded-sm shadow-token space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-sadc-bg p-1 rounded-sm border border-sadc-border w-full sm:w-auto">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
                  statusFilter === status
                    ? 'bg-sadc-navy text-white shadow-token'
                    : 'text-sadc-muted hover:text-sadc-navy hover:bg-white'
                }`}
              >
                {status} ({status === 'All' ? myProposals.length : myProposals.filter(p => p.status === status).length})
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Proposal ID or title..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
            />
            <Search className="w-4 h-4 text-sadc-muted absolute left-2.5 top-2" />
          </div>

        </div>
      </div>

      {/* Main Proposals Data Table */}
      <div className="bg-white border border-sadc-border rounded-sm shadow-token overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-sadc-navy text-white font-mono text-[11px] border-b border-sadc-navy/30">
                <th className="p-3 border-r border-sadc-navy/30">PROPOSAL CODE</th>
                <th className="p-3 border-r border-sadc-navy/30">EVENT TITLE & CATEGORY</th>
                <th className="p-3 border-r border-sadc-navy/30">PROPOSED DATE & VENUE</th>
                <th className="p-3 border-r border-sadc-navy/30">BUDGET (₹)</th>
                <th className="p-3 border-r border-sadc-navy/30">STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sadc-border">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sadc-muted font-mono text-xs">
                    No proposal records matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProposals.map((p) => (
                  <tr key={p.id} className="hover:bg-sadc-bg/70 transition-colors">
                    
                    <td className="p-3 font-mono font-bold text-sadc-navy">
                      {p.id}
                    </td>

                    <td className="p-3 max-w-xs">
                      <p className="font-semibold text-sadc-navy line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-sadc-muted font-mono">{p.category}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-mono text-sadc-text font-medium">{p.proposedDate}</p>
                      <p className="text-[11px] text-sadc-muted truncate">{p.venue}</p>
                    </td>

                    <td className="p-3 font-mono font-bold text-sadc-navy">
                      ₹{p.budgetTotal.toLocaleString('en-IN')}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={p.status} />
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProposalDrawer(p)}
                        className="px-2.5 py-1 bg-sadc-bg hover:bg-stone-200 text-sadc-navy border border-sadc-border rounded-sm text-[11px] font-semibold"
                        title="View details"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProposal(p)}
                        className="px-2.5 py-1 bg-sadc-navy hover:bg-sadc-navy-hover text-white rounded-sm text-[11px] font-semibold inline-flex items-center gap-1 shadow-token"
                        title="Print / View Official PDF"
                      >
                        <Printer className="w-3 h-3 text-sadc-gold" />
                        <span>Official PDF</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Proposal Detail Drawer */}
      {selectedProposalDrawer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-end z-40">
          <div className="bg-white w-full max-w-md h-full border-l border-sadc-border p-6 overflow-y-auto space-y-6 shadow-elevated">
            
            <div className="flex items-center justify-between border-b border-sadc-border pb-4">
              <div>
                <span className="font-mono text-xs text-sadc-gold font-bold">
                  {selectedProposalDrawer.id}
                </span>
                <h3 className="font-serif text-lg font-bold text-sadc-navy">
                  Proposal Detail Drawer
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProposalDrawer(null)}
                className="text-sadc-muted hover:text-sadc-navy font-mono text-xs border border-sadc-border px-2 py-1 rounded-sm"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <p className="text-sadc-muted text-[11px] uppercase font-mono">Title</p>
                <p className="font-bold text-sadc-navy text-sm">{selectedProposalDrawer.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-sadc-bg p-3 border border-sadc-border rounded-sm">
                <div>
                  <p className="text-sadc-muted text-[11px]">Current Status</p>
                  <StatusBadge status={selectedProposalDrawer.status} />
                </div>
                <div>
                  <p className="text-sadc-muted text-[11px]">Sanction Amount</p>
                  <p className="font-mono font-bold text-sadc-navy text-sm">
                    ₹{selectedProposalDrawer.budgetTotal.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sadc-muted text-[11px] uppercase font-mono">Faculty Advisor</p>
                <p className="font-semibold text-sadc-text">{selectedProposalDrawer.facultyAdvisor}</p>
              </div>

              <div>
                <p className="text-sadc-muted text-[11px] uppercase font-mono">Executive Summary</p>
                <p className="text-sadc-text leading-relaxed bg-stone-50 p-3 border border-sadc-border rounded-sm">
                  {selectedProposalDrawer.summary}
                </p>
              </div>

              {selectedProposalDrawer.adminRemarks && (
                <div className="bg-sadc-gold-light/40 p-3 border border-sadc-gold/40 rounded-sm">
                  <p className="text-sadc-navy font-bold text-[11px] uppercase">SADC Dean Office Remarks:</p>
                  <p className="text-sadc-text mt-1">{selectedProposalDrawer.adminRemarks}</p>
                </div>
              )}

              <div className="pt-4 border-t border-sadc-border flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const p = selectedProposalDrawer;
                    setSelectedProposalDrawer(null);
                    onSelectProposal(p);
                  }}
                  className="w-full bg-sadc-navy text-white py-2 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-sadc-navy shadow-token"
                >
                  <Printer className="w-4 h-4 text-sadc-gold" />
                  <span>Open Official PDF View</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
