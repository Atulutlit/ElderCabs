import "./style.css";
import { Link } from "react-router-dom";

// Components
import AddIcon from "@mui/icons-material/Add";

const UpperPanel = ({ item_name, count }) => {
  return (
    <div className="UpperPanel">
      <h1 className="WelcomeHeading">Welcome,</h1>

      <div className="PanelBar">
        <p className="StatisticItem">
          Number of {item_name}s: {count}
        </p>
        <Link to="create/">
          <button className="AddItemButton">
            <AddIcon />
            Create New {item_name}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpperPanel;
