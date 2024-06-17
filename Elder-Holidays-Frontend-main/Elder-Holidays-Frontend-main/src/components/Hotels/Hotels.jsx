import React, { useEffect } from 'react'
import { Subscribe } from '../SubscribeNewsLetter/Subscribe'
import { Header } from './Header/Header'
import { AllHotels } from './AllHotels/AllHotels'
import Footer from "../Footer/Footer";

export const Hotels = () => {
  
  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
},[])

  return (
    <div>
        <Header/>
        <AllHotels/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}
