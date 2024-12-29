"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Dashboard = () => {
  const {user} = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles,{
    userEmail: user?.primaryEmailAddress?.emailAddress
  });

  const isLoading = fileList === undefined;

  return (
    <div>
      <h2 className='font-bold text-3xl'>Workspace</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {isLoading ? (
          // Show skeleton loader while loading
          Array.from({length:10}).map((_, index) => (   
            <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse' />
          ))
        ) : (
          // Show actual files once loaded
          fileList?.map((file, index) => (
              <Link href={'/workspace/'+file?.fileId}>
            <div key={index} className='flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all'>
              <Image 
                src='/pdf.png' 
                alt='file' 
                width={50} 
                height={50}
                style={{ width: '50px', height: 'auto' }} 
              />
              <h2 className='mt-3 font-medium text-xl'>{file?.fileName}</h2>
            </div>
            </Link>
          ))
        )}
      </div>
      
      {!isLoading && fileList?.length === 0 && (
        <div className='text-center text-gray-500'>
          No files found in your workspace
        </div>
      )}
    </div>
  )
}

export default Dashboard;