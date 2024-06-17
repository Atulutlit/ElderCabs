import "./style.css";
import reviews from "../../../Api/reviews";
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

// Components
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import TextEditor from "../../../Components/TextEditor/TextEditor";

const Reviews = () => {
  const [mode, setMode] = useState("C"); // Create (C) Or Update (U)

  // Form Values
  const [uploadedClientFile, setUploadedClientFile] = useState(null); // Uploaded File
  const [uploadedLocationFile, setUploadedLocationFile] = useState(null); // Uploaded File

  const [location, setLocation] = useState(""); // Location
  const [clientName, setClientName] = useState(""); // Client Name
  const [content, setContent] = useState(""); // Client Image
  const [assistanceRating, setAssistanceRating] = useState(""); // Assistance Rating
  const [tourRating, setTourRating] = useState(""); // Tour Rating
  const [hotelRating, setHotelRating] = useState(""); // Hotel Rating
  const [totalRating, setTotalRating] = useState(""); // Food Rating

  const [responseStatus, setResponseStatus] = useState(null); // Response Status

  const handleClientFileUpload = async (event) => {

    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);

      // Create Form Data to Append File
      const formData = new FormData();
      formData.append("image", compressedFile);

      // // Upload File and Get Filename
      const fileResponse = await reviews.uploadFile(formData);
      setUploadedClientFile(fileResponse.data.filename);

    } catch (error) {
      console.error(error);
    }

  };

  const handleLocationFileUpload = async (event) => {

    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);

      // Create Form Data to Append File
      const formData = new FormData();
      formData.append("image", compressedFile);

      // // Upload File and Get Filename
      const fileResponse = await reviews.uploadFile(formData);
      setUploadedLocationFile(fileResponse.data.filename);

    } catch (error) {
      console.error(error);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      location,
      name: clientName,
      content,
      assistance_rating: assistanceRating,
      tour_rating: tourRating,
      hotel_rating: hotelRating,
      total_rating: totalRating,
      client_img: uploadedClientFile,
      location_img: uploadedLocationFile,
    };

    if (mode === "C") {
      // Submit - Create Mode
      const response = await reviews.create(data);
      setResponseStatus(response.status === 200 ? 1 : 0);
    } else {
      // Submit - Update Mode
      const response = await reviews.update(
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
      const getReview = async () => {
        const response = await reviews.getOne(
          window.location.pathname.split("/")[2]
        );
        const data = response.data;

        setLocation(data.location);
        setClientName(data.name);
        setContent(data.content);
        setAssistanceRating(data.assistance_rating.$numberDecimal);
        setTourRating(data.tour_rating.$numberDecimal);
        setHotelRating(data.hotel_rating.$numberDecimal);
        setTotalRating(data.total_rating.$numberDecimal);
        setUploadedClientFile(data.client_img);
        setUploadedLocationFile(data.location_img);
      };

      getReview();
    }
  }, [mode]);

  return (
    <div className="Reviews">
      <h1 className="ItemDetailTitle">
        {mode === "C" ? "Create" : "Update"} Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="ItemDetailForm"
        method="POST"
        action="/"
      >
        {responseStatus === 2 && (
          <Alert className="mb-5" severity="success">
            Review Updated Succesfully!
          </Alert>
        )}
        {responseStatus === 1 && (
          <Alert className="mb-5" severity="success">
            Review Uploaded Succesfully!
          </Alert>
        )}
        {responseStatus === 0 && (
          <Alert className="mb-5" severity="error">
            Something Went Wrong
          </Alert>
        )}

        {uploadedClientFile && (
          <div className="ImagePreview">
            <img
              className="ImagePreviewImage"
              src={
                process.env.REACT_APP_API_URL +
                `/uploads/reviews/${uploadedClientFile}`
              }
              alt="Upload Preview"
            />
          </div>
        )}

        <label className="ItemDetailFileInput">
          <input
            type="file"
            className="ItemDetailFileInputNoView"
            onChange={handleClientFileUpload}
          />
          <CloudUploadIcon className="ItemDetailIcon" />
          Upload Client Image
        </label>

        {uploadedLocationFile && (
          <div className="ImagePreview">
            <img
              className="ImagePreviewImage"
              src={
                process.env.REACT_APP_API_URL +
                `/uploads/reviews/${uploadedLocationFile}`
              }
              alt="Upload Preview"
            />
          </div>
        )}

        <label className="ItemDetailFileInput">
          <input
            type="file"
            className="ItemDetailFileInputNoView"
            onChange={handleLocationFileUpload}
          />
          <CloudUploadIcon className="ItemDetailIcon" />
          Upload Location Image
        </label>

        <input
          className="ItemDetailInput"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />


        {/* <TextEditor description={content} setDescription={setContent} /> */}

        <textarea
          className="ItemDetailInput"
          placeholder="Content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input
          className="ItemDetailInput"
          type="number"
          placeholder="Assistance Rating (1-5)"
          value={assistanceRating}
          onChange={(e) => setAssistanceRating(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          type="number"
          placeholder="Tour Rating (1-5)"
          value={tourRating}
          onChange={(e) => setTourRating(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          type="number"
          placeholder="Hotel Rating (1-5)"
          value={hotelRating}
          onChange={(e) => setHotelRating(e.target.value)}
        />

        <input
          className="ItemDetailInput"
          type="number"
          placeholder="Total Rating (1-5)"
          value={totalRating}
          onChange={(e) => setTotalRating(e.target.value)}
        />

        <button type="submit" className="ItemDetailButton">
          Create / Update
        </button>
      </form>
    </div>
  );
};

export default Reviews;
