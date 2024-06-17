import React, { useEffect } from 'react'
import { Header } from './Header/Header'
import { BookingForm } from './BookingForm/BookingForm'
import Footer from "../Footer/Footer";

export const Bookings
 = () => {
  
  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
},[])

  return (
    <div>
        <Header/>
        <BookingForm/>
        <Footer/>
    </div>
  )
}
