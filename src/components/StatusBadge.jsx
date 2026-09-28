import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  switch (status) {
    case 'Approved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm bg-sadc-gold-light text-sadc-navy border border-sadc-gold/40 shadow-token">
          <CheckCircle2 className="w-3.5 h-3.5 text-sadc-gold" />
          <span>APPROVED</span>
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm bg-red-50 text-red-800 border border-red-200 shadow-token">
          <XCircle className="w-3.5 h-3.5 text-red-600" />
          <span>REJECTED</span>
        </span>
      );
    case 'Pending':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm bg-stone-100 text-stone-700 border border-sadc-border shadow-token">
          <Clock className="w-3.5 h-3.5 text-sadc-muted" />
          <span>UNDER REVIEW</span>
        </span>
      );
  }
}
