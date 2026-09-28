import React, { useState } from 'react';
import { Shield, GraduationCap, UserCheck, Lock, Mail, KeyRound, ArrowRight, HelpCircle, Monitor } from 'lucide-react';
import { CURRENT_STUDENT, CURRENT_ADMIN } from '../data/mockData';

export default function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'admin'
  const [studentId, setStudentId] = useState('2024-CS-042');
  const [studentEmail, setStudentEmail] = useState('aarav.sharma@stpallotti.edu.in');
  const [studentPassword, setStudentPassword] = useState('••••••••••••');
  
  const [adminId, setAdminId] = useState('STAFF-ADM-8801');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentId || !studentEmail) {
      setErrorMsg('Please enter valid student Roll Number and Institutional Email.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin('student', CURRENT_STUDENT);
    }, 600);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminId || !adminPassword) {
      setErrorMsg('Please enter valid Admin User ID and Password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin('admin', CURRENT_ADMIN);
    }, 600);
  };


  return (
    <div className="min-h-screen bg-sadc-bg flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-sadc-gold-light selection:text-sadc-navy">
      
      {/* Institutional Top Header with Official Logos */}
      <header className="w-full max-w-4xl flex items-center justify-between pb-6 border-b border-sadc-border mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/college_logo.png"
              alt="St. Vincent Pallotti College Logo"
              className="w-14 h-14 object-contain drop-shadow-xs"
            />
            <img
              src="/sadc_logo.png"
              alt="Student Council SADC Torch Logo"
              className="w-14 h-14 object-contain drop-shadow-xs"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-sadc-navy tracking-tight leading-tight uppercase">
              STUDENT AFFAIRS AND DEVELOPMENT CELL (SADC)
            </h1>
            <p className="text-xs font-semibold text-sadc-navy uppercase tracking-wider mt-0.5">
              ST. VINCENT PALLOTTI COLLEGE OF ENGINEERING & TECHNOLOGY
            </p>
            <p className="text-xs text-sadc-gold font-bold uppercase tracking-wider mt-0.5">
              NAGPUR · ARISE & SHINE
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-sadc-muted bg-white px-3 py-1.5 rounded-sm border border-sadc-border shadow-token">
          <Lock className="w-3.5 h-3.5 text-sadc-gold" />
          <span>SSL ENCRYPTED · OFFICIAL GATEWAY</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="w-full max-w-md my-auto">
        <div className="bg-white border border-sadc-border shadow-elevated rounded-sm overflow-hidden">
          
          {/* Card Title Banner */}
          <div className="bg-sadc-navy text-sadc-surface p-6 border-b border-sadc-navy/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/sadc_logo.png"
                  alt="SADC Torch Seal"
                  className="w-12 h-12 object-contain bg-white rounded-full p-1 border border-sadc-gold"
                />
                <div>
                  <span className="text-[10px] font-mono text-sadc-gold uppercase tracking-widest block mb-0.5">
                    STUDENT COUNCIL & SADC OFFICE
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-white">
                    Institutional Portal Login
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Portal Switcher Tabs */}
          <div className="grid grid-cols-2 bg-sadc-bg border-b border-sadc-border">
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setErrorMsg(''); }}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'student'
                  ? 'border-sadc-gold text-sadc-navy bg-white shadow-token font-bold'
                  : 'border-transparent text-sadc-muted hover:text-sadc-navy hover:bg-stone-100'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeTab === 'student' ? 'text-sadc-gold' : 'text-sadc-muted'}`} />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'admin'
                  ? 'border-sadc-gold text-sadc-navy bg-white shadow-token font-bold'
                  : 'border-transparent text-sadc-muted hover:text-sadc-navy hover:bg-stone-100'
              }`}
            >
              <UserCheck className={`w-4 h-4 ${activeTab === 'admin' ? 'text-sadc-gold' : 'text-sadc-muted'}`} />
              <span>SADC Office PC</span>
            </button>
          </div>

          <div className="p-6">
            {errorMsg && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STUDENT LOGIN FORM */}
            {activeTab === 'student' && (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                    Student Roll Number / Registration ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 2024-CS-042"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
                    />
                    <GraduationCap className="w-4 h-4 text-sadc-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                    College Email Address (@stpallotti.edu.in)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@stpallotti.edu.in"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
                    />
                    <Mail className="w-4 h-4 text-sadc-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
                    />
                    <KeyRound className="w-4 h-4 text-sadc-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sadc-navy hover:bg-sadc-navy-hover text-white py-2.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-sadc-navy shadow-token transition-colors"
                  >
                    {loading ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <span>Enter Student Dashboard</span>
                        <ArrowRight className="w-4 h-4 text-sadc-gold" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ADMIN LOGIN FORM (Single dedicated office PC mode) */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                {/* Single Office PC Terminal Notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900 flex items-start gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950 block">Single Dedicated Office PC Terminal</span>
                    <span className="text-[11px] text-amber-800">
                      Single admin session active on SADC Office Workstation (Room 204).
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                    Admin User ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      placeholder="e.g. STAFF-ADM-8801"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
                    />
                    <UserCheck className="w-4 h-4 text-sadc-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy font-mono"
                    />
                    <KeyRound className="w-4 h-4 text-sadc-muted absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sadc-navy hover:bg-sadc-navy-hover text-white py-2.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-sadc-navy shadow-token transition-colors"
                  >
                    {loading ? (
                      <span>Validating Staff Credentials...</span>
                    ) : (
                      <>
                        <span>Enter Admin Control Desk</span>
                        <ArrowRight className="w-4 h-4 text-sadc-gold" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}


          </div>

          {/* Footer note */}
          <div className="bg-sadc-bg px-6 py-3 border-t border-sadc-border text-[11px] text-sadc-muted flex items-center justify-between">
            <span>SADC Portal · St. Vincent Pallotti Nagpur</span>
            <span className="text-sadc-navy font-semibold">Single Office PC Restricted</span>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full max-w-4xl pt-6 border-t border-sadc-border text-center text-xs text-sadc-muted mt-6">
        <p>© 2026 St. Vincent Pallotti College of Engineering & Technology, Nagpur. All rights reserved.</p>
        <p className="text-[11px] mt-1 text-stone-500">Student Affairs and Development Cell (SADC) & Student Council Portal</p>
      </footer>
    </div>
  );
}
