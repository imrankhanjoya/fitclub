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
    {
      products.map((item:any,index:any)=>{
        console.log(item)
        return (
          <div key={index} className="border-2 rounded-md flex flex-row space-x-2" >
            <div><img src={item.logo} className="w-[50px] h-[50px]" /></div>
            <div>
            <div>{item.title}</div>
            <div className="text-sm">{item.description}</div>
            <div>{item.category}</div>
            <div>{item.website}</div>
            </div>
          </div>
        )
      })
    }
    </>
    )
  }


