"use client"
import { useEffect, useState } from "react";
import axios from 'axios';
export default function Page() {
    const [products,setProducts] = useState<any>([])
    const [loaded,setLoaded] = useState(false)

    const getProducts = async()=>{
      const res = await axios.post('/api/product/all');
      console.log(loaded)
      setLoaded(true)
      // setProducts([...products,res.data.data]);
      setProducts(res.data.data);
    }

    useEffect(()=>{
      if(loaded == false)
        getProducts()
    },[loaded])

    return (
    <>
    <p>Products Page</p>
    <div className="grid grid-cols-4 gap-4">
    {
      products.map((item:any,index:any)=>{
        console.log(item)
        return (
          <div key={index} className="border-2 rounded-md flex p-2 flex-row space-x-2" >
            <div><img src={item.logo} className="w-[100px] " /></div>
            <div>
            <div>{item.title}</div>
            <div className="text-[10px]">{item.description}</div>
            <div className="text-sm font-bold">{item.category}</div>
            <div><a href={item.website} className="text-sm text-blue-500">{item.website.substring(0,30)}</a></div>
            </div>
          </div>
        )
      })
    }
    </div>
    </>
    )
  }


