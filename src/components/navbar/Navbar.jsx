import React, { useState } from "react";
import "../navbar/navbar.css";
import logo from "../images/logo-1.png";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  const [mobile, setMobile] = useState(true);
  const isLoggedIn = !!localStorage.loggedIn;
  const isSeller = localStorage.role === "seller";
  const canCreateProperty = isSeller && isLoggedIn;

  const toggleButton = () => {
    setMobile(!mobile);
  };

  return (
    <div className="navbar_container">
      <div className="logo_container">
        <NavLink to="/">
          <img src={logo} className="logo" alt="logo" />
        </NavLink>
        <div className="toggle_button" onClick={toggleButton}>
          {mobile ? (
            <DensitySmallIcon style={{ color: "black" }} sx={{ fontSize: 40 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 40 }} />
          )}
        </div>
      </div>
      <div className={mobile ? "mobile-size link_items" : "link_items"}>
        <div className="dropdown_content">
          <NavLink to={"/"} className="navlink">
            <p className="p_links">home</p>
          </NavLink>
        </div>
        <div className="dropdown_content">
          <NavLink to={"/view"} className={"navlink"}>
            <p className="p_links"> view </p>
          </NavLink>
        </div>
        {canCreateProperty && (
          <div className="dropdown_content">
            <NavLink to={"/user/createproperty"} className={"navlink"}>
              <AddIcon className="plus_icon" sx={{ fontSize: 17 }} />
              <p className="p_links"> create </p>
            </NavLink>
          </div>
        )}
        {isLoggedIn && (
          <div className="dropdown_content">
            <NavLink to={"/user/profile"} className="navlink">
              <p className="p_links">
                <AccountCircleOutlinedIcon className="profile_icon" sx={{ fontSize: 40 }} />
              </p>
            </NavLink>
          </div>
        )}
        {!isLoggedIn && (
          <div className="dropdown_content signup">
            <NavLink to={"/auth"} className="navlink">
              <p className="Signup_links">Join-Us</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
