import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddNotes =mutation({
    args:{
        fileId:v.string(),
        notes:v.any(),
        createdBy:v.string()
    },
    handler:async(ctx,args)=>{
        const recordId =await ctx.db.query('notes')
        .filter((q)=>q.eq(q.field('fileId'),args.fileId))  //check if the record already exists
        .collect()          // to collect the array of records
        if(recordId?.length==0){
            await ctx.db.insert('notes',{    //if there is no record insert the record
                fileId:args.fileId,
                notes:args.notes,
                createdBy:args.createdBy
            })
        }
        else{
            await ctx.db.patch(recordId[0]._id,
                {notes:args.notes})
        }
    }
})

export const GetNotes=query({
    args:{
        fileId:v.string()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query('notes')
        .filter((q)=>q.eq(q.field('fileId'),args.fileId)) //filter the record based on fileId
        .collect()

        return result[0]?.notes;
    }
})