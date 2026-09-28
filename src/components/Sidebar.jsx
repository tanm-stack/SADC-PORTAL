import React from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  FilePlus, 
  FileText, 
  Image, 
  BarChart3, 
  Inbox, 
  FolderKanban, 
  History, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  GraduationCap,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  currentRole, 
  activeNav, 
  onSelectNav, 
  isCollapsed, 
  onToggleCollapse,
  userProfile,
  onLogout,
  onSwitchRole
}) {

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submit-proposal', label: 'Submit Proposal', icon: FilePlus },
    { id: 'my-proposals', label: 'My Proposals', icon: FileText },
    { id: 'gallery', label: 'Gallery', icon: Image }
  ];

  const adminNavItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'proposals', label: 'Proposals Review', icon: Inbox },
    { id: 'gallery-mgmt', label: 'Gallery Management', icon: FolderKanban },
    { id: 'timeline', label: 'Activities Timeline', icon: History }
  ];

  const navItems = currentRole === 'student' ? studentNavItems : adminNavItems;

  return (
    <aside 
      className={`bg-white border-r border-sadc-border flex flex-col justify-between transition-all duration-300 relative z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header / Branding */}
      <div>
        <div className="p-4 border-b border-sadc-border bg-sadc-navy text-white flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/sadc_logo.png"
              alt="SADC Torch Logo"
              className="w-9 h-9 object-contain bg-white rounded-full p-0.5 border border-sadc-gold flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="truncate">
                <h2 className="font-serif text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  STUDENT AFFAIRS & DEV CELL
                </h2>
                <p className="text-[10px] text-sadc-gold font-mono uppercase tracking-widest truncate">
                  ST. VINCENT PALLOTTI COLLEGE
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1 rounded-sm text-sadc-gold hover:text-white hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Current Active Role Indicator Strip */}
        {!isCollapsed && (
          <div className="bg-sadc-bg px-4 py-2 border-b border-sadc-border text-[11px] font-mono text-sadc-muted flex items-center justify-between">
            <span>ROLE:</span>
            <span className="font-bold text-sadc-navy uppercase flex items-center gap-1">
              {currentRole === 'student' ? (
                <>
                  <GraduationCap className="w-3 h-3 text-sadc-gold" />
                  <span>STUDENT</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3 h-3 text-sadc-gold" />
                  <span>ADMINISTRATOR</span>
                </>
              )}
            </span>
          </div>
        )}

        {/* Navigation Section */}
        <nav className="p-3 space-y-1">
          <p className={`text-[10px] font-mono uppercase text-sadc-muted tracking-wider px-3 py-1 mb-1 ${isCollapsed ? 'sr-only' : 'block'}`}>
            NAVIGATION MENU
          </p>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectNav(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-sadc-navy text-white shadow-token font-semibold'
                    : 'text-sadc-text hover:bg-sadc-bg hover:text-sadc-navy'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1 bottom-1 w-1 bg-sadc-gold rounded-r-sm" />
                )}

                {/* Floating Icon Token */}
                <div
                  className={`w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/10 text-sadc-gold'
                      : 'bg-sadc-bg border border-sadc-border text-sadc-navy group-hover:border-sadc-navy/30'
                  }`}
                >
                  <IconComponent className="w-4 h-4 stroke-[1.75]" />
                </div>

                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: User Info & Quick Action */}
      <div className="p-3 border-t border-sadc-border bg-sadc-bg space-y-2">
        {!isCollapsed && (
          <div className="p-2.5 bg-white border border-sadc-border rounded-sm">
            <p className="text-xs font-semibold text-sadc-navy truncate">
              {userProfile.name}
            </p>
            <p className="text-[11px] text-sadc-muted font-mono truncate">
              {currentRole === 'student' ? userProfile.rollNo : userProfile.staffId}
            </p>
          </div>
        )}

        {/* Role Switcher Demo Shortcut */}
        <button
          type="button"
          onClick={onSwitchRole}
          title="Switch viewing context between Student & Admin"
          className={`w-full flex items-center gap-2 px-3 py-2 border border-sadc-border rounded-sm text-[11px] font-semibold text-sadc-navy bg-white hover:bg-sadc-gold-light hover:border-sadc-gold transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {!isCollapsed && (
            <span className="truncate">
              Switch to {currentRole === 'student' ? 'Admin Mode' : 'Student Mode'}
            </span>
          )}
          <UserCheck className="w-3.5 h-3.5 text-sadc-gold flex-shrink-0" />
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          title="Log out of institutional portal"
          className={`w-full flex items-center gap-2 px-3 py-2 border border-red-200 rounded-sm text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <LogOut className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
