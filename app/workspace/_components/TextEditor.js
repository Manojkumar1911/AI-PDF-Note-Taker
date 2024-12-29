import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import EditorExtentions from './EditorExtentions'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

function TextEditor({fileId}) {
    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
            placeholder:"Start taking your notes here.. ",

            })
            
        ],
        editorProps:{
            content:"",
            attributes:{
                class:"focus:outline-none h-screen p-5"
            }
        }
      })
      /* Used to get the notes stored in DB */
     const notes=useQuery(api.notes.GetNotes,{
        fileId:fileId
     })
    // console.log(notes);
    useEffect(()=>{
        editor&&editor.commands.setContent(notes) //set the notes to the editor //notes is the response from the query
    },[notes&&editor]) //when the notes and editor is available set the notes to the editor
  return (
    <div>
        <EditorExtentions editor={editor}/>
        <div className='overflow-scroll h-[88vh]'>

         <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditor