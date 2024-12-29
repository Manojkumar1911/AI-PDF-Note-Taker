import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Extract just the text content from each item
    const formattedTexts = args.splitText.map(text => {
      if (typeof text === 'object') {
        // If it's an object with metadata structure, extract just the text
        if (text.metadata?.text) {
          return text.metadata.text;
        }
        // If it's some other type of object with text content
        if (text.text || text.content) {
          return text.text || text.content;
        }
        // If we can't find text content, convert the whole object to string
        return JSON.stringify(text);
      }
      // If it's already a string, just return it
      return String(text);
    });

    await ConvexVectorStore.fromTexts(
      formattedTexts,  // Clean text array
      { fileId: args.fileId },  // Just keep the fileId in metadata
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBdS50oaOkhDbHtBs5GG-PLpZWMN3cwrHw",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBdS50oaOkhDbHtBs5GG-PLpZWMN3cwrHw",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    
    const resultOne = await (await vectorStore.similaritySearch(args.query, 1))
      .filter(q => q.metadata.fileId === args.fileId)
      .map(result => ({
        ...result,
        // Ensure the text is properly stringified if it's an object
        pageContent: typeof result.pageContent === 'object' 
          ? JSON.stringify(result.pageContent) 
          : result.pageContent
      }));

    console.log("Search results:", resultOne);
    return JSON.stringify(resultOne);
  },
});