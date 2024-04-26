import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Thhero from "../components/Thhero";
import Sahero from "../components/Sahero";
import Coming from "../components/Coming";
type Props = {params:{country:string}}

export const generateMetadata = ({params}:Props):Metadata=>{
  const thailand = {
    title:"Thailand Social Network Portal: Connect, Explore, and Thrive | ExpatRait",
    description:"Welcome to our Thailand-centric social network portal, your one-stop destination for all things Thailand. Connect with expats and locals alike to buy, sell, work, hire, rent, share, meet, learn, serve, fall in love, and make a difference. Explore exclusive clubs, pristine beaches, and top-rated restaurants handpicked for your enjoyment. Join us to navigate life in the Land of Smiles and unlock endless opportunities. Start your journey today"
  }
  const saudiarabia = {
    title:"Thailand Social Network Portal: Connect, Explore, and Thrive | ExpatRait",
    description:"Welcome to our Thailand-centric social network portal, your one-stop destination for all things Thailand. Connect with expats and locals alike to buy, sell, work, hire, rent, share, meet, learn, serve, fall in love, and make a difference. Explore exclusive clubs, pristine beaches, and top-rated restaurants handpicked for your enjoyment. Join us to navigate life in the Land of Smiles and unlock endless opportunities. Start your journey today"
  }
  if(params.country == "thailand"){
    return thailand
  }else if(params.country == "saudi-arabia"){
    return saudiarabia
  }else{
    return {
      title:"Welcome to "+params.country
    }
  }
}


export default function Page({ params }:Props) {
    const country = params.country
    if(country== "thailand" || country== "saudi-arabia"){
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center flex-col justify-between font-mono text-sm lg:flex">
      <Link href={country+"/post/create"} className="bg-gray-300 rounded-lg px-2 border-2 border-gray-500 ml-auto">+Post</Link>  

      {params.country == "thailand" && <Thhero></Thhero>}
      {params.country == "saudi-arabia" && <Sahero></Sahero>}

      </div>
    </main>)
    }else{
      return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Coming></Coming>
        </div>
      </main>)
    }
  }