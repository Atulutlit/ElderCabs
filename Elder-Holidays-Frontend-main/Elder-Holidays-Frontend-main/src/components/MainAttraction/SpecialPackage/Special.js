import React, { useState } from "react";
import "./special.css";
import img1 from "../../../assets/img/mainAttr/SpecialPAckage/1.png";
import { SpecialStar } from "./SpecialStar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import yellowStar from "../../../assets/img/hotels/star.png";
import popImg from "../../../assets/img/popup/popImg.png";
import walk from "../../../assets/img/popup/walk.png";
import hotel from "../../../assets/img/popup/hotel.png";
import car from "../../../assets/img/popup/car.png";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import PackageModal from "../../PackageModal/PackageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
export const Special = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 720,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // backgroundColor:"red",
    boxShadow: 24,
    borderRadius: "10px  ",
    p: 2,
  };
  const hotels_overlay = {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.331)",
  };

  const [Open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { data: packages = [], isLoading, } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/package/top-packages`, {
        headers: {
          authorization: `bearer ${API_KEY}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  // slice  3 packages
  const slicePackage = packages.length > 0 && packages.slice(0, 3);

  return (
    <div className="Special_Cont">
      {modalData &&
        <PackageModal
          Open={Open}
          handleClose={() => {
            setOpen(false);
            setModalData(null);
          }}
          modalData={modalData}
        />
      }
      <div className="Special_overview_part">
        <h2>Special Package</h2>
      </div>
      <div className="Special_Cards">
        {Array.isArray(slicePackage) && slicePackage.map((item, index) =>
          <div className="Special_Card" key={index}>
            <LazyLoadImage
              src={`${API_URL}/uploads/packages/${item?.image}`}
              alt="img"
              className="selectDisable"
              draggable="false"
            />
            <div className="Special_h3 shadow-lg">
              <div>
                <h3>{item?.title}</h3>
                <h3 className="text-sm">
                  <span>From</span> {item?.price_range}
                </h3>
              </div>
              <button onClick={() => {
                setOpen(true);
                setModalData(item);
              }} className="bg-[#66DAFF] border-2 border-[#66DAFF] hover:text-black hover:bg-[#ffffff] font-semibold duration-500 text-black px-5 py-2 rounded ">
                Detail
              </button>{" "}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
