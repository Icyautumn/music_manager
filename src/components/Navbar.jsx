import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { AccountContext } from "../pages/login Page/Accounts";
import { userNavbar } from "./userNavbar";

function Navbar() {
  const { getSession, logout } = useContext(AccountContext);
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("id"));
  });

  return (
    <>
      <IconContext.Provider value={{ color: "#333" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars" style={{ marginRight: "95%" }}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <p
              style={{ marginTop: "17px" }}
              className="material-icons-outlined"
            >
              logout
            </p>
          </button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {localStorage.getItem("profile") === "MusicSchool"
              ? SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path + token}>
                        {item.icon}
                        <span className="sidebarSpan">{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : userNavbar.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path + token}>
                        {item.icon}
                        <span className="sidebarSpan">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
