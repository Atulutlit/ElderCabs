import "./style.css";
import packages from "../../../Api/packages";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

import allTheme from "../../../Api/theme";
import allCategory from "../../../Api/categories";

// Components
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";

const Packages = () => {
  const [mode, setMode] = useState("C"); // Create (C) Or Update (U)

  // Form Values
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded File
  const [title, setTitle] = useState(""); // Title
  const [description, setDescription] = useState(""); // Description
  const [duration, setDuration] = useState(""); // Duration
  const [car, setCar] = useState(""); // Car
  const [hotel, setHotel] = useState(""); // Hotel
  const [priceRange, setPriceRange] = useState(""); // Price Range
  const [category, setCategory] = useState(""); // Category
  const [theme, setTheme] = useState(""); // Theme
  const [clickCount, setClickCount] = useState(0); // Click Count
  const [activitiesField, setActivitiesField] = useState([{ value: "" }]);
  const [responseStatus, setResponseStatus] = useState(null); // Response Status

  // categories and themes state
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);

  const handleFileUpload = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      // Create Form Data to Append File
      const formData = new FormData();
      formData.append("image", compressedFile);

      // // Upload File and Get Filename
      const fileResponse = await packages.uploadFile(formData);

      setUploadedFile(fileResponse.data.filename);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      duration,
      car,
      hotel,
      price_range: priceRange,
      category,
      theme,
      image: uploadedFile,
      activities: activitiesField.map((activity) => activity.value),
    };

    if (mode === "C") {
      // Submit - Create Mode
      const response = await packages.create(data);
      setResponseStatus(response.status === 200 ? 1 : 0);
    } else {
      // Submit - Update Mode
      const response = await packages.update(
        window.location.pathname.split("/")[2],
        data
      );

      // Update Response Status
      setResponseStatus(response.status === 200 ? 2 : 0);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const path = window.location.pathname.split("/")[2];
    path === "create" ? setMode("C") : setMode("U");

    // Update Mode Form Values
    if (mode === "U") {
      const getPackage = async () => {
        const blog = await packages.getOne(
          window.location.pathname.split("/")[2]
        );

        // Set Form Values
        setUploadedFile(blog.data.image);
        setTitle(blog.data.title);
        setDescription(blog.data.description);
        setDuration(blog.data.duration);
        setCar(blog.data.car);
        setHotel(blog.data.hotel);
        setPriceRange(blog.data.price_range);
        setCategory(blog.data.category);
        setTheme(blog.data.theme);
        setClickCount(blog.data.click_count);
        setActivitiesField(
          blog.data.activities.map((activity) => ({ value: activity }))
        );
      };
      getPackage();
    }

    allTheme.read().then((res) => setThemes(res));
    allCategory.read().then((res) => setCategories(res));
  }, [mode]);

  return (
    <div className="Packages">
      <h1 className="ItemDetailTitle">
        {mode === "C" ? "Create" : "Update"} Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="ItemDetailForm"
        method="POST"
        action="/"
      >
        {responseStatus === 2 && (
          <Alert className="mb-5" severity="success">
            Package Updated Successfully!
          </Alert>
        )}
        {responseStatus === 1 && (
          <Alert className="mb-5" severity="success">
            Package Uploaded Successfully!
          </Alert>
        )}
        {responseStatus === 0 && (
          <Alert className="mb-5" severity="error">
            Something Went Wrong
          </Alert>
        )}

        {uploadedFile && (
          <div className="ImagePreview">
            <img
              className="ImagePreviewImage"
              src={
                process.env.REACT_APP_API_URL +
                `/uploads/packages/${uploadedFile}`
              }
              alt="Upload Preview"
            />
          </div>
        )}

        <label className="ItemDetailFileInput">
          <input
            type="file"
            name="image"
            className="ItemDetailFileInputNoView"
            onChange={handleFileUpload}
          />
          <CloudUploadIcon className="ItemDetailIcon" />
          Upload an Image
        </label>

        <input
          className="ItemDetailInput"
          placeholder="Title*"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <TextEditor description={description} setDescription={setDescription} /> */}

        <textarea
          className="ItemDetailInput"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          className="ItemDetailInput"
          placeholder="Duration*"
          required
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          placeholder="Car*"
          required
          value={car}
          onChange={(e) => setCar(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          placeholder="Hotel*"
          required
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          placeholder="Price Range* (e.g. 'Rs.1000 - Rs.2000 per person')"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          required
        />

        {mode === "U" && (
          <input
            className="ItemDetailInput"
            placeholder="Click Count"
            disabled
            required
            value={clickCount}
          />
        )}

        {/* category  */}
        <select
          className="ItemDetailInput"
          defaultChecked={category}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Region
          </option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate?.name}>
                {cate?.name}
              </option>
            ))}
        </select>

        {/* theme  */}
        <select
          className="ItemDetailInput"
          defaultChecked={theme}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="" disabled>
            Select Theme
          </option>
          {themes &&
            themes.map((theme, index) => (
              <option key={index} value={theme?.name}>
                {theme?.name}
              </option>
            ))}
        </select>

        {/* Activities  */}
        <div className="my-3 flex justify-between items-center">
          <label className="text-base">Activities</label>
          <button
            type="button"
            className="cursor-pointer w-8 h-8 rounded-full text-[#a4e7fd] border-2 border-[#a4e7fd] grid place-items-center"
            title="Add Activities"
            onClick={() => {
              setActivitiesField((prevState) => [...prevState, { value: "" }]);
            }}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {activitiesField.map((item, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              value={item?.value}
              className="ItemDetailInput"
              placeholder="Activities"
              onChange={(e) => {
                let newState = [...activitiesField];
                newState[index].value = e.target.value;
                setActivitiesField(newState);
              }}
            />

            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-red-600"
              onClick={() => {
                let newState = [...activitiesField];
                newState.splice(index, 1);
                setActivitiesField(newState);
              }}
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
          </div>
        ))}

        {/* TODO: Theme and Category and Activities */}

        <button type="submit" className="ItemDetailButton">
          {mode === "C" ? "Create" : "Update"} Package
        </button>
      </form>
    </div>
  );
};

export default Packages;
