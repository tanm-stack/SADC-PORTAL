import React, { useState } from 'react';
import { X, Shield, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function ActionConfirmModal({ proposal, actionType, onClose, onConfirm }) {
  if (!proposal || !actionType) return null;

  const [remarks, setRemarks] = useState(
    actionType === 'Approved' 
      ? 'Approved by SADC Executive Board. Venue booked. Ensure safety protocols are maintained.'
      : 'Proposal does not meet standard activity guidelines or conflicts with examination schedules.'
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onConfirm(proposal.id, actionType, remarks);
      setLoading(false);
    }, 400);
  };

  const isApprove = actionType === 'Approved';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-sadc-border rounded-sm shadow-elevated w-full max-w-lg overflow-hidden">
        
        {/* Top Header */}
        <div className={`p-4 text-white flex items-center justify-between border-b ${
          isApprove ? 'bg-sadc-navy border-sadc-navy/30' : 'bg-red-950 border-red-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {isApprove ? (
              <CheckCircle2 className="w-5 h-5 text-sadc-gold" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <h3 className="font-serif text-sm font-semibold text-white">
              {isApprove ? 'Approve Proposal & Disburse Grant' : 'Reject Proposal'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-stone-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="p-3 bg-sadc-bg border border-sadc-border rounded-sm text-xs space-y-1">
            <p className="font-mono text-[10px] text-sadc-muted uppercase">TARGET PROPOSAL</p>
            <p className="font-bold text-sadc-navy text-sm">{proposal.title}</p>
            <div className="flex items-center justify-between text-sadc-muted text-[11px] pt-1">
              <span>Submitted by: <strong className="text-sadc-text">{proposal.applicantName}</strong></span>
              <span>Requested: <strong className="text-sadc-navy font-mono">₹{proposal.budgetTotal?.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
              Official SADC Administrative Remarks <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter official administrative justification or compliance instructions..."
              className="w-full p-3 text-xs bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
            />
            <p className="text-[10px] text-sadc-muted mt-1">
              Remarks will be printed on the official PDF approval record and notified to the student applicant.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-sadc-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-sadc-muted hover:text-sadc-navy bg-sadc-bg border border-sadc-border rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-sm border shadow-token transition-colors ${
                isApprove 
                  ? 'bg-sadc-navy hover:bg-sadc-navy-hover border-sadc-navy' 
                  : 'bg-red-800 hover:bg-red-900 border-red-800'
              }`}
            >
              {loading ? 'Processing...' : isApprove ? 'Sanction & Approve' : 'Confirm Rejection'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
