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
    
  </div>
</section>

        </main>
    )
}