import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import NotesIcon from "@mui/icons-material/Notes";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Assets
import logo from '../../Assets/logo.png';

const Sidebar = () => {
  const [selectedLink, setSelectedLink] = useState(
    window.location.pathname.split("/")[1]
  );

  const handleLogout = () => {
    // Remove token from Local Storage
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="Sidebar">
      <img
        className="SidebarLogo"
        // src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
        src={logo}
        alt="Elder Cabs"
      />
      <ul className="SidebarLinks">
        <Link to={"/blogs"}>
          <li
            onClick={() => setSelectedLink("blogs")}
            className={`SidebarLink ${selectedLink === "blogs" && "SidebarLinkSelected"
              }`}
          >
            <NotesIcon className="SidebarNavigationIcon" />
            Blogs
          </li>
        </Link>

        <Link to="/packages">
          <li
            onClick={() => setSelectedLink("packages")}
            className={`SidebarLink ${selectedLink === "packages" && "SidebarLinkSelected"
              }`}
          >
            <Inventory2Icon className="SidebarNavigationIcon" />
            Packages
          </li>
        </Link>

        <Link to="/reviews">
          <li
            onClick={() => setSelectedLink("reviews")}
            className={`SidebarLink ${selectedLink === "reviews" && "SidebarLinkSelected"
              }`}
          >
            <RateReviewIcon className="SidebarNavigationIcon" /> Reviews
          </li>
        </Link>

        <Link to="/settings">
          <li
            onClick={() => setSelectedLink("settings")}
            className={`SidebarLink ${selectedLink === "settings" && "SidebarLinkSelected"
              }`}
          >
            <SettingsIcon className="SidebarNavigationIcon" /> User Settings
          </li>
        </Link>
      </ul>

      <div onClick={handleLogout} className={`SidebarLink LogoutButton`}>
        <ExitToAppIcon className="SidebarNavigationIcon" /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
