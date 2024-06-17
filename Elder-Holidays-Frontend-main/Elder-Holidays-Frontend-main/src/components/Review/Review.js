import React from "react";
import sectionHeading from "../../utility/sectionHeading";
import Slide from "./Slide/Slide";
// import

const Review = () => {
  // const SectionHeading = sectionHeading("Reviews", "We always ask our clients to leave honest reviews, on the basis of which you can make a choice")
  return (
    // <div className='lg:px-[100px] md:px-[50px] px-8'>
    //     {
    //         SectionHeading
    //     }
    //
    // </div>
    <div className="flex justify-center items-center flex-col h-full bg-[#DEF3FF] w-full my-10 py-5">
      <div className="flex justify-center items-center flex-col h-full w-full py-5">
        <div>
          <h1
            className="lg:text-4xl text-3xl font-bold	"
            style={{ color: "#20284F" }}
          >
            Our happy clients
          </h1>
          <p style={{ color: "#787878" }} className="font-bold my-2">
            What they say about us
          </p>
        </div>
        <Slide />
      </div>
    </div>
  );
};

export default Review;
