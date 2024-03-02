"use client"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Page(){
    const [myfeeds,setMyfeeds] = useState([])
    const generate_embbed = async()=>{
        // const { pipeline } = await import("@xenova/transformers");
        const res = await axios.post('/api/pinecone/read');
        console.log(res.data.data.matches)
        setMyfeeds(res.data.data.matches)
    }

    useEffect(()=>{
      if(myfeeds.length == 0){
        generate_embbed()
      }
    },[myfeeds])


    return (
        <main>
<section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">My Feeds</h1>
    </div>
      {
        myfeeds.length > 0  && myfeeds.map((item:any,_index)=>{
          return <>
          <div className="w-full">
          <div>
          {item.id}
          </div>
          <div>
          {item.metadata.content}
          </div>
          </div>
          </>
        })
      }
  </div>
</section>

        </main>
    )
}