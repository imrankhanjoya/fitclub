// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initpine from '../../../lib/ConnectPinecone';
import { NextRequest,  NextResponse } from 'next/server';
// import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth'
import axios from 'axios'
import {ChatOpenAI} from "@langchain/openai"
import {StringOutputParser} from "@langchain/core/output_parsers"
//Enable this for vector store
//import retriever from "../oai/retriever"
import {
  PromptTemplate,
  PipelinePromptTemplate,
} from "@langchain/core/prompts";
type Data = {
  data:{ID:string,value:string},
  message: string
}

export  async function POST(req:NextRequest,res:NextResponse<Data>) {

  const session = await getServerSession();
  console.log(session)
  const postvalue = await req.json()
  const index = await initpine("barankhan")
  const vq = [0.74,1,0.16,0.68,0.59,0.4,0.79,0.61,0.3,0.49,0.97,0.73,0.76,0.29,0.57,0.67,0.1,0.16,0.65,0.97,0.11,0.73,0.84,0.63,0.34,0.14,0.98,0.23,0.3,0.68,0.65,0.24,0.76,0.34,0.96,0.47,0.86,0.12,0.56,0.78,0.14,0.67,0.7,0.26,0.62,0.15,0.64,0.93,0.11,0.65,0.05,0.47,0.45,0.11,0.86,0.07,1,0.1,0.76,0.31,0.98,0.24,0.57,0.79,0.77,0.82,0.35,0.77,0.21,0.37,0.14,0.04,0.03,0.81,0.42,0.5,0.66,0.51,0.4,0.85,0.82,0.53,0.7,0.99,0.45,0.4,0.05,0.48,0.22,0.03,0.24,0.94,0.49,0.83,0.66,0.93,0.62,0.34,0.51,0.53,0.79,0.56,0.66,0.13,0.7,0.7,0.09,0.13,0.09,0.8,0.59,0.64,0.73,0.67,0.46,0.55,0.1,0.02,0.14,0.44,0.92,0.12,0.66,0.66,0.72,0.73,0.83,0.59,0.18,0.86,0.46,0.8,0.54,0.52,0.42,0.15,0.19,0.52,0.71,0.4,0.75,0.38,0.61,0.1,0.97,0.98,0.54,0.43,0.52,0.23,0.36,0.34,0.41,0.65,0.82,0.63,0.08,0.63,0.16,0.15,0.49,0.39,0.81,0.72,0.72,0.58,0.31,0.53,0.75,0.31,0.37,0.92,0.45,0.1,0.99,0.55,0.63,0.63,0.92,0.73,0.96,0.49,0.1,0.2,0.8,0.43,0.69,0.82,0.71,0.09,0.71,0.39,0.48,0.67,0.22,0.55,0.58,0.2,0.87,0.43,0.08,0.54,0.87,0.51,0.06,0.27,0.43,0.59,0.57,0.93,0.39,0.52,0.23,0.46,0.84,0.34,0.98,0.54,0.79,0.45,0.88,0.92,0.16,0.69,0.82,0.28,0.47,0.35,0.42,0.38,0.58,0.92,0.28,0.29,0.85,0.91,0.16,0.52,0.58,0.3,0.39,0.32,0.36,0.36,0.02,0.82,0.93,0.16,0.78,0.21,0.41,0.93,0.79,0.27,0.5,0.33,0.24,0.51,0.97,0.49,0.91,0.61,0.54,0.7,0.08,0.51,0.63,0.66,0.9,0.25,0.98,0.05,0.21,0.55,0.05,0.98,0.86,0.76,0.35,0,0.59,0.75,0.13,0.54,0.41,0.29,0.68,0.3,0.88,0.27,0.09,0.48,0.66,0.13,0.16,0.11,0.54,0.74,0.5,0.11,0.5,0.47,0.45,0.08,0.3,0.38,0.29,0.16,0.62,0.91,0.48,0.07,0.46,0.79,0.66,0.34,0.02,0.62,0.88,0.15,0.61,0.77,0.58,0.3,0.17,0.57,0.65,0.99,0.37,0.85,0.08,0.81,0.34,0.06,0.93,0.9,0.76,0.07,0.81,0.58,0.22,0.6,0.01,0.35,0.55,0.13,0.64,0.8,0.84,0.1,0.36,0.53,0.3,0.94,0.15,0.73,0.65,0.7,0.42,0.22,0.44,0.52,0.93,0.01,0.87,0.5,0.18,0.03,0.84,0.24,0.73,0.84,0.26,0.29,0.85,0.89,0.64,0.29,0.87,0,0.99,0.48,0.59,0.2]
  const val = await index.query({ topK: 100, vector: vq,includeValues:false,includeMetadata:true});
  let chatHistoryDoc = ''
  console.log(val.matches)
  val.matches.map((item,index)=>{
    chatHistoryDoc = chatHistoryDoc + item.metadata?.content
  })

  //return Response.json({ data:chatHistoryDoc, message: "" })
//"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"
console.log(process.env.OPEN_AI)
  const llm = new ChatOpenAI({ openAIApiKey:process.env.OPEN_AI ,modelName:'gpt-4'})
  const questionuser = postvalue.question

  const standaloneTemplate = "Generate a standalone question which is based on the new question. Just create the standalone: {question} without commentary. question:"
  const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate)
  const standaloneChain = standalonePrompt.pipe(llm).pipe(new StringOutputParser())
  const clenQuestion = await standaloneChain.invoke({question:questionuser})
  
  const queryGptTemplate = "Act as human and your name is baran who can answer a given question based on the context and linkedin profile of barankhan. If you really don't know the answer say sorry don't have any idea and don't say that your AI. Always speak as if you were chatting to a friend. CHAT HISTORY: {chatHistory}  question:{question} context:{context} answer: " 
  const queryPrompt = PromptTemplate.fromTemplate(queryGptTemplate)
  const queryChain = queryPrompt.pipe(llm).pipe(new StringOutputParser())
  const ans = await queryChain.invoke({question:questionuser,chatHistory:chatHistoryDoc,context:''})
  
  return Response.json({ data:ans, message: "" })
  
}

