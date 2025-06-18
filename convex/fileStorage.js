import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const addFileEntrytoDb =mutation({
    args:{
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        createdBy:v.string()
    },
    handler:async(ctx,args)=>{
        const result =await ctx.db.insert('pdfFiles',{
            fileId:args.fileId,
            storageId:args.storageId,
            fileName:args.fileName,
            fileUrl:args.fileUrl,
            createdBy:args.createdBy
        })
        return 'file inserted'
    }
})

export const getFileUrl =mutation({
    args:{
        storageId:v.string()
    },
    handler:async(ctx,args)=>{
        const url = await ctx.storage.getUrl(args.storageId);
        return url;
    }
})


export const GetFileRecord =query({
    args:{
        fileId:v.string()
    },
    handler :async(ctx,args)=>{
        const result =await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('fileId'),args.fileId))
        .collect();
        console.log(result);
        return result[0];
    }
})

export const GetUserFiles =query({
    args:{
        userEmail:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        if(!args.userEmail==null){
            return [];
        }
        const result= await ctx.db.query('pdfFiles')
        .filter((q)=>q.eq(q.field('createdBy'),args.userEmail)) //filter the record based on fileId
        .collect(); //collect the result 

        return result;
    }
})

export const deleteFile = mutation({
  args: { fileId: v.string(), storageId: v.string() },
  handler: async (ctx, args) => {
    // Delete from storage
    await ctx.storage.delete(args.storageId);
    // Delete from database
    const files = await ctx.db
      .query('pdfFiles')
      .filter((q) => q.eq(q.field('fileId'), args.fileId))
      .collect();
    if (files.length > 0) {
      await ctx.db.delete(files[0]._id);
      return { success: true };
    }
    return { success: false, error: 'File not found' };
  },
});