"use client"
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Layout, Shield } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import UploadPdfDialog from './UploadPdfDialog';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const {user} = useUser();
  const path =usePathname();
  const fileList = useQuery(api.fileStorage.GetUserFiles,{
    userEmail: user?.primaryEmailAddress?.emailAddress
  });
  return (
  <div>

    <div className='shadow-md p-7 h-screen'>
      <Image src={'/logo.svg'} alt="logo" width={170} height={170}/>

      <div className='mt-10'>
        <UploadPdfDialog isMaxFile={fileList?.length>=5?true:false}>

        <Button className='width-full' >+ Upload PDF</Button>
        </UploadPdfDialog>
      </div>
      <Link href={'/dashboard'}>
      <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 cursor-pointer rounded-lg' ${path=='/dashboard'&&'bg-slate-200 rounded-lg'}`}>
        <Layout/>
        
        <h2>Workspace</h2>
      </div>
      </Link>
      <Link href={'/dashboard/upgrade'}>
      <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 cursor-pointer rounded-lg' ${path=='dashboard/upgrade'&&'bg-slate-200 rounded-lg'}`}>
        <Shield/>
        <h2>Upgrade</h2>
      </div>
      </Link>
    </div>
      <div className=' m-2 absolute bottom-24 w-[80%]'>
      <Progress value={(fileList?.length/5)*100} />
      <p className='text-sm mt-1'>{fileList?.length} out of 5 pdf uploaded</p>

      <p className='text-sm text-gray-400 mt-1'>Upgrade to upload more</p>


      </div>
    
  </div>
  )
}

export default Sidebar;