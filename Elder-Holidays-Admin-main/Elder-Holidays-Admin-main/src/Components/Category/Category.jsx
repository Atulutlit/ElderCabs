import React, { useEffect, useRef, useState } from "react";
import categories from "../../Api/categories";
import toast from "react-hot-toast";

// Components
import AddIcon from "@mui/icons-material/Add";

const Category = () => {
  const [allCategories, setAllCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const formHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const response = await categories.create({ name: category });
    if (response.status === 200) {
      categories.read().then((res) => setAllCategories(res));
      form.reset();
      toast.success("Region added successfully.");
    } else {
      toast.error("Sorry! Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    const res = await categories.delete(id);
    if (res.status === 200) {
      categories.read().then((res) => setAllCategories(res));
      toast.success("Region delete successfully.");
    } else {
      toast.error("Sorry! Something went wrong.");
    }
  };

  useEffect(() => {
    categories.read().then((res) => setAllCategories(res));
  }, []);

  return (
    <>
      <button
        className="bg-[#a4e7fd] px-5 py-2 rounded-md font-semibold display flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon /> Add New Region
      </button>
      <div
        className={`fixed top-0 right-0 duration-300 w-auto h-full shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-6 w-10 h-10 rounded-full duration-300 hover:bg-[#00000050] grid place-items-center"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          className={`min-w-[350px] max-w-full h-full overflow-y-auto ml-auto bg-[#f2f2f2] duration-700 rounded-l-xl px-5 py-5`}
          ref={ref}
        >
          <h2 className="text-center text-2xl font-semibold mt-5 pb-2 border-b-2">
            Regions
          </h2>
          <form className="mt-5" onSubmit={formHandler}>
            <div className="flex flex-col gap-y-4">
              <input
                type="text"
                name="category"
                placeholder="Region"
                className="py-2 px-3 rounded-md border-transparent border-2 focus:border-[#a4e7fd] outline-none"
                required
              />
              <button
                type="submit"
                className="bg-[#a4e7fd] px-2 py-2 font-semibold rounded-md"
              >
                Add Region
              </button>
            </div>
          </form>
          {/* category list */}
          <div className="mt-5 border-t pt-5">
            {Array.isArray(allCategories) &&
              allCategories.map((cate, index) => (
                <div
                  key={index}
                  className="shadow-md py-2 px-2 border rounded-md mb-3 cursor-pointer flex items-center justify-between"
                >
                  <span>{cate?.name}</span>
                  <button
                    onClick={() => handleDelete(cate._id)}
                    className="text-red-500 w-10 h-10 rounded-full bg-red-200 grid place-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
