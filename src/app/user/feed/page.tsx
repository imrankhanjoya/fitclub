"use client"
import { useState } from "react"
import axios from 'axios';

export default function Page(){
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
            {description}
            {image}
            {url}
<section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
      <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Desciption</label>
            <textarea onChange={(e)=>setDescription(e.target.value)}  id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Url</label>
            <input onChange={(e)=>setUrl(e.target.value)} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Image path</label>
            <input onChange={(e)=>setImage(e.target.value)} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        
        <div className="p-2 w-full">
          <button onClick={generate_embbed} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        </div>
        
      </div>
    </div>
  </div>
</section>

        </main>
    )
}