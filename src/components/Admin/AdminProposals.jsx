import React, { useState } from 'react';
import { Search, Filter, Printer, CheckCircle2, XCircle, Eye, Download, ShieldCheck, DollarSign } from 'lucide-react';
import StatusBadge from '../StatusBadge';

export default function AdminProposals({ proposals, onOpenActionModal, onSelectProposal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  const departments = ['All', ...new Set(proposals.map(p => p.department))];

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesDept = deptFilter === 'All' || p.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Title & Stats */}
      <div className="bg-white border border-sadc-border p-5 rounded-sm shadow-token flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy">
            Master Proposals Administrative Review
          </h2>
          <p className="text-xs text-sadc-muted mt-0.5">
            Evaluate student activity applications, issue financial grant sanctions, and generate PDF approval certificates.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-sadc-bg px-3 py-1.5 border border-sadc-border rounded-sm">
            <span>TOTAL LOGGED: </span>
            <strong className="text-sadc-navy">{proposals.length}</strong>
          </div>
          <div className="bg-sadc-gold-light px-3 py-1.5 border border-sadc-gold/40 rounded-sm text-sadc-navy">
            <span>PENDING DECISION: </span>
            <strong className="font-bold">{proposals.filter(p => p.status === 'Pending').length}</strong>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-sadc-border p-4 rounded-sm shadow-token space-y-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-sadc-bg p-1 rounded-sm border border-sadc-border w-full lg:w-auto overflow-x-auto">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-sadc-navy text-white shadow-token'
                    : 'text-sadc-muted hover:text-sadc-navy hover:bg-white'
                }`}
              >
                {status} ({status === 'All' ? proposals.length : proposals.filter(p => p.status === status).length})
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Department Dropdown Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy w-full sm:w-auto"
            >
              <option value="All">Filter by Department: All</option>
              {departments.filter(d => d !== 'All').map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Title, ID, Student Name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
              />
              <Search className="w-4 h-4 text-sadc-muted absolute left-2.5 top-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Master Proposals Table */}
      <div className="bg-white border border-sadc-border rounded-sm shadow-token overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-sadc-navy text-white font-mono text-[11px] border-b border-sadc-navy/30">
                <th className="p-3 border-r border-sadc-navy/30">CODE</th>
                <th className="p-3 border-r border-sadc-navy/30">PROPOSAL TITLE & SOCIETY</th>
                <th className="p-3 border-r border-sadc-navy/30">STUDENT APPLICANT</th>
                <th className="p-3 border-r border-sadc-navy/30">DATE & VENUE</th>
                <th className="p-3 border-r border-sadc-navy/30">GRANT (₹)</th>
                <th className="p-3 border-r border-sadc-navy/30">STATUS</th>
                <th className="p-3 text-right">ADMIN ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sadc-border">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-sadc-muted font-mono text-xs">
                    No proposals match the current administrative filters.
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
                      <p className="text-[11px] text-sadc-muted font-mono">{p.organizer}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-sadc-text">{p.applicantName}</p>
                      <p className="text-[11px] text-sadc-muted font-mono">{p.applicantRollNo} · {p.department}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-mono text-sadc-text">{p.proposedDate}</p>
                      <p className="text-[11px] text-sadc-muted truncate">{p.venue}</p>
                    </td>

                    <td className="p-3 font-mono font-bold text-sadc-navy">
                      ₹{p.budgetTotal.toLocaleString('en-IN')}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={p.status} />
                    </td>

                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      
                      {/* Printable PDF Icon Button */}
                      <button
                        type="button"
                        onClick={() => onSelectProposal(p)}
                        className="px-2.5 py-1 bg-sadc-bg hover:bg-stone-200 border border-sadc-border text-sadc-navy rounded-sm text-[11px] font-semibold inline-flex items-center gap-1"
                        title="Download / Print Official PDF"
                      >
                        <Printer className="w-3.5 h-3.5 text-sadc-navy" />
                        <span>PDF</span>
                      </button>

                      {/* Inline Approve Action */}
                      <button
                        type="button"
                        onClick={() => onOpenActionModal(p, 'Approved')}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-sm border transition-colors ${
                          p.status === 'Approved'
                            ? 'bg-sadc-gold-light text-sadc-navy border-sadc-gold/40'
                            : 'bg-sadc-navy text-white hover:bg-sadc-navy-hover border-sadc-navy'
                        }`}
                        title="Approve Proposal"
                      >
                        Approve
                      </button>

                      {/* Inline Reject Action */}
                      <button
                        type="button"
                        onClick={() => onOpenActionModal(p, 'Rejected')}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-sm border transition-colors ${
                          p.status === 'Rejected'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-stone-100 text-stone-700 hover:bg-red-50 hover:text-red-700 border-sadc-border'
                        }`}
                        title="Reject Proposal"
                      >
                        Reject
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
