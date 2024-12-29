import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


/* const pdfUrl ="https://fleet-roadrunner-87.convex.cloud/api/storage/ea766b53-d1f4-45b0-a807-c6b2a10061db"
 */
export async function GET(req) {


    const reqUrl =req.url;
    const {searchParams} =new URL(reqUrl);
    const pdfUrl =searchParams.get('pdfUrl');
    console.log(pdfUrl);

    // 1.load the pdf file
    const response =await fetch(pdfUrl);
    const data =await response.blob();
    const loader =new WebPDFLoader(data);
    const docs =await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent+" ";
    })

    //2. split the text into small chunks
    const splitter =new RecursiveCharacterTextSplitter({
        chunksize:100,
        chunkOverlap:20
    })

    const output =await splitter.createDocuments([pdfTextContent]);


    return NextResponse.json({result:output})





}