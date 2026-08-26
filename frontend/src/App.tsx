import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddNewArticle from './pages/AddNewArticle';
import EditArticle from './pages/EditArticle';
import { Toaster } from 'react-hot-toast'; // IMPORT Toaster DI SINI
import Preview from './pages/Preview';

const RootLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      
      <div className="flex flex-col flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />        
      </div>
    </div>
  );
};

// === INISIALISASI ROUTER & QUERY CLIENT ===
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/article',
        element: <Dashboard />,
      },
      {
        path: '/preview',
        element: <Preview/>,
      },
      {
        path: '/article/create',
        element: <AddNewArticle />, 
      },
      {
        path: '/article/:id',
        element: <EditArticle />, 
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;