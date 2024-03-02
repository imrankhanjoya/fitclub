// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pipeline } from '@xenova/transformers';
import { useState } from 'react';
import initpine from '../../../lib/ConnectPinecone';
import infoShema from "../../../lib/schema/infoSchema"
import { v4 as uuidv4 } from "uuid";
import { NextRequest,  NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth'
type Data = {
  data: string,
  message: string
}

export  async function POST(req:NextRequest,res:NextResponse<Data>) {

  const session = await getServerSession();
  console.log(session)
  const postvalue = await req.json()
 let validationRule =  await infoShema.safeParseAsync(postvalue)
  if(validationRule.success == false){
    return NextResponse.json({ data:validationRule.error.issues[0].message, message: "Error in post request" })
  }
  let urlValue: string =  validationRule.data.url!
  let image: string =  validationRule.data.image!

  //console.log(validationRule.data.description)
  const splitter = new RecursiveCharacterTextSplitter({chunkSize: 200,chunkOverlap:60,});
  const valsplit = await splitter.createDocuments([validationRule.data.description]);

  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  //start namespace for user
  const indexDoc = await initpine("barankhan")
  valsplit.map(async (item,index)=>{    
    const sentences = [item.pageContent];
    const output = await extractor(sentences, { pooling: 'mean', normalize: true });
    console.log(output.data)
    await indexDoc.deleteMany({
      content: { $eq: item.pageContent },
      user: { $eq:"barankhan" }
    });
    const val = await indexDoc.upsert([{id:uuidv4(),values: Array.from(output.data),
      metadata: {
        content:item.pageContent,
        url:urlValue, 
        image:image,
        user:"barankhan",
      }
    }]).then(()=>{
      console.log("Insert done")
    })
  })

  //for testing perpose
  return Response.json({ data:valsplit, message: "Error in post request" })
  
  
  

  return Response.json({ data:"This is great", message: "Error in post request" })
  
}

