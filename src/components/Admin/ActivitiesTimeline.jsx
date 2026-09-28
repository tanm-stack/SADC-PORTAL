import React, { useState } from 'react';
import { History, Calendar, Plus, Tag, Shield, CheckCircle2, MapPin, Users, FileText } from 'lucide-react';

export default function ActivitiesTimeline({ timelineItems = [], onAddActivity }) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [termFilter, setTermFilter] = useState('All');

  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '2026-10-15',
    academicTerm: 'Autumn Semester 2026-27',
    category: 'Student Governance',
    coordinator: 'Dr. Vikramaditya Roy',
    venue: 'Senate Conference Room B',
    summary: '',
    tags: 'Governance, SADC'
  });

  const handleLogActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;

    const item = {
      id: `ACT-2026-00${timelineItems.length + 1}`,
      title: newActivity.title,
      date: newActivity.date,
      academicTerm: newActivity.academicTerm,
      category: newActivity.category,
      coordinator: newActivity.coordinator,
      venue: newActivity.venue,
      summary: newActivity.summary || 'Institutional event logged on SADC central timeline.',
      status: 'Completed',
      photosCount: 6,
      tags: newActivity.tags.split(',').map(t => t.trim())
    };

    if (onAddActivity) {
      onAddActivity(item);
    }
    setShowLogModal(false);
    setNewActivity({ title: '', date: '2026-10-15', academicTerm: 'Autumn Semester 2026-27', category: 'Student Governance', coordinator: 'Dr. Vikramaditya Roy', venue: 'Senate Conference Room B', summary: '', tags: 'Governance, SADC' });
  };

  const filteredItems = timelineItems.filter(item => {
    return termFilter === 'All' || item.academicTerm === termFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls */}
      <div className="bg-white border border-sadc-border p-5 rounded-sm shadow-token flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy">
            Institutional Activities Chronological Timeline
          </h2>
          <p className="text-xs text-sadc-muted mt-0.5">
            Audit log of SADC events, senate decisions, student fests, and governance milestones.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLogModal(true)}
          className="bg-sadc-navy hover:bg-sadc-navy-hover text-white px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-sadc-navy shadow-token"
        >
          <Plus className="w-4 h-4 text-sadc-gold" />
          <span>Log Activity Record</span>
        </button>
      </div>

      {/* Timeline Filter Bar */}
      <div className="bg-white border border-sadc-border p-4 rounded-sm shadow-token flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-sadc-muted uppercase">ACADEMIC TERM:</span>
          <select
            value={termFilter}
            onChange={(e) => setTermFilter(e.target.value)}
            className="px-3 py-1.5 bg-sadc-bg border border-sadc-border rounded-sm text-sadc-navy font-semibold focus:outline-none"
          >
            <option value="All">All Academic Semesters</option>
            <option value="Autumn Semester 2026-27">Autumn Semester 2026-27</option>
            <option value="Spring Semester 2025-26">Spring Semester 2025-26</option>
          </select>
        </div>

        <span className="text-xs font-mono text-sadc-muted">
          TOTAL RECORDED MILESTONES: <strong className="text-sadc-navy font-bold">{filteredItems.length}</strong>
        </span>
      </div>

      {/* VERTICAL INSTITUTIONAL TIMELINE CONTAINER */}
      <div className="bg-white border border-sadc-border rounded-sm shadow-token p-8 relative">
        
        {/* Central Vertical Connector Line */}
        <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-0.5 bg-sadc-border" />

        <div className="space-y-8 relative">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="flex items-start gap-4 sm:gap-6 relative group">
              
              {/* Timeline Date Marker & Node Circle */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sadc-navy text-sadc-gold font-bold text-xs flex items-center justify-center flex-shrink-0 border-2 border-white shadow-token z-10">
                <History className="w-4 h-4 text-sadc-gold" />
              </div>

              {/* Timeline Card */}
              <div className="flex-1 bg-sadc-bg/40 border border-sadc-border hover:border-sadc-navy transition-all p-5 rounded-sm shadow-token space-y-3">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sadc-border pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-sadc-muted">
                      <span className="font-bold text-sadc-navy">{item.id}</span>
                      <span>•</span>
                      <span className="bg-sadc-gold-light text-sadc-navy px-2 py-0.5 font-bold uppercase rounded-xs">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-sadc-navy mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right font-mono text-xs flex-shrink-0">
                    <span className="bg-white border border-sadc-border px-3 py-1 rounded-sm text-sadc-navy font-bold block">
                      {item.date}
                    </span>
                    <span className="text-[10px] text-sadc-muted block mt-1">{item.academicTerm}</span>
                  </div>
                </div>

                <p className="text-xs text-sadc-text leading-relaxed">
                  {item.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sadc-muted pt-2 border-t border-sadc-border/60">
                  <p>Coordinator: <strong className="text-sadc-text">{item.coordinator}</strong></p>
                  <p>Venue: <strong className="text-sadc-text">{item.venue}</strong></p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {item.tags && item.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-white border border-sadc-border text-sadc-muted rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* LOG ACTIVITY MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-sadc-border rounded-sm shadow-elevated w-full max-w-lg overflow-hidden">
            <div className="bg-sadc-navy text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold">Log Activity to SADC Timeline</h3>
              <button type="button" onClick={() => setShowLogModal(false)} className="text-stone-300 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleLogActivity} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g. SADC Mid-Term Financial Audit & Review"
                  className="w-full px-3 py-2 border border-sadc-border rounded-sm focus:outline-none focus:border-sadc-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                    className="w-full px-3 py-2 border border-sadc-border rounded-sm font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={newActivity.category}
                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                    className="w-full px-3 py-2 border border-sadc-border rounded-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">Summary Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newActivity.summary}
                  onChange={(e) => setNewActivity({ ...newActivity, summary: e.target.value })}
                  placeholder="Enter detailed activity log for institutional timeline records..."
                  className="w-full p-3 border border-sadc-border rounded-sm focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-sadc-border">
                <button type="button" onClick={() => setShowLogModal(false)} className="px-3 py-1.5 border border-sadc-border">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sadc-navy text-white font-semibold uppercase">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
