"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Trash2 } from 'lucide-react';

const Dashboard = () => {
  const {user} = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles,{
    userEmail: user?.primaryEmailAddress?.emailAddress
  });
  const deleteFile = useMutation(api.fileStorage.deleteFile);

  const isLoading = fileList === undefined;

  const handleDelete = async (e, file) => {
    e.preventDefault();
    if (window.confirm(`Delete "${file.fileName}"? This cannot be undone.`)) {
      await deleteFile({ fileId: file.fileId, storageId: file.storageId });
    }
  };

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 rounded-2xl shadow-lg p-4 sm:p-8 mt-2 border border-blue-50">
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-1 drop-shadow-lg">Workspace</h1>
      <div className="h-1 w-20 bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 rounded-full mb-6"></div>
      <p className="text-lg text-gray-700 mb-8">Manage and organize your PDF documents</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Show skeleton loader while loading
          Array.from({length: 10}).map((_, index) => (   
            <div key={index} className='bg-gray-200 rounded-lg h-32 sm:h-36 lg:h-40 animate-pulse' />
          ))
        ) : (
          // Show actual files once loaded
          fileList?.map((file, index) => (
            <Link key={file?.fileId || index} href={'/workspace/'+file?.fileId} className="relative group">
              <div className='flex p-4 sm:p-5 shadow-sm hover:shadow-md rounded-lg flex-col items-center justify-center border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200 bg-white'>
                {/* Delete icon */}
                <button
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white hover:bg-red-100 text-gray-400 hover:text-red-600 opacity-80 group-hover:opacity-100 transition"
                  title="Delete file"
                  onClick={e => handleDelete(e, file)}
                >
                  <Trash2 size={18} />
                </button>
                <Image 
                  src='/pdf-icon-2.png' 
                  alt='file' 
                  width={40} 
                  height={40}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                />
                <h2 className='mt-3 font-medium text-sm sm:text-base lg:text-lg text-center text-gray-800 line-clamp-2'>{file?.fileName}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
      
      {!isLoading && fileList?.length === 0 && (
        <div className='text-center py-12'>
          <div className='max-w-md mx-auto'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No files found</h3>
            <p className='text-gray-500 text-sm sm:text-base'>Upload your first PDF to get started with AI-powered note taking</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard;