import { chatSession } from '@/configs/AIModel';
import { api } from '@/convex/_generated/api';
import { query } from '@/convex/_generated/server';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, CodeIcon, Heading1, Heading2, Heading3, Highlighter, Italic, List, Sparkle, SparklesIcon, Subscript, Superscript, Underline } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function EditorExtentions({editor}) {
    const {fileId} =useParams();
    const SearchAI =useAction(api.myAction.search)
    const saveNotes =useMutation(api.notes.AddNotes)
    const {user} =useUser();  //clerk hook to get the user
    const OnAiClick = async () => {

      //Toater component
      toast("Ai is working on your request")
        // Extract selected text or fallback to entire editor content as plain text
        let selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
    
        if (!selectedText.trim()) {
            console.warn("No text selected. Using entire editor content.");
            selectedText = editor.state.doc.textBetween(0, editor.state.doc.content.size, ' ');
        }
    
        if (!selectedText.trim()) {
            console.warn("Editor content is empty. Cannot proceed with AI search.");
            editor.chain().focus().insertContent("Please provide input in the editor.");
            return;
        }
    
        console.log("Selected or Fallback Text:", selectedText);
    
        // Fetch search results
        const result = await SearchAI({
            query: selectedText,
            fileId: fileId,
        });
    
        console.log("Search Results:", result);
    
        if (!result || result.length === 0) {
            console.warn("No relevant content found in search.");
            editor.chain().focus().insertContent("No relevant content found for the input provided.");
            return;
        }
    
        // Parse and format results
        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAnswer = "";
        UnformattedAns.forEach(item => {
            AllUnformattedAnswer += item.pageContent;
        });
    
        if (!AllUnformattedAnswer.trim()) {
            console.warn("No content available in search results.");
            editor.chain().focus().insertContent("The search did not return any usable content.");
            return;
        }
    
        // Generate AI prompt
        const PROMPT = `For the provided input: "${selectedText}" and the retrieved content: "${AllUnformattedAnswer}", generate an appropriate HTML-formatted answer.`;
    
        const AiModelResult = await chatSession.sendMessage(PROMPT);
        const aiResponseText = await AiModelResult.response.text();
    
        console.log("AI Response:", aiResponseText);
    
        // Insert AI-generated response into the editor
        editor.chain().focus().insertContent(aiResponseText);
        const FinalAns =AiModelResult.response.text().replace('``','').replace('html',' ').replace('``','');
        const AllText=editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong> Answer"</strong>'+FinalAns+'</p>')


        saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
    };
    
    
  return editor&&(
    
   <div className='p-5 '>
        <div className="control-group">
        <div className="button-group flex gap-3">
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <Heading1/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <Heading2/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            <Heading3/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <Underline/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'text-blue-500' : ''}
          >
            <CodeIcon/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
          >
            <List/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'text-blue-500' : ''}
          >
            <Highlighter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}
          >
           <AlignLeft/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}
          >
            <AlignRight/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'itext-blue-500' : ''}
          >
            <AlignJustify/>
          </button>
          <button
            onClick={()=>OnAiClick()}
            className="hover:text-blue-500"
          >
            <SparklesIcon/>
          </button>
        </div>
        </div>
  </div>
    )
}

export default EditorExtentions;