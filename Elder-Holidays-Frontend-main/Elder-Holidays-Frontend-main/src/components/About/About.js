import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import { Header } from "./HeaderAbout/Header";
import { Content } from "./Content/Content";
import { Subscribe } from "../SubscribeNewsLetter/Subscribe";
import AboutAndMission from "./AboutAndMission";
export const About = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <>
      <Header />
      <Content />
      <AboutAndMission />
      <Subscribe />
      <Footer />
    </>
  );
};
