import React, { useEffect } from 'react'
import { Subscribe } from '../SubscribeNewsLetter/Subscribe'
import { Header } from './Header/Header'
import { PackagesYouGet } from './PackagesYouGet/PackagesYouGet'
import Footer from "../Footer/Footer";

export const AllPackages = () => {
  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
},[])
  return (
    <div>
      <Header />
      <PackagesYouGet />
      <Subscribe />
      <Footer />
    </div>
  )
}
