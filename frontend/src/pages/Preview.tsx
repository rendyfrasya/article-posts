import React, { useState } from 'react';
import { usePreview, getPaginationOptions } from '../hooks/usePreview';

const Preview: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    data,
    totalItems,
    totalPages,
    isFetching,
    isError,
  } = usePreview();

  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const handleOpenModal = (article: any) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <main className="flex flex-col flex-1 bg-white rounded-3xl shadow-sm p-8 h-full overflow-hidden relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 shrink-0 gap-4">
        <div>
          <h1 className="font-bold text-3xl text-gray-900 tracking-tight">Public Blog Preview</h1>
          <p className="text-gray-500 text-sm mt-1">Klik pada artikel untuk membaca isi berita selengkapnya.</p>
        </div>

        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-3 pl-11 text-sm text-gray-900 border border-transparent rounded-full bg-gray-100 focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Cari artikel publik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto pb-4 pr-1">
        {isFetching ? (
          <div className="flex flex-col flex-1 items-center justify-center rounded-2xl min-h-[350px]">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm font-semibold text-gray-600 animate-pulse">Memuat artikel publik...</p>
          </div>
        ) : isError ? (
          <div className="flex w-full items-center justify-center p-10 text-center text-sm font-medium text-red-500 bg-red-50 rounded-2xl">
            Gagal mengambil data artikel dari server!
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: any) => (
              <div 
                key={item.id} 
                onClick={() => handleOpenModal(item)}
                // Card background diubah jadi bg-white dengan border tipis (lebih terang)
                className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group"
              >
                <div className="h-44 w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-gray-300 font-bold text-4xl group-hover:scale-110 transition-transform duration-300">
                    {item.title?.charAt(0) || 'B'}
                  </span>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h2 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                  <p className="text-xs font-semibold text-blue-600 mt-auto pt-2 flex items-center gap-1">
                    Baca selengkapnya &rarr;
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-dashed border-2 border-gray-200 py-16 gap-3 min-h-[350px] bg-white">
            <p className="font-medium text-sm text-gray-400">
              {searchQuery ? `Tidak ada artikel publik yang cocok dengan kata kunci "${searchQuery}".` : `Belum ada artikel yang dipublikasikan.`}
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION SECTION */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-2 shrink-0 bg-white">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{Math.min((page - 1) * limit + 1, totalItems)}</span> to <span className="font-semibold text-gray-900">{Math.min(page * limit, totalItems)}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> entries
          </p>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              &laquo; Prev
            </button>
            
            {getPaginationOptions(page, totalPages).map((p, index) => {
              if (p === '...') {
                return <span key={index} className="px-2 py-1.5 text-sm text-gray-400">...</span>;
              }
              
              return (
                <button
                  key={index}
                  onClick={() => setPage(p as number)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    page === p 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next &raquo;
            </button>
          </div>
        </div>
      )}

      {/* MODAL BACA ARTIKEL LENGKAP DENGAN GAMBAR */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={handleCloseModal}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
          ></div>

          <div className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <span className="bg-blue-50 text-blue-600 font-bold text-xs px-3 py-1 rounded-full">
                {selectedArticle.category}
              </span>
              <button 
                onClick={handleCloseModal}
                className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col p-6 overflow-y-auto gap-5">
              
              <div className="h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <span className="text-blue-500 font-bold text-6xl opacity-30">
                  {selectedArticle.title?.charAt(0) || 'B'}
                </span>
              </div>

              <h2 className="font-bold text-2xl text-gray-900 leading-snug">
                {selectedArticle.title}
              </h2>
              
              <hr className="border-gray-100" />
              
              <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                {selectedArticle.content}
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
              <button 
                onClick={handleCloseModal}
                className="px-5 py-2.5 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
};

export default Preview;