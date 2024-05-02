"use client"
import { useState } from "react"
import axios from 'axios';
import {categorylist,modelist} from "@/app/lib/fields"

export default function Page(){
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [url,setUrl] = useState('')
    const [image,setImage] = useState('')
    
    const generate_embbed = async()=>{
        // const { pipeline } = await import("@xenova/transformers");
        const res = await axios.post('/api/pinecone/upsert',{description,url,image});
        setDescription('')
        setUrl('')
        setImage('')
    }


    return (
        <main>
            
<section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
  {category=="" && 
         <>
         <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Select Category</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Select category to crate post.</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto flex flex-wrap space-x-12 ">
        {categorylist.map((item,index)=>{
          return (
            <div className="p-2" key={index}>
              <button onClick={()=>{setCategory(item)}} className="btnflex mx-auto  text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded capitalize">{item}</button>
            </div>
          )
        }) }
        </div>
         </>
         
         }
  {category!="" &&
        <>
        <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto flex felx-row">
         <span className="btnflex mx-auto  text-gray-700 capitalize ">{category}</span>
         <button onClick={()=>{setCategory("")}} className="btnflex mx-auto text-sm  text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded">{"Change Category"}</button>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto flex felx-row">
         <span className="btnflex mx-auto  text-gray-700 capitalize ">{category}</span>
         <button onClick={()=>{setCategory("")}} className="btnflex mx-auto text-sm  text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded">{"Change Category"}</button>
        </div>
        </>
    }
 </div>
</section>

        </main>
    )
}