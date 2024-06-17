import "./style.css";
import blogs from "../../../Api/blogs";
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

// Components
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import TextEditor from "../../../Components/TextEditor/TextEditor";

const Blogs = () => {
  const [mode, setMode] = useState("C"); // Create (C) Or Update (U)

  // Form Values
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded File
  const [title, setTitle] = useState(""); // Title
  const [content, setContent] = useState(""); // Content
  const [published, setPublished] = useState(false); // Published
  const [responseStatus, setResponseStatus] = useState(null); // Response Status

  const handleFileUpload = async (event) => {

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

      // Upload File and Get Filename
      const fileResponse = await blogs.uploadFile(formData);
      setUploadedFile(fileResponse.data.filename);

    } catch (error) {
      console.error(error);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create Data Object
    const data = {
      title,
      content,
      published,
      image: uploadedFile,
    };

    if (mode === "C") {
      // Submit - Create Mode
      const response = await blogs.create(data);
      setResponseStatus(response.status === 200 ? 1 : 0);
    } else {
      // Submit - Update Mode
      const response = await blogs.update(
        window.location.pathname.split("/")[2],
        data
      );

      // Update Response Status
      setResponseStatus(response.status === 200 ? 2 : 0);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Set Mode
    const path = window.location.pathname.split("/")[2];
    path === "create" ? setMode("C") : setMode("U");

    // Update Mode Form Values
    if (mode === "U") {
      const getBlog = async () => {
        const blog = await blogs.getOne(window.location.pathname.split("/")[2]);
        setUploadedFile(blog.data.image);
        setTitle(blog.data.title);
        setContent(blog.data.content);
        setPublished(blog.data.published);
      };
      getBlog();
    }
  }, [mode]);

  return (
    <div className="Blogs">
      <h1 className="ItemDetailTitle">
        {mode === "C" ? "Create" : "Update"} Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="ItemDetailForm"
        method="POST"
        action="/"
      >
        {responseStatus === 2 && (
          <Alert className="mb-5" severity="success">
            Blog Updated Succesfully!
          </Alert>
        )}
        {responseStatus === 1 && (
          <Alert className="mb-5" severity="success">
            Blog Uploaded Succesfully!
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
                process.env.REACT_APP_API_URL + `/uploads/blogs/${uploadedFile}`
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
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <TextEditor description={content} setDescription={setContent} /> */}

        <textarea
          className="ItemDetailInput"
          placeholder="Content*"
          rows={3}
          required
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <FormControlLabel
          className="ItemDetailSwitch"
          control={
            <Switch
              color="primary"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
          }
          label="Published"
          name="published"
        />

        <button type="submit" className="ItemDetailButton">
          {mode === "C" ? "Create" : "Update"} Blog
        </button>
      </form>
    </div>
  );
};

export default Blogs;
