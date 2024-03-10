"use client"
import { useEffect, useState } from "react";
import axios from 'axios';
export default function Page() {
    const [products,setProducts] = useState([])

    const getProducts = async()=>{
      const res = await axios.post('/api/product/all');
      console.log(res.data.data)
      setProducts(res.data.data)

    }

    useEffect(()=>{
      getProducts()
    },[products])

    return (
    <>
    <p>Products Page</p>
    {
      products.map((item:any,index)=>{
        return (
          <div key={index}>
            <p>{item.title}</p>
          </div>
        )
      })
    }
    </>
    )
  }


