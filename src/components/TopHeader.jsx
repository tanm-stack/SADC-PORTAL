import React, { useState } from 'react';
import { Bell, ShieldCheck, User, Search, ExternalLink, ChevronDown, Check, X, Plus, Trash2, RotateCcw } from 'lucide-react';

export default function TopHeader({ currentRole, activeNav, userProfile, onSelectNav, announcements = [], onAddAnnouncement, onDeleteAnnouncement, onResetData }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);

  const [newNotice, setNewNotice] = useState({
    title: '',
    priority: 'Normal',
    body: ''
  });

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Student Affairs Overview & Guidelines',
      'submit-proposal': 'New Activity Proposal Submission',
      'my-proposals': 'Submitted Proposals & Status Tracking',
      'gallery': 'SADC Event Photo Gallery & Archives',
      'overview': 'Executive Administrative Summary',
      'proposals': 'Master Proposals Review & Financial Grants',
      'gallery-mgmt': 'Media Cell & Photo Gallery Management',
      'timeline': 'Institutional Activities & Events Record'
    };
    return titles[activeNav] || 'Student Affairs & Development Cell Portal';
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.body.trim()) return;

    const noticeObj = {
      id: `ANN-${Math.floor(10 + Math.random() * 90)}`,
      title: newNotice.title,
      date: new Date().toISOString().split('T')[0],
      priority: newNotice.priority,
      body: newNotice.body
    };

    if (onAddAnnouncement) {
      onAddAnnouncement(noticeObj);
    }
    setNewNotice({ title: '', priority: 'Normal', body: '' });
    setShowAddNoticeModal(false);
  };

  return (
    <header className="bg-white border-b border-sadc-border min-h-[64px] px-6 flex items-center justify-between sticky top-0 z-10 shadow-token">
      
      {/* College Logo & Page Title */}
      <div className="flex items-center gap-3">
        <img
          src="/college_logo.png"
          alt="St. Vincent Pallotti Logo"
          className="w-10 h-10 object-contain hidden sm:block"
        />
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-sadc-muted uppercase tracking-wider">
            <span className="text-sadc-navy font-bold">STUDENT AFFAIRS & DEVELOPMENT CELL</span>
            <span>/</span>
            <span>ST. VINCENT PALLOTTI COLLEGE</span>
            <span>/</span>
            <span className="text-sadc-gold font-semibold">
              {currentRole === 'student' ? 'STUDENT PORTAL' : 'ADMIN DESK'}
            </span>
          </div>
          <h1 className="font-serif text-base font-semibold text-sadc-navy">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        {/* Active Role Indicator Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-sadc-bg border border-sadc-border rounded-sm text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-sadc-gold animate-pulse"></span>
          <span className="text-sadc-muted">MODE:</span>
          <span className="font-semibold text-sadc-navy uppercase">
            {currentRole === 'student' ? 'STUDENT (2024-CS-042)' : 'ADMIN DEAN OFFICE'}
          </span>
        </div>

        {/* System Reset Storage Option */}
        {onResetData && (
          <button
            type="button"
            onClick={onResetData}
            title="Reset System Data to Default"
            className="p-2 border border-sadc-border hover:border-red-300 text-stone-500 hover:text-red-700 bg-sadc-bg rounded-sm text-xs font-mono flex items-center gap-1 shadow-token"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sadc-gold" />
            <span className="hidden lg:inline text-[11px]">Reset Storage</span>
          </button>
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Institutional Announcements & Notifications"
            className="w-9 h-9 rounded-sm bg-sadc-bg border border-sadc-border flex items-center justify-center text-sadc-navy hover:bg-stone-200 transition-colors relative shadow-token"
          >
            <Bell className="w-4 h-4" />
            {announcements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-sadc-gold text-sadc-navy font-mono font-bold text-[10px] rounded-full flex items-center justify-center border border-white">
                {announcements.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-sadc-border rounded-sm shadow-elevated z-30 overflow-hidden">
              <div className="bg-sadc-navy text-white px-4 py-3 border-b border-sadc-navy/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-sadc-gold" />
                  <span className="font-serif text-sm font-semibold">Institutional Notices</span>
                </div>
                <div className="flex items-center gap-2">
                  {currentRole === 'admin' && (
                    <button
                      type="button"
                      onClick={() => { setShowNotifications(false); setShowAddNoticeModal(true); }}
                      className="px-2 py-0.5 bg-sadc-gold text-sadc-navy text-[11px] font-bold rounded-sm uppercase flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Post Notice</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-stone-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-sadc-border">
                {announcements.length === 0 ? (
                  <div className="p-6 text-center text-xs text-sadc-muted font-mono">
                    No active announcements logged.
                  </div>
                ) : (
                  announcements.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-sadc-bg transition-colors relative group">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-semibold uppercase ${
                          n.priority === 'High' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-stone-100 text-stone-700'
                        }`}>
                          {n.priority} Notice
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-sadc-muted">{n.date}</span>
                          {currentRole === 'admin' && onDeleteAnnouncement && (
                            <button
                              type="button"
                              onClick={() => onDeleteAnnouncement(n.id)}
                              className="text-stone-400 hover:text-red-700"
                              title="Delete announcement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-sadc-navy mb-1">{n.title}</h4>
                      <p className="text-xs text-sadc-muted leading-relaxed">{n.body}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-sadc-bg p-2 text-center border-t border-sadc-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    if (currentRole === 'student') onSelectNav('dashboard');
                    else onSelectNav('overview');
                  }}
                  className="text-[11px] text-sadc-navy font-semibold uppercase tracking-wider hover:underline"
                >
                  View All Administrative Bulletins →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logged in User Profile Chip */}
        <div className="flex items-center gap-2 pl-3 border-l border-sadc-border">
          <div className="w-8 h-8 rounded-sm bg-sadc-navy text-sadc-gold font-serif font-bold text-xs flex items-center justify-center border border-sadc-navy/30 shadow-token">
            {userProfile.avatarInitials || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-sadc-navy leading-tight">
              {userProfile.name}
            </p>
            <p className="text-[10px] text-sadc-muted font-mono leading-tight">
              {currentRole === 'student' ? userProfile.department : userProfile.designation}
            </p>
          </div>
        </div>

      </div>

      {/* POST ANNOUNCEMENT MODAL FOR ADMIN */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-sadc-border rounded-sm shadow-elevated w-full max-w-md overflow-hidden">
            <div className="bg-sadc-navy text-white px-5 py-3 flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold">Post Official Institutional Notice</h3>
              <button type="button" onClick={() => setShowAddNoticeModal(false)} className="text-stone-300 hover:text-white">✕</button>
            </div>
            <form onSubmit={handlePostNotice} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-sadc-navy uppercase mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. SADC Mid-Semester Venue Clearances"
                  className="w-full px-3 py-1.5 border border-sadc-border rounded-sm focus:outline-none focus:border-sadc-navy"
                />
              </div>
              <div>
                <label className="block font-semibold text-sadc-navy uppercase mb-1">Priority Level</label>
                <select
                  value={newNotice.priority}
                  onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                  className="w-full px-3 py-1.5 border border-sadc-border rounded-sm focus:outline-none"
                >
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority / Urgent</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-sadc-navy uppercase mb-1">Notice Content *</label>
                <textarea
                  rows={3}
                  required
                  value={newNotice.body}
                  onChange={(e) => setNewNotice({ ...newNotice, body: e.target.value })}
                  placeholder="Enter institutional notice text..."
                  className="w-full p-2.5 border border-sadc-border rounded-sm focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2 border-t border-sadc-border">
                <button type="button" onClick={() => setShowAddNoticeModal(false)} className="px-3 py-1.5 border border-sadc-border">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sadc-navy text-white font-semibold uppercase">Publish Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </header>
  );
}
