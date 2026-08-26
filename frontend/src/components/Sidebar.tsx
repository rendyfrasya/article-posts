import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <aside className="relative flex h-screen w-[280px] shrink-0 bg-white border-r border-gray-100">
      <div className="flex flex-col w-[280px] h-full pt-[30px] px-4 gap-[30px]">
        <h3 className="font-bold px-2 text-gray-800">Content Management System</h3>
        
        <div className="flex flex-col gap-5 overflow-y-auto hide-scrollbar h-full pb-10">
          <nav className="flex flex-col gap-4">
            <p className="font-medium text-gray-400 text-sm px-2">Main Menu</p>
            <ul className="flex flex-col gap-2">
              
              {/* Menu Dashboard */}
              <li className={`group ${isActive('/')}`}>
                <Link to="/" className="flex items-center w-full min-h-14 gap-3 rounded-2xl py-[10px] pl-4 group-[&.active]:bg-blue-50 hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-400 group-[&.active]:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="font-medium text-gray-500 group-[&.active]:text-blue-600 transition-all w-full">Dashboard</p>
                  <div className="w-2 h-9 shrink-0 rounded-l-xl bg-blue-600 hidden group-[&.active]:flex"></div>
                </Link>
              </li>

              <li className={`group ${isActive('/preview')}`}>
                <Link to="/preview" className="flex items-center w-full min-h-14 gap-3 rounded-2xl py-[10px] pl-4 group-[&.active]:bg-blue-50 hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-400 group-[&.active]:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <p className="font-medium text-gray-500 group-[&.active]:text-blue-600 transition-all w-full">Preview Blog</p>
                  <div className="w-2 h-9 shrink-0 rounded-l-xl bg-blue-600 hidden group-[&.active]:flex"></div>
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;