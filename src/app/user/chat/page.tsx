"use client"
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRef } from 'react';

export default function Page(){
    const [chat,setChat] = useState('')
    const [chatList,setChatList] = useState([])
    const messagesEndRef = useRef(null)

    const sendChat = async()=>{
        // const { pipeline } = await import("@xenova/transformers");
        setChatList([...chatList,chat]);

    }

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
      }, [chatList]);
      

    return (
        <main>
           
<section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>
    <div className="lg:w-5/6 md:w-2/3 mx-auto">
      <div className="flex flex-col rounded-lg w-full border-2 h-[400px] overflow-auto items-baseline bg-yellow-200 ">
        Chat messages
        
        {
          chatList.map((item,index)=>{
              return (
                <div className="w-auto rounded-lg mb-auto  bg-green-300 m-2 p-2" key={index}>
                {item}
                </div>
              )
          })
        }
        <div style={{ marginBottom: 100 }} ref={messagesEndRef} />

      </div>
      <div className="flex flex-wrap -m-2">
     
        <div className=" flex-grow">
          <div className="relative">
            <input onChange={(e)=>setChat(e.target.value)} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        
        <div className="">
          <button onClick={sendChat} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send</button>
        </div>
        
      </div>
    </div>
  </div>
</section>

        </main>
    )
}