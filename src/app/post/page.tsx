"use client"
import { useEffect, useState } from "react"

import axios from 'axios';
import {categorylist,modelist} from "@/app/lib/fields"

export default function Page(){
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [url,setUrl] = useState('')
    const [image,setImage] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
  
    
    const generate_embbed = async()=>{
        // const { pipeline } = await import("@xenova/transformers");
        const res = await axios.post('/api/pinecone/upsert',{description,url,image});
        setDescription('')
        setUrl('')
        setImage('')
    }

  function getIPFromAmazon() {
    const response = axios.get('https://ipapi.co/json/').then((res)=>{
      console.log(res.data)
      setCountry(res.data.country_name)
      setRegion(res.data.region)
      setCity(res.data.city)
    });
    
  }
    useEffect(()=>{
      getIPFromAmazon()
  
    })
    const inputClass = "block w-full  m-1 p-2 text-gray-900 border-b border-gray-300   text-base focus:ring-blue-500 focus:border-gray-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const buttonClass = "text-white m-auto w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  

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
              <button onClick={()=>{setCategory(item)}} className=" w-full mx-auto  text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded capitalize">{item}</button>
            </div>
          )
        }) }
        </div>
         </>
         
         }
  {category!="" &&
        <>
        <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Fill in location</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto flex felx-row">
         <span className="btnflex mx-auto  text-gray-700 capitalize ">{category}</span>
         <button onClick={()=>{setCategory("")}} className="btnflex mx-auto text-sm  text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded">{"Change Category"}</button>
        </div>
         
        <div className="flex flex-row text-center w-full mb-1 ">
            <div className="flex lg:flex-row flex-col w-full">
            <input placeholder="Address line" className={inputClass} onChange={(e)=>{setAddress(e.target.value)}} value={address} />
            <input placeholder="Region" className={inputClass} onChange={(e)=>{setRegion(e.target.value)}} value={region} />
            </div>
            <div className="flex lg:flex-row flex-col w-full">
            <input placeholder="City" className={inputClass} onChange={(e)=>{setCity(e.target.value)}} value={city} />
            <input placeholder="Country" className={inputClass} onChange={(e)=>{setCountry(e.target.value)}} value={country} />
            </div>
          </div>
      
        </>
    }
 </div>
</section>

        </main>
    )
}