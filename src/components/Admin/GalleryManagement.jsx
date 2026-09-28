import React, { useState } from 'react';
import { Image, UploadCloud, Plus, Trash2, FolderKanban, CheckCircle2, Calendar, Tag, Shield } from 'lucide-react';

export default function GalleryManagement({ albums = [], onAddAlbum, onDeleteAlbum }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    category: 'Institutional',
    date: 'October 2026',
    description: '',
    uploadedBy: 'SADC Media Cell'
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleCreateAlbum = (e) => {
    e.preventDefault();
    if (!newAlbum.title.trim()) return;

    const albumObj = {
      id: `ALB-2026-0${albums.length + 1}`,
      title: newAlbum.title,
      category: newAlbum.category,
      date: newAlbum.date,
      photoCount: uploadedPhotos.length || 12,
      coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      description: newAlbum.description || 'Institutional photography record managed by SADC Media Cell.',
      uploadedBy: newAlbum.uploadedBy
    };

    if (onAddAlbum) {
      onAddAlbum(albumObj);
    }
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowCreateForm(false);
      setNewAlbum({ title: '', category: 'Institutional', date: 'October 2026', description: '', uploadedBy: 'SADC Media Cell' });
      setUploadedPhotos([]);
    }, 1200);
  };

  const handleSimulatePhotoDrop = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedPhotos(files.map(f => f.name));
    } else {
      setUploadedPhotos(['IMG_2026_001.JPG', 'IMG_2026_002.JPG', 'IMG_2026_003.JPG', 'IMG_2026_004.JPG']);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white border border-sadc-border p-5 rounded-sm shadow-token flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy">
            Media Cell & Photo Gallery Management
          </h2>
          <p className="text-xs text-sadc-muted mt-0.5">
            Publish event archives, manage photo albums, and curate official institutional galleries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-sadc-navy hover:bg-sadc-navy-hover text-white px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-sadc-navy shadow-token"
        >
          <Plus className="w-4 h-4 text-sadc-gold" />
          <span>{showCreateForm ? 'Cancel Form' : 'Create New Album'}</span>
        </button>
      </div>

      {/* CREATE ALBUM & PHOTO UPLOADER FORM */}
      {showCreateForm && (
        <form onSubmit={handleCreateAlbum} className="bg-white border border-sadc-border p-6 rounded-sm shadow-token space-y-6">
          <div className="border-b border-sadc-border pb-3 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-sadc-navy flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-sadc-gold" />
              <span>Create Official Event Album & Upload Photos</span>
            </h3>
            <span className="text-xs font-mono text-sadc-muted">SADC MEDIA CELL FORM</span>
          </div>

          {uploadSuccess && (
            <div className="p-4 bg-sadc-gold-light border border-sadc-gold/40 rounded-sm text-xs text-sadc-navy font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sadc-gold" />
              <span>Album and photos successfully published to public SADC gallery!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                Album Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={newAlbum.title}
                onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                placeholder="e.g. Annual Convocation & Dean Honors Night 2026"
                className="w-full px-3 py-2 bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
              />
            </div>

            <div>
              <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                Album Category <span className="text-red-600">*</span>
              </label>
              <select
                value={newAlbum.category}
                onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
              >
                <option value="Institutional">Institutional & Official</option>
                <option value="Technical">Technical & Robotics</option>
                <option value="Cultural">Cultural & Performing Arts</option>
                <option value="Sports & Athletics">Sports & Athletics</option>
                <option value="Social Service">Social Service & NSS</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-sadc-navy uppercase tracking-wider mb-1">
                Album Summary Description
              </label>
              <textarea
                rows={2}
                value={newAlbum.description}
                onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                placeholder="Brief paragraph summarizing key highlights..."
                className="w-full p-3 bg-white border border-sadc-border rounded-sm text-sadc-text focus:outline-none focus:border-sadc-navy"
              />
            </div>
          </div>

          {/* BATCH PHOTO UPLOADER ZONE */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-sadc-navy uppercase tracking-wider">
              Batch Photo Uploader (High Resolution JPG / PNG)
            </label>
            <div className="border-2 border-dashed border-sadc-border bg-sadc-bg p-8 text-center rounded-sm hover:border-sadc-navy transition-colors">
              <UploadCloud className="w-10 h-10 text-sadc-navy mx-auto mb-2" />
              <p className="text-xs font-semibold text-sadc-navy">
                Drag and drop high-resolution photos here, or click to browse files
              </p>
              <p className="text-[11px] text-sadc-muted mt-1">
                Supports batch selection up to 100 images per album (Max 15MB per file).
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleSimulatePhotoDrop}
                className="mt-3 inline-block text-xs font-mono text-sadc-muted"
              />
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="p-3 bg-sadc-bg border border-sadc-border rounded-sm text-xs space-y-1">
                <span className="font-mono text-[11px] text-sadc-navy font-bold uppercase">
                  {uploadedPhotos.length} Photos Staged for Upload:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {uploadedPhotos.map((fName, i) => (
                    <span key={i} className="px-2 py-1 bg-white border border-sadc-border text-[11px] font-mono text-sadc-muted rounded-sm">
                      {fName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-sadc-border">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-sadc-border text-xs font-semibold text-sadc-muted rounded-sm bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sadc-navy hover:bg-sadc-navy-hover text-white text-xs font-semibold uppercase tracking-wider rounded-sm border border-sadc-navy shadow-token flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-sadc-gold" />
              <span>Publish Album</span>
            </button>
          </div>

        </form>
      )}

      {/* EXISTING ALBUMS MANAGER GRID */}
      <div className="bg-white border border-sadc-border rounded-sm shadow-token p-6 space-y-4">
        <h3 className="font-serif text-base font-semibold text-sadc-navy border-b border-sadc-border pb-3 flex items-center justify-between">
          <span>Active Institutional Albums ({albums.length})</span>
          <span className="text-xs font-mono text-sadc-muted font-normal">SADC GALLERY ARCHIVE</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="border border-sadc-border p-4 rounded-sm bg-sadc-bg/40 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-sadc-gold font-bold uppercase">{album.id}</span>
                <h4 className="font-serif text-sm font-semibold text-sadc-navy">{album.title}</h4>
                <p className="text-xs text-sadc-muted">{album.photoCount} photos · {album.date}</p>
                <p className="text-[11px] text-sadc-navy font-mono">By: {album.uploadedBy}</p>
              </div>

              <button
                type="button"
                onClick={() => onDeleteAlbum && onDeleteAlbum(album.id)}
                className="text-stone-400 hover:text-red-700 p-1 border border-sadc-border hover:border-red-300 bg-white rounded-sm"
                title="Delete album"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
