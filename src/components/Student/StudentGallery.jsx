import React, { useState } from 'react';
import { Image, Calendar, Tag, Eye, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

export default function StudentGallery({ galleryAlbums = [] }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Album photos for lightbox simulation
  const albumPhotos = [
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', caption: 'Keynote Address at Student Activity Pavilion' },
    { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80', caption: 'Audience and Student Delegation Assembly' },
    { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', caption: 'Trophy and Certificate Awarding Ceremony' },
    { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', caption: 'Track & Field Event Championship Final' }
  ];

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
    setActivePhotoIdx(0);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-sadc-border p-5 rounded-sm shadow-token flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-sadc-navy">
            SADC Event Photo Gallery & Archives
          </h2>
          <p className="text-xs text-sadc-muted mt-0.5">
            Official photographic records of institutional events, fests, and student activities.
          </p>
        </div>

        <div className="text-xs font-mono text-sadc-navy bg-sadc-bg px-3 py-1.5 border border-sadc-border rounded-sm">
          <span>TOTAL ARCHIVED ALBUMS: </span>
          <strong className="font-bold">{galleryAlbums.length}</strong>
        </div>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryAlbums.length === 0 ? (
          <div className="col-span-4 bg-white border border-sadc-border p-8 text-center text-xs font-mono text-sadc-muted rounded-sm">
            No gallery albums currently uploaded. SADC Media Cell will publish event photos here.
          </div>
        ) : (
          galleryAlbums.map((album) => (
          <div
            key={album.id}
            onClick={() => handleOpenAlbum(album)}
            className="bg-white border border-sadc-border rounded-sm overflow-hidden shadow-token hover:border-sadc-navy transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-sadc-navy text-white text-[10px] font-mono font-bold px-2 py-1 rounded-sm border border-sadc-navy shadow-token flex items-center gap-1">
                  <Image className="w-3 h-3 text-sadc-gold" />
                  <span>{album.photoCount} PHOTOS</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-sadc-muted">
                  <Calendar className="w-3 h-3 text-sadc-gold" />
                  <span>{album.date}</span>
                  <span>•</span>
                  <span className="uppercase text-sadc-navy font-bold">{album.category}</span>
                </div>

                <h3 className="font-serif text-sm font-semibold text-sadc-navy group-hover:text-sadc-gold transition-colors line-clamp-2">
                  {album.title}
                </h3>

                <p className="text-xs text-sadc-muted line-clamp-2 leading-relaxed">
                  {album.description}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-2.5 bg-sadc-bg border-t border-sadc-border text-[11px] font-mono text-sadc-muted flex items-center justify-between">
              <span>By: {album.uploadedBy}</span>
              <span className="text-sadc-navy font-semibold group-hover:underline flex items-center gap-1">
                View <Eye className="w-3 h-3 text-sadc-gold" />
              </span>
            </div>

          </div>
        )))}
      </div>

      {/* Lightbox Album Viewer Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-sadc-border rounded-sm shadow-elevated w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Top Bar */}
            <div className="bg-sadc-navy text-white px-6 py-4 flex items-center justify-between border-b border-sadc-navy/30">
              <div>
                <span className="text-[10px] font-mono text-sadc-gold uppercase">
                  SADC ARCHIVE · {selectedAlbum.category}
                </span>
                <h3 className="font-serif text-base font-semibold text-white">
                  {selectedAlbum.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                className="text-stone-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Viewer Frame */}
            <div className="bg-stone-900 flex-1 relative flex items-center justify-center min-h-[360px] p-4">
              <img
                src={albumPhotos[activePhotoIdx].url}
                alt="Album Photo"
                className="max-h-[60vh] max-w-full object-contain rounded-sm border border-stone-800"
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + albumPhotos.length) % albumPhotos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-black/60 text-white hover:bg-black text-xs"
              >
                <ChevronLeft className="w-6 h-6 text-sadc-gold" />
              </button>
              <button
                type="button"
                onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % albumPhotos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-black/60 text-white hover:bg-black text-xs"
              >
                <ChevronRight className="w-6 h-6 text-sadc-gold" />
              </button>
            </div>

            {/* Photo Caption & Thumbnail Strip */}
            <div className="bg-white p-4 border-t border-sadc-border flex items-center justify-between">
              <div className="text-xs">
                <p className="font-semibold text-sadc-navy">
                  Photo {activePhotoIdx + 1} of {albumPhotos.length}
                </p>
                <p className="text-sadc-muted">
                  {albumPhotos[activePhotoIdx].caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {albumPhotos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`w-3 h-3 rounded-full border transition-all ${
                      activePhotoIdx === i ? 'bg-sadc-gold border-sadc-navy scale-110' : 'bg-stone-300 border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
