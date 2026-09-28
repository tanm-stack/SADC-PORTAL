'use client';

import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import ProposalPdfModal from './components/ProposalPdfModal';
import ActionConfirmModal from './components/ActionConfirmModal';

// Student Screens
import StudentOverview from './components/Student/StudentOverview';
import SubmitProposal from './components/Student/SubmitProposal';
import MyProposals from './components/Student/MyProposals';
import StudentGallery from './components/Student/StudentGallery';

// Admin Screens
import AdminOverview from './components/Admin/AdminOverview';
import AdminProposals from './components/Admin/AdminProposals';
import GalleryManagement from './components/Admin/GalleryManagement';
import ActivitiesTimeline from './components/Admin/ActivitiesTimeline';

import { CURRENT_STUDENT, CURRENT_ADMIN } from './data/mockData';
import {
  getStoredProposals,
  saveStoredProposals,
  getStoredGallery,
  saveStoredGallery,
  getStoredActivities,
  saveStoredActivities,
  getStoredAnnouncements,
  saveStoredAnnouncements,
  getStoredAuthSession,
  setStoredAuthSession,
  clearStoredAuthSession,
  resetAllPortalData
} from './services/storage';

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState('student'); // 'student' or 'admin'
  const [userProfile, setUserProfile] = useState(CURRENT_STUDENT);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // App Persistent Data States
  const [proposals, setProposals] = useState([]);
  const [galleryAlbums, setGalleryAlbums] = useState([]);
  const [activities, setActivities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Modals state
  const [selectedPdfProposal, setSelectedPdfProposal] = useState(null);
  const [actionModal, setActionModal] = useState(null); // { proposal, actionType }

  useEffect(() => {
    setIsMounted(true);
    const session = getStoredAuthSession();
    if (session) {
      setIsAuthenticated(true);
      setCurrentRole(session.role);
      setUserProfile(session.userProfile);
      setActiveNav(session.role === 'admin' ? 'overview' : 'dashboard');
    }
    setProposals(getStoredProposals());
    setGalleryAlbums(getStoredGallery());
    setActivities(getStoredActivities());
    setAnnouncements(getStoredAnnouncements());
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-sadc-bg flex items-center justify-center font-sans text-sadc-navy">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-sadc-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wider font-mono">Loading SADC Gateway...</span>
        </div>
      </div>
    );
  }

  const handleLogin = (role, profile) => {
    setCurrentRole(role);
    setUserProfile(profile);
    setIsAuthenticated(true);
    setActiveNav(role === 'student' ? 'dashboard' : 'overview');
    setStoredAuthSession(role, profile);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearStoredAuthSession();
  };

  const handleSwitchRole = () => {
    const nextRole = currentRole === 'student' ? 'admin' : 'student';
    const nextProfile = nextRole === 'admin' ? CURRENT_ADMIN : CURRENT_STUDENT;
    const nextNav = nextRole === 'admin' ? 'overview' : 'dashboard';
    
    setCurrentRole(nextRole);
    setUserProfile(nextProfile);
    setActiveNav(nextNav);
    setStoredAuthSession(nextRole, nextProfile);
  };

  const handleNewProposalSubmit = (newProp) => {
    const updated = [newProp, ...proposals];
    setProposals(updated);
    saveStoredProposals(updated);
    setActiveNav('my-proposals');
  };

  const handleAdminConfirmAction = (proposalId, actionType, remarks) => {
    const updated = proposals.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          status: actionType,
          adminRemarks: remarks,
          reviewedBy: CURRENT_ADMIN.name,
          reviewedAt: new Date().toISOString()
        };
      }
      return p;
    });
    setProposals(updated);
    saveStoredProposals(updated);
    setActionModal(null);
  };

  // Gallery CRUD handlers
  const handleAddGalleryAlbum = (album) => {
    const updated = [album, ...galleryAlbums];
    setGalleryAlbums(updated);
    saveStoredGallery(updated);
  };

  const handleDeleteGalleryAlbum = (albumId) => {
    const updated = galleryAlbums.filter(a => a.id !== albumId);
    setGalleryAlbums(updated);
    saveStoredGallery(updated);
  };

  // Activity Timeline CRUD handlers
  const handleAddActivity = (activity) => {
    const updated = [activity, ...activities];
    setActivities(updated);
    saveStoredActivities(updated);
  };

  // Announcement CRUD handlers
  const handleAddAnnouncement = (announcement) => {
    const updated = [announcement, ...announcements];
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    const updated = announcements.filter(a => a.id !== announcementId);
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
  };

  // System Reset Handler
  const handleResetData = () => {
    if (window.confirm('Reset all portal data back to factory defaults? This clears local changes.')) {
      resetAllPortalData();
      setProposals(getStoredProposals());
      setGalleryAlbums(getStoredGallery());
      setActivities(getStoredActivities());
      setAnnouncements(getStoredAnnouncements());
    }
  };

  // If not logged in, show dedicated institutional login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-sadc-bg text-sadc-text flex flex-col font-sans selection:bg-sadc-gold-light selection:text-sadc-navy">
      
      <div className="flex flex-1 min-h-screen">
        
        {/* Persistent Collapsible Left Sidebar */}
        <Sidebar
          currentRole={currentRole}
          activeNav={activeNav}
          onSelectNav={(navId) => setActiveNav(navId)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          userProfile={userProfile}
          onLogout={handleLogout}
          onSwitchRole={handleSwitchRole}
        />

        {/* Main Application Right Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Administrative Header */}
          <TopHeader
            currentRole={currentRole}
            activeNav={activeNav}
            userProfile={userProfile}
            onSelectNav={(navId) => setActiveNav(navId)}
            announcements={announcements}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onResetData={handleResetData}
          />

          {/* Dynamic Content View Container */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
            
            {/* STUDENT VIEWS */}
            {currentRole === 'student' && (
              <>
                {activeNav === 'dashboard' && (
                  <StudentOverview
                    proposals={proposals}
                    onNavigate={(navId) => setActiveNav(navId)}
                    onSelectProposal={(p) => setSelectedPdfProposal(p)}
                  />
                )}

                {activeNav === 'submit-proposal' && (
                  <SubmitProposal
                    onSubmitSuccess={handleNewProposalSubmit}
                    onCancel={() => setActiveNav('dashboard')}
                  />
                )}

                {activeNav === 'my-proposals' && (
                  <MyProposals
                    proposals={proposals}
                    onSelectProposal={(p) => setSelectedPdfProposal(p)}
                    onNewProposal={() => setActiveNav('submit-proposal')}
                  />
                )}

                {activeNav === 'gallery' && (
                  <StudentGallery galleryAlbums={galleryAlbums} />
                )}
              </>
            )}

            {/* ADMIN VIEWS */}
            {currentRole === 'admin' && (
              <>
                {activeNav === 'overview' && (
                  <AdminOverview
                    proposals={proposals}
                    onNavigate={(navId) => setActiveNav(navId)}
                    onOpenActionModal={(p, action) => setActionModal({ proposal: p, actionType: action })}
                    onSelectProposal={(p) => setSelectedPdfProposal(p)}
                  />
                )}

                {activeNav === 'proposals' && (
                  <AdminProposals
                    proposals={proposals}
                    onOpenActionModal={(p, action) => setActionModal({ proposal: p, actionType: action })}
                    onSelectProposal={(p) => setSelectedPdfProposal(p)}
                  />
                )}

                {activeNav === 'gallery-mgmt' && (
                  <GalleryManagement
                    albums={galleryAlbums}
                    onAddAlbum={handleAddGalleryAlbum}
                    onDeleteAlbum={handleDeleteGalleryAlbum}
                  />
                )}

                {activeNav === 'timeline' && (
                  <ActivitiesTimeline
                    timelineItems={activities}
                    onAddActivity={handleAddActivity}
                  />
                )}
              </>
            )}

          </main>

          {/* Bottom Administrative System Footer */}
          <footer className="bg-white border-t border-sadc-border py-4 px-6 text-center text-xs text-sadc-muted flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 St. Vincent Pallotti College of Engineering & Technology · SADC Office</p>
            <p className="font-mono text-[11px]">
              Institutional Governance Protocol · Encrypted Gateway v4.2
            </p>
          </footer>

        </div>

      </div>

      {/* Official Printable Proposal PDF Modal */}
      {selectedPdfProposal && (
        <ProposalPdfModal
          proposal={selectedPdfProposal}
          onClose={() => setSelectedPdfProposal(null)}
        />
      )}

      {/* Admin Approve/Reject Decision Modal */}
      {actionModal && (
        <ActionConfirmModal
          proposal={actionModal.proposal}
          actionType={actionModal.actionType}
          onClose={() => setActionModal(null)}
          onConfirm={handleAdminConfirmAction}
        />
      )}

    </div>
  );
}
