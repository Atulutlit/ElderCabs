import "./style.css";
import { Outlet } from "react-router-dom";

// Header
import Sidebar from "../../Components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="MainLayout">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
