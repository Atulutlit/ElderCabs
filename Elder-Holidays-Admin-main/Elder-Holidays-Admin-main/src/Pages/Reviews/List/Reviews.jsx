import "./style.css";
import reviews from "../../../Api/reviews";
import { useEffect, useState } from "react";

// Components
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UpperPanel from "../../../Components/UpperPanel/UpperPanel";

const Reviews = () => {
  const [data, setData] = useState(null);

  const goToDetail = (id) => {
    window.location.pathname += `/${id}`;
  };

  const handleDelete = (id) => {
    reviews.delete(id);
    window.location.reload();
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await reviews.getAll();

      setData(response.data);
    };

    getReviews();
  }, []);

  return (
    <div className="Reviews">
      <UpperPanel item_name="Review" count={data?.length} />

      {/* Lower Panel */}
      <div className="LowerPanel">
        <div className="LowerPanelColumns">
          <div className="LowerPanelColumn">Name</div>
          <div className="LowerPanelColumn">Location</div>
          <div className="LowerPanelColumn">Total Rating</div>
          <div className="LowerPanelColumn">View / Update</div>
          <div className="LowerPanelColumn">Delete</div>
        </div>

        {/* Values */}
        {data?.map((item, id) => (
          <div className="LowerPanelItem" key={id}>
            <div className="LowerPanelItemVal">{item.name}</div>
            <div className="LowerPanelItemVal">{item.location}</div>
            <div className="LowerPanelItemVal">
              {item.total_rating.$numberDecimal}
            </div>
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

export default Reviews;
