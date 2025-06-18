import React from 'react'
import Sidebar from './_component/Sidebar';
import Header from './_component/Header';

function DashboardLayout({children}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile Sidebar - Fixed overlay */}
      <div className='lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 hidden' id="mobile-sidebar-overlay">
        <div className='fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out' id="mobile-sidebar">
          <Sidebar />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className='hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='lg:pl-64 min-h-screen'>
        <Header />
        <main className='p-4 sm:p-6 lg:p-8 pt-16 lg:pt-0'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;