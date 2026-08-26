import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboard, getPaginationOptions } from '../hooks/useDashboard';

const Dashboard: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,       
    setActiveTab,    
    page,
    setPage,
    limit,
    data,
    totalItems,
    totalPages,
    isFetching,
    isError,
    tabs,
    handleTrash,
    isTrashing
  } = useDashboard();

  return (
    <>
      {/* Container utama dikunci tingginya (h-full) dan overflow-hidden agar halaman tidak ikut scroll */}
      <main className="flex flex-col flex-1 bg-white rounded-3xl shadow-sm p-6 h-full overflow-hidden">
        
        {/* Header (Shrink-0 agar tidak ikut terpotong) */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <p className="flex items-center gap-2 mb-1">
              <span className="font-bold text-2xl text-gray-800">
                {totalItems} Total Posts
              </span>
            </p>
            <p className="text-gray-400 font-medium text-sm">View and update your article list here.</p>
          </div>
          <Link to="/article/create" className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-200 text-sm">
            Add New
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
        
        <hr className="border-gray-100 mb-6 shrink-0" />
        
        {/* Tabs & Search (Shrink-0 agar posisinya tetap stabil) */}
        <div className="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-200 w-full sm:w-auto overflow-x-auto">
            {tabs.map((tab) => {
              const getActiveColor = (tabName: string) => {
                switch (tabName) {
                  case 'Published': 
                    return 'bg-green-600 text-white shadow-sm';
                  case 'Drafts': 
                    return 'bg-amber-500 text-white shadow-sm';
                  case 'Trashed': 
                    return 'bg-red-600 text-white shadow-sm';
                  case 'All Posts':
                  default: 
                    return 'bg-blue-600 text-white shadow-sm';
                }
              };

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? getActiveColor(tab)
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2.5 pl-11 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* CONTAINER TABEL BISA DI-SCROLL (flex-1 overflow-y-auto) */}
        <div className="flex flex-col flex-1 overflow-y-auto pb-2 pr-1">
          {isFetching ? (
            <div className="flex flex-col flex-1 items-center justify-center rounded-2xl min-h-[300px]">
              <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-semibold text-gray-600 animate-pulse">Memuat data...</p>
            </div>
          ) : isError ? (
             <div className="flex w-full items-center justify-center p-10 text-center text-sm font-medium text-red-500 bg-red-50 rounded-2xl">
               Gagal mengambil data dari server!
             </div>
          ) : data && data.length > 0 ? (
            <div className="w-full border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="py-4 px-6 font-semibold w-[45%]">Title</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold text-center">Status</th>
                    <th className="py-4 px-6 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group bg-white">

                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-4">
                          <img 
                            src={`https://placehold.co/48x48/F3F4F6/9CA3AF?text=${item.title ? item.title.charAt(0) : 'A'}`} 
                            alt="thumb" 
                            className="size-10 rounded-lg object-cover shrink-0" 
                          />
                          <div className="flex flex-col overflow-hidden">
                            <p className="font-bold text-sm text-gray-800 truncate">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-6 align-middle">
                        <p className="font-semibold text-sm text-gray-700">{item.category}</p>
                      </td>
                      
                      <td className="py-4 px-6 align-middle text-center">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${
                          item.status === 'Publish' ? 'bg-green-50 text-green-600 border-green-200' :
                          item.status === 'Draft' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      
                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center justify-center gap-2.5">
                          <Link 
                            to={`/article/edit/${item.id}`} 
                            className="flex items-center justify-center size-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all" 
                            title="Edit Article"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Link>
                          
                          <button 
                            onClick={() => handleTrash(item.id)}
                            disabled={isTrashing || item.status === 'Thrash'}
                            className="flex items-center justify-center size-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed" 
                            title="Move to Trash"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-dashed border-2 border-gray-200 py-12 gap-3 min-h-[300px]">
              <p className="font-medium text-sm text-gray-400">
                {searchQuery ? `Tidak ada data yang cocok dengan pencarianmu.` : `Belum ada data di tab ${activeTab}.`}
              </p>
            </div>
          )}
        </div>

        {/* PAGINATION SECTION (Shrink-0 agar posisinya tetap terkunci di bawah) */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2 shrink-0">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">{Math.min((page - 1) * limit + 1, totalItems)}</span> to <span className="font-semibold text-gray-900">{Math.min(page * limit, totalItems)}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> entries
            </p>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
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
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next &raquo;
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;