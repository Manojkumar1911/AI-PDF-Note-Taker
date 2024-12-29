"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { addFileEntrytoDb } from '@/convex/fileStorage';
import axios from 'axios';


function UploadPdfDialog({children,isMaxFile}) {

  const generateUploadUrl =useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry =useMutation(api.fileStorage.addFileEntrytoDb);
  const getFileUrl =useMutation(api.fileStorage.getFileUrl);
  const embeddedDocument =useAction(api.myAction.ingest);
  const {user} =useUser();
  const [open,setOpen]= useState(false);
    const [file,setFile] =useState()
  const [loading,setLoading] =useState(false);
  const [fileName,setFileName]=useState();
  const onFileSelect =(event)=>{
    setFile(event.target.files[0]);
  }

  const onUpload =async()=>{
    setLoading(true);

     // Step 1: Get a short-lived upload URL
     const postUrl = await generateUploadUrl();
     // Step 2: POST the file to the URL
     const result = await fetch(postUrl, {
       method: "POST",
       headers: { "Content-Type": file?.type },
       body: file,
     });
     const { storageId } = await result.json();
     console.log('StorageId',storageId);

     const fileId =uuidv4();

     //step 3:  save the newly allocated storage id to the database
     const fileUrl =await getFileUrl({storageId:storageId});
     const resp =await addFileEntry({
      fileId:fileId,
      storageId:storageId,
      fileName:fileName??'Untitled file',
      fileUrl:fileUrl,
      createdBy:user?.primaryEmailAddress?.emailAddress,
     })

     console.log(resp);
      //Api call to fetch pdf process data
     const ApiResp =await axios.get('api/pdf-loader?pdfUrl='+fileUrl)
     console.log(ApiResp.data.result)

     await embeddedDocument({
      splitText:ApiResp.data.result,
      fileId:fileId
     });
    // console.log(embeddedResult); 
     setLoading(false);  //when file successfully upload the loading will be stopped
     setOpen(false);
  }
  return (
<Dialog open={open}>
  <DialogTrigger asChild>
    <Button onClick={()=>setOpen(true) } className="w-full" disabled={isMaxFile}> Upload PDf file </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload Pdf File</DialogTitle>
      <DialogDescription asChild>
        <div className=''>
            <h2 className='mt-5'>Select a file to upload</h2>
            <div className=' gap-2 p-3 rounded-md border'>
                <input type='file' accept='application/pdf'
                onChange={(event)=>onFileSelect(event)}/>
            </div>
            <div className='mt-5'>
                <label>FileName*</label>
                <Input placeholder='File Name'
                onChange={(event)=>setFileName(event.target.value)}/>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload} disabled={loading}>
            {loading?
              <Loader2Icon className='animate-spin'/>:'Upload'}
          </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadPdfDialog;