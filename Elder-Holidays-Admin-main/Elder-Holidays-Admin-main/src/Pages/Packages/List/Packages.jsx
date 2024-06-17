import "./style.css";
import packages from "../../../Api/packages";
import { useEffect, useState } from "react";

// Components
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UpperPanel from "../../../Components/UpperPanel/UpperPanel";
import Category from "../../../Components/Category/Category";
import Theme from "../../../Components/Theme/Theme";

const Packages = () => {
  const [data, setData] = useState(null);

  const goToDetail = (id) => {
    window.location.pathname += `/${id}`;
  };

  const handleDelete = (id) => {
    packages.delete(id);
    window.location.reload();
  };

  useEffect(() => {
    const getPackages = async () => {
      const response = await packages.getAll();

      setData(response.data);
    };

    getPackages();
  }, []);

  return (
    <div className="Packages">
      <UpperPanel item_name="Package" count={data?.length} />
      <div className="flex items-center gap-4 mt-5">
        <Category />
        <Theme />
      </div>
      {/* Lower Panel */}
      <div className="LowerPanel">
        <div className="LowerPanelColumns">
          <div className="LowerPanelColumn">Title</div>
          <div className="LowerPanelColumn">Click Count</div>
          <div className="LowerPanelColumn">Price Range</div>
          <div className="LowerPanelColumn">View / Update</div>
          <div className="LowerPanelColumn">Delete</div>
        </div>

        {/* Values */}
        {data?.map((item, id) => (
          <div className="LowerPanelItem" key={id}>
            <div className="LowerPanelItemVal">{item.title}</div>
            <div className="LowerPanelItemVal">{item.click_count}</div>
            <div className="LowerPanelItemVal">{item.price_range}</div>
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

export default Packages;
