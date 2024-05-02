"use client"
import { useEffect, useState } from "react"
import axios from 'axios';
import { ChatConversationalAgentOutputParser } from "langchain/agents";
import ipLocation from "iplocation"
import postSchema from "@/app/lib/schema/postSchema";
import {categorylist,modelist} from "@/app/lib/fields"





export default function Page() {

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState('')
  const [modevalue, setModevalue] = useState('')
  const [pricetypelist, setPricetypelist] = useState(['price','fixed','monthly','yearly','daily'])
  const [pricetype, setPricetype] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  function getIPFromAmazon() {
    const response = axios.get('https://ipapi.co/json/').then((res)=>{
      console.log(res.data)
      setCountry(res.data.country_name)
      setRegion(res.data.region)
      setCity(res.data.city)
    });
    
  }

  async function autoCorrect(data: any) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Bhuvana/t5-base-spellchecker",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  async function query(data: any) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  const getCorrect = async () => {
    await autoCorrect({ inputs: description }).then((response) => {
      setDescription(JSON.stringify(response));
      getCategory()
    });
  }
  const getCategory = async () => {
    setError("")
    const validationRule =  await postSchema.safeParseAsync({description,country,city,region,address,mode})
    if(validationRule.success == false){
      setError(validationRule.error.issues[0].message)
      return
    }

    await query({ inputs: description, parameters: { candidate_labels: categorylist } }).then((response) => {
      const res = response;
      setCategory(res.labels[0])
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
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create Post</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Tell us how we can help you.</p>
          </div>
          <div className="flex flex-col item-center w-full">
            <span className="m-auto text-red-400 ">{error}</span>
            <span className="m-auto text-green-400">{msg}</span>
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
          <div className="flex flex-col text-center w-full mb-1">
            <textarea placeholder="Post your requirment" className={inputClass} rows={5} spellCheck="true" lang="en" onChange={(e) => { setDescription(e.target.value) }}></textarea>
          </div>
          <div className="flex flex-row text-center w-full mb-1">
            <select className={inputClass} onChange={(e)=>setMode(e.target.value)}>
              <option>Select where to reach you</option>
            {
              modelist.map((item,index)=>{
                return (<option value={item} key={index}>
                  {item}
                </option>)
              })
            }
            </select>
            <input placeholder="Required value" className={inputClass} onChange={(e)=>{setModevalue(e.target.value)}} value={modevalue} />
          </div>
          <div className="flex flex-row text-center w-full mb-1">
            <select className={inputClass} onChange={(e)=>setPricetype(e.target.value)}>
              <option>Select price type</option>
            {
              pricetypelist.map((item,index)=>{
                return (<option value={item} key={index}>
                  {item}
                </option>)
              })
            }
            </select>
            {"SAR"}
            <input placeholder="Required value" className={inputClass} onChange={(e)=>{setPrice(e.target.value)}} value={price} />
          </div>
            <button className={buttonClass} onClick={getCategory}>Submit</button>
        </div>
      </section>
    </main>
  )
}