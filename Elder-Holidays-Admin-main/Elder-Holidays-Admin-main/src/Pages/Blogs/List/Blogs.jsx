import "./style.css";
import blogs from "../../../Api/blogs";

// Components
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UpperPanel from "../../../Components/UpperPanel/UpperPanel";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogs.getAll();

      setData(response.data);
    };

    getBlogs();
  }, []);

  const goToDetail = (id) => {
    window.location.pathname += `/${id}`;
  };

  const handleDelete = (id) => {
    blogs.delete(id);
    window.location.reload();
  };

  return (
    <div className="Blogs">
      <UpperPanel item_name="Blog" count={data?.length} />

      {/* Lower Panel */}
      <div className="LowerPanel">
        <div className="LowerPanelColumns">
          <div className="LowerPanelColumn">Title</div>
          <div className="LowerPanelColumn">Published</div>
          <div className="LowerPanelColumn">Date</div>
          <div className="LowerPanelColumn">View / Update</div>
          <div className="LowerPanelColumn">Delete</div>
        </div>

        {/* Values */}
        {data?.map((item, id) => (
          <div className="LowerPanelItem" key={id}>
            <div className="LowerPanelItemVal">{item.title}</div>
            <div className="LowerPanelItemVal">
              {item.published === true ? "Yes" : "No"}
            </div>
            <div className="LowerPanelItemVal">{item.date.slice(0, 10)}</div>
            <div className="LowerPanelItemVal">
              <button className="ViewItemButton">
                <VisibilityIcon
                  onClick={() => goToDetail(item._id)}
                  className="ItemButton"
                />
              </button>
            </div>
            <div className="LowerPanelItemVal">
              <button className="DeleteItemButton">
                <DeleteIcon
                  onClick={() => handleDelete(item._id)}
                  className="ItemButton"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
