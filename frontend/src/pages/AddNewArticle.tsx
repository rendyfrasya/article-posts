import React from 'react';
import { Link } from 'react-router-dom';
import { useAddArticle } from '../hooks/useAddArticle';

const AddNewArticle: React.FC = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    isPending,
    handleSubmit,
  } = useAddArticle();

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 pt-0">
        <main className="flex flex-col gap-6 flex-1">
          <div className="flex gap-6">
            
            {/* Form Utama */}
            <div className="flex flex-col w-full rounded-3xl p-6 gap-5 bg-white shadow-sm border border-gray-50">
              <h2 className="font-bold text-2xl mb-2 text-gray-800">Add New Article</h2>

              {/* 1. Title Field */}
              <label className="group relative">
                <p className="placeholder font-medium text-gray-400 text-sm absolute -translate-y-1/2 left-6 top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-all duration-300 pointer-events-none">
                  Article Title <span className="text-red-500">*</span> (Min. 20 chars)
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full h-[72px] font-semibold text-lg text-gray-800 rounded-2xl border-[1.5px] border-gray-200 bg-gray-50/50 pl-6 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:bg-white focus:border-blue-500 transition-all duration-300 outline-none"
                  placeholder=" "
                />
              </label>

              {/* 2. Category Field */}
              <label className="group relative">
                <p className="placeholder font-medium text-gray-400 text-sm absolute -translate-y-1/2 left-6 top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-all duration-300 pointer-events-none">
                  Category <span className="text-red-500">*</span> (Min. 3 chars)
                </p>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full h-[72px] font-semibold text-lg text-gray-800 rounded-2xl border-[1.5px] border-gray-200 bg-gray-50/50 pl-6 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:bg-white focus:border-blue-500 transition-all duration-300 outline-none"
                  placeholder=" "
                />
              </label>

              {/* 3. Content Field (Textarea) */}
              <label className="group relative flex flex-col">
                <span className="font-medium text-gray-700 text-sm mb-2">
                  Content <span className="text-red-500">*</span> (Min. 200 chars)
                </span>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={8}
                  disabled={isPending}
                  className="w-full font-semibold text-base text-gray-800 rounded-2xl border-[1.5px] border-gray-200 bg-gray-50/50 p-6 focus:bg-white focus:border-blue-500 transition-all duration-300 outline-none resize-y"
                  placeholder="Tulis isi artikel di sini..."
                />
              </label>

              <div className="flex items-center justify-end gap-3 mt-4">
                <Link 
                  to="/" 
                  className={`px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition ${isPending ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Cancel
                </Link>

                <button 
                  type="button"
                  onClick={(e) => handleSubmit(e, 'Draft')}
                  disabled={isPending} 
                  className="px-6 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
                >
                  {isPending ? 'Processing...' : 'Save as Draft'}
                </button>

                <button 
                  type="button" 
                  onClick={(e) => handleSubmit(e, 'Publish')}
                  disabled={isPending} 
                  className="flex items-center justify-center min-w-[140px] px-6 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-200"
                >
                  {isPending ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Publish'
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar Guide */}
            <div className="flex flex-col w-[350px] shrink-0 h-fit rounded-3xl p-6 gap-4 bg-blue-50 border border-blue-100">
              <p className="font-bold text-lg text-blue-900">Publishing Guide</p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 bg-blue-600 rounded-full items-center justify-center mt-0.5">
                     <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="font-medium text-sm text-blue-800 leading-relaxed">Judul artikel minimal harus memiliki 20 karakter.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 bg-blue-600 rounded-full items-center justify-center mt-0.5">
                     <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="font-medium text-sm text-blue-800 leading-relaxed">Isi konten wajib panjang minimal 200 karakter agar lolos validasi backend.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex size-6 shrink-0 bg-blue-600 rounded-full items-center justify-center mt-0.5">
                     <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="font-medium text-sm text-blue-800 leading-relaxed">Gunakan tombol <b>Publish</b> untuk langsung menayangkan artikel atau <b>Save as Draft</b> untuk menyimpan sebagai draf.</p>
                </li>
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AddNewArticle;