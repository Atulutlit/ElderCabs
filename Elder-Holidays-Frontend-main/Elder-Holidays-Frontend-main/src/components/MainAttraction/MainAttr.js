import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import { Subscribe } from "../SubscribeNewsLetter/Subscribe";
import { Fun } from "./Fun&Activities/Fun";
import { HeaderMainAttr } from "./HeaderMainAttr";
import { India } from "./IndiaMap/India";
import { Special } from "./SpecialPackage/Special";
import { TopAttr } from "./TopAttr/TopAttr";

export const MainAttr = () => {

  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
},[])

  return (
    <>
      <HeaderMainAttr />
      <TopAttr/>
      <Fun/>
      <Special/>
      <India/>
      <Subscribe/>
      <Footer />
    </>
  );
};
