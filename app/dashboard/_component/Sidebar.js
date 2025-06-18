"use client"
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Layout, Shield, Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import UploadPdfDialog from './UploadPdfDialog';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const {user} = useUser();
  const path = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const fileList = useQuery(api.fileStorage.GetUserFiles,{
    userEmail: user?.primaryEmailAddress?.emailAddress
  });

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className='flex flex-col h-full justify-between px-4 pt-6 pb-4 sm:px-6 bg-gradient-to-b from-purple-50 via-blue-50 to-yellow-100'>
      {/* Logo always at the top, only on desktop */}
      <div className="hidden lg:flex items-center space-x-3 mb-10">
        <div className="relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-purple-700 font-bold text-lg sm:text-xl select-none">AI</span>
          </div>
        </div>
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap select-none">PDF Note Taker</span>
      </div>
      {/* Main nav and upload */}
      <div className='flex-1 flex flex-col gap-8'>
        <div>
          <UploadPdfDialog isMaxFile={fileList?.length>=5?true:false}>
            <Button className='w-full text-sm sm:text-base py-3 rounded-lg bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 hover:from-yellow-400 hover:to-purple-400 shadow-md hover:shadow-lg text-purple-900 font-bold transition-all duration-200 border-0'>+ Upload PDF file</Button>
          </UploadPdfDialog>
        </div>
        <nav className='flex flex-col gap-2'>
          <Link href={'/dashboard'} onClick={() => setIsMobileOpen(false)}>
            <div className={`flex gap-3 items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-100 hover:to-purple-100 hover:shadow-sm ${path=='/dashboard'?'bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-100 shadow-sm border border-yellow-300':''}`}>
              <Layout size={20} className={path=='/dashboard'?'text-yellow-600':'text-purple-700'} />
              <h2 className={`text-sm sm:text-base font-semibold ${path=='/dashboard'?'text-yellow-700':'text-purple-900'}`}>Workspace</h2>
            </div>
          </Link>
          <Link href={'/dashboard/upgrade'} onClick={() => setIsMobileOpen(false)}>
            <div className={`flex gap-3 items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-100 hover:to-purple-100 hover:shadow-sm ${path=='dashboard/upgrade'?'bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-100 shadow-sm border border-yellow-300':''}`}>
              <Shield size={20} className={path=='dashboard/upgrade'?'text-yellow-600':'text-purple-700'} />
              <h2 className={`text-sm sm:text-base font-semibold ${path=='dashboard/upgrade'?'text-yellow-700':'text-purple-900'}`}>Upgrade</h2>
            </div>
          </Link>
        </nav>
      </div>
      {/* Sticky upgrade/progress at the bottom */}
      <div className='pt-4'>
        <div className='bg-gradient-to-r from-purple-100 via-blue-100 to-yellow-50 rounded-lg p-3 flex flex-col items-center border border-purple-100 shadow-sm'>
          <Progress value={(fileList?.length/5)*100} className='mb-2 w-full' />
          <p className='text-xs sm:text-sm text-purple-700 w-full text-left font-medium'>{fileList?.length || 0} out of 5 PDFs uploaded</p>
          <p className='text-xs text-purple-400 w-full text-left'>Upgrade to upload more</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Fixed top bar for logo and hamburger on mobile */}
      <div className='lg:hidden fixed top-0 left-0 w-full z-50 flex items-center gap-2 bg-gradient-to-r from-purple-100 via-blue-100 to-yellow-50 shadow-lg border-b border-gray-200 px-4 py-3'>
        {/* No logo here, logo is in Header on mobile */}
        <div className='ml-auto'>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMobileSidebar}
            className="bg-white shadow-lg rounded-full p-2 border-gray-200 hover:bg-gray-50 hover:border-purple-300 transition-all duration-200"
          >
            {isMobileOpen ? <X size={24} className="text-purple-600" /> : <Menu size={24} className="text-purple-700" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay and Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-40 bg-black'
              onClick={toggleMobileSidebar}
            />
            {/* Drawer below the top bar */}
            <motion.div
              key="sidebar-drawer"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className='fixed top-14 left-0 bottom-0 w-64 bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 flex flex-col h-[calc(100vh-56px)] border-r border-gray-200'
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className='hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-gradient-to-b from-white to-gray-50 shadow-xl z-40 border-r border-gray-200'>
        {SidebarContent}
      </div>
    </>
  )
}

export default Sidebar;