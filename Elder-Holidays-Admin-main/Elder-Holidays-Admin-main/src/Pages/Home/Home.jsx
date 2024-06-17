import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Chart from "../../Components/Chart/Chart";
import "./style.css";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const Home = () => {

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { data: packages = [] } = useFetch('/package');
  const { data: blog = [] } = useFetch('/blog');
  const { data: review = [] } = useFetch('/review');
  const { data: blogs = [] } = useFetch('/blog');

  const API_URL = process.env.REACT_APP_API_URL

  const chartData = [
    { name: 'Packages', quantity: packages?.length },
    { name: 'Blogs', quantity: blog?.length },
    { name: 'Reviews', quantity: review?.length }
  ];

  const contentLimit = (content) => {
    const splitContent = content.split('');
    let text = '';
    if (splitContent.length > 70) {
      text = `${splitContent.splice(0, 100).join('')}...`;
    } else {
      text = content;
    }
    return <>{text}</>
  }

  return (
    <>
      <div className="Home">
        <div>
          <h1 className="text-center text-3xl font-semibold border-b-2 pb-3">Welcome, Elder Cabs Admin</h1>
        </div>
        <div className="flex flex-col md:flex-row mt-5">
          <div className="flex-1">
            <div className="grid grid-cols-2 shadow-md border gap-5 p-4">
              <div className="col-span-1 text-white shadow-xl text-center cursor-pointer py-2 px-3 bg-[#0088FE]">
                <h1 className="text-3xl">{Array.isArray(packages) && packages.length}</h1>
                <h3 className="text-2xl">Package</h3>
              </div>
              <div className="col-span-1 text-white shadow-xl text-center cursor-pointer py-2 px-3 bg-[#00C49F]">
                <h1 className="text-3xl">{Array.isArray(blog) && blog.length}</h1>
                <h3 className="text-2xl">Blogs</h3>
              </div>
              <div className="col-span-1 text-white shadow-xl text-center cursor-pointer py-2 px-3 bg-[#FFBB28]">
                <h1 className="text-3xl">{Array.isArray(review) && review.length}</h1>
                <h3 className="text-2xl">Reviews</h3>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <Chart data={chartData} />
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-2xl border-b-2 pb-2">Recent Posts</h1>
          <div className="mt-5 grid grid-cols-2 gap-5">
            {Array.isArray(blogs) && blogs.map(blog =>
              <div key={blog._id} className="col-span-2 lg:col-span-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full block lg:h-[250px]">
                  <img
                    className="rounded-t-lg w-full h-full object-cover"
                    src={`${API_URL}/uploads/blogs/${blog?.image}`}
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog?.title}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{contentLimit(blog?.content)}</p>
                  {blog?.content?.length > 100 &&
                    <button
                      onClick={() => {
                        setOpen(true);
                        setModalData(blog?.content);
                      }}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalData && <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setModalData(null);
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-10/12 max-w-[700px] bg-white">
          <div className="p-5">
            <p>{modalData}</p>
          </div>
        </div>
      </Modal>}
    </>
  );
};

export default Home;
