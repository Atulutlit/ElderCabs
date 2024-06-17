import React, { useEffect, useState } from "react";

// Components
import { Subscribe } from "../SubscribeNewsLetter/Subscribe";
import { Header } from "./Header/Header";
import Footer from "../Footer/Footer";
import PackageModal from '../PackageModal/PackageModal';

import { BestChoice } from "./Best Choice/BestChoice";
import { FindBestChoice } from "./FindBestChoice/FindBestChoice";
import { Honeymoon } from "./Honeymoon/Honeymoon";
import { PopularPlace } from "./Popular Place/PopularPlace";
import { SpecialOffers } from "./Special Offers/SpecialOffers";
import { TopPlace } from "./Top Place/TopPlace";
import { TopDestination } from "./TopDestination/TopDestination";
import { Customize } from "./CustomizePackage/Customize";
import useFetch from "../../hooks/useFetch";
import SinglePackagesArea from "./SinglePackagesArea/SinglePackagesArea";

export const Packages = () => {

  const [Open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { data: categories = [] } = useFetch('/categories');
  const { data: themes = [] } = useFetch('/theme');

  const modalHandler = (data) => {
    setOpen(true);
    setModalData(data);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, []);

  return (
    <div>
      <Header />
      {Array.isArray(categories) && categories.map(category =>
        <SinglePackagesArea key={category._id} data={category} path='/package/category' modalHandler={modalHandler} />
      )}
      {Array.isArray(themes) && themes.map(theme =>
        <SinglePackagesArea key={theme._id} data={theme} path='/package/theme' modalHandler={modalHandler} />
      )}

      {modalData && <PackageModal Open={Open} handleClose={() => setOpen(false)} modalData={modalData} />}

      {/* <PopularPlace /> */}
      {/* <TopDestination /> */}
      {/* <SpecialOffers /> */}
      {/* <Customize/> */}
      {/* <TopPlace /> */}
      {/* <Honeymoon /> */}
      {/* <BestChoice /> */}
      {/* <FindBestChoice /> */}
      <Subscribe />
      <Footer />
    </div>
  );
};
