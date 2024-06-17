import React, { useEffect, useState } from "react";
import Nav from "../Header/Nav/Nav";
import Footer from "../Footer/Footer";

// assets
import BgImg from "../../assets/img/blogs/bg.png";
import authorImg from "../../assets/img/blogs/author.png";
import blogImg from "../../assets/img/blogs/blog.png";
import { Subscribe } from "../SubscribeNewsLetter/Subscribe";
import { useQuery } from "react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text mt-2 mb-5">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="cursor-pointer font-semibold">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Blogs = () => {

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/blog`, { headers: { authorization: `bearer ${API_KEY}` } });
      const data = await res.json();
      return data;
    }
  });

  const beautifyDate = (dt) => {
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dt);
    const x = `${date.getDate()}-${monthArr[date.getMonth()]}-${date.getFullYear()}`;
    return <>{x} <small className="text-xs">{date.toLocaleTimeString()}</small></>;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  const data = [
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry Show & Hide text, that’s where the role of useState() hook comes into play. We create a functional component Read More() in which we create a state with first element isReadMore as an initial state having a value of the true and the second element as function setIsReadMore() for updating state. Then a function is created by the name toggleReadMore which sets the value of the state isReadMore to the opposite of its present value whenever it is called.",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
    {
      title: "Walking the streets of Goa",
      description:
        "Most of all,I was struck and pleaswd by the sport ground, which is located in the Nepal,Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      thumbnail: blogImg,
      date: "3 December 2022",
      author: { name: "Denisov Anton", image: authorImg },
    },
  ];

  return (
    <>
      <Nav />
      {/* Landing section start */}
      <section
        className="!min-h-screen !rounded-none !m-0 bg-cover bg-no-repeat bg-top"
      // style={{
      //   backgroundImage: `url(${BgImg})`,
      //   backgroundImage: `linear-gradient(#00000075, #00000075),url(${BgImg})`,
      // }}
      >
        <img src={BgImg} className="object-cover w-full h-screen " draggable="false" style={{ zIndex: "-1" }} alt="" />
        <div className="h-full box-border w-full grid place-items-center z-10 absolute">
          <h1 className="lg:text-6xl text-4xl  text-white uppercase font-Inter tracking-wide font-bold">
            Blogs
          </h1>
        </div>
      </section>
      {/* Landing section end */}

      {/* Blogs area start */}
      <section className="!my-0 !block bg-[#F9F9F9] overflow-hidden pb-10">
        <div className="container mx-auto px-10 md:px-16 !h-auto max-w-full">
          <div className="mt-10 mb-6">
            <h1 className="text-left lg:text-6xl text-3xl text-[#20284F] font-Inter mb-2 font-bold">
              Blog
            </h1>
            <p className="text-left text-[#20284F] font-Inter font-normal">
              Interesting places, adventure, the best tourism and travel <br />
              experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 md:gap-5 ">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="col-span-1 rounded-xl border-2 bg-white shadow-md mx-2 my-2"
              >
                <div className="rounded-xl overflow-hidden h-[65vw] md:h-[35vw] lg:h-72">
                  <LazyLoadImage
                    src={`${API_URL}/uploads/blogs/${blog?.image}`}
                    alt={`${blog?.title} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col py-5 px-4 text-left">
                  <h1 className="text-2xl text-[#20284F] font-normal flex-none font-Inter font-bold">
                    {blog?.title}
                  </h1>
                  <p className="text-[#20284F] flex-1 !font-extralight mt-3 font-Inter">
                    <ReadMore>{blog?.content}</ReadMore>
                  </p>
                  <div className="flex justify-between items-center mt-5">
                    <span className="flex items-center gap-3 md:gap-5">
                      {/* <span className="w-12 h-12 block overflow-hidden rounded-full">
                        <img
                          src={item?.author?.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </span>
                      <span className="text-[#787878] font-Inter text-sm font-normal">
                        {item?.author?.name}
                      </span> */}
                    </span>
                    <span className="text-[#787878] font-Inter text-sm font-normal">
                      {beautifyDate(blog?.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blogs area end */}

      {/* Footer */}
      <Subscribe />
      <Footer />
    </>
  );
};

export default Blogs;
