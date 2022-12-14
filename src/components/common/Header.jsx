import React, { useEffect, useReducer, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import TopbarHeader from "./TopbarHeader";
import useAuth from "../hooks/useAuth";
import {FiLogOut} from "@react-icons/all-files/fi/FiLogOut";
import axios from "axios";
import { io } from "socket.io-client";
axios.defaults.withCredentials = true;


function Header() {
  const { auth, setAuth } = useAuth();
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const logout = async () => {
		await axios.get(
			"http://localhost:3500/logout",

			{
				withCredentials: true,
			}
		);

    // window.location.href = `https://${window.location.hostname}`;
		window.location.reload(false);
	}


  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".header-area");
    const scrollTop = window.scrollY;
    scrollTop >= 20
    ? header.classList.add("sticky")
    : header.classList
    ? header.classList.remove("sticky")
    : header.classList.add("sticky");
  };

  /*---------menu button event----------*/
  const handleSidbarMenu = () => {
    if (sidebar === false || sidebar === 0) {
      setSidebar(1);
    } else {
      setSidebar(false);
    }
  };

  /*---------add event scroll top----------*/
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const searchFullScreen = () => {
    if (search === false || search === 0) {
      setSearch(1);
      console.log(search);
    } else {
      setSearch(false);
    }
  };

  /*---------Using reducer mange the active or inactive menu----------*/
  const initialState = { activeMenu: "" };
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "homeOne":
        return { activeMenu: "homeOne" };
      case "pages":
        return { activeMenu: "pages" };
      case "news":
        return { activeMenu: "news" };
      case "brows":
        return { activeMenu: "brows" };
      case "itwork":
        return { activeMenu: "itwork" };
      case "about":
        return { activeMenu: "about" };
      case "contact":
        return { activeMenu: "contact" };
      default:
        return { activeMenu: "" };
    }
  }

  return (
    <>
      <TopbarHeader />
      <div className={search === 1 ? "mobile-search slide" : "mobile-search"}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-11">
              <label>What are you lookking for?</label>
              <input
                type="text"
                placeholder="Search Products, Category, Brand"
              />
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
              <div className="search-cross-btn " onClick={searchFullScreen}>
                {/* <i class="bi bi-search me-4"></i> */}
                <i className="bi bi-x" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="header-area style-1">
        <div className="header-logo">
          <Link to={`${process.env.PUBLIC_URL}/`} onClick={scrollTop}>
            <img style={{height: "50px" , width: "50px"}} 
              alt="logo"
              src={process.env.PUBLIC_URL + "/images/bg/bidbazar.png"}
            />
          </Link>
        </div>
        <div className={sidebar === 1 ? "main-menu show-menu" : "main-menu"}>
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap ">
              <Link to={"/"}>
                <img
                  alt="logo"
                 
                  src={process.env.PUBLIC_URL + "/images/bg/bidbazar.png"}
                />
              </Link>
            </div>
            <div className="menu-close-btn" onClick={handleSidbarMenu}>
              <i className="bi bi-x-lg" />
            </div>
          </div>
          <ul className="menu-list">


        { auth?.Role? <li
              //className="menu-item-has-children"
              onClick={() => dispatch({ type: "homeOne" })}
            >
              <Link
                to={`/${auth.Role}/dashboard`} onClick={scrollTop}
                className={`${
                  state.activeMenu === "homeOne" ? "active" : ""
                } ${"drop-down"}`}
              >
                Dashboard
              </Link>
            
            </li>:""}


            {auth.Role=="Buyer"?
             <li
             //className="menu-item-has-children"
             onClick={() => dispatch({ type: "news" })}
           >
             <Link
               to={`/buyer/live-auction`} onClick={scrollTop}
               className={`${
                 state.activeMenu === "news" ? "active" : ""
               } ${"drop-down"}`}
             >
               Live Auction
             </Link>
           
           </li>
          :  ""
          
          }

            <li
              //className="menu-item-has-children"
              onClick={() => dispatch({ type: "homeOne" })}
            >
              <Link
                to={`${process.env.PUBLIC_URL}/`} onClick={scrollTop}
                className={`${
                  state.activeMenu === "brows" ? "active" : ""
                } ${"drop-down"}`}
              >
                Home
              </Link>
            
            </li>

            <li onClick={() => dispatch({ type: "about" })}>
              <Link
                to={`${process.env.PUBLIC_URL}/about`}
                onClick={scrollTop}
                className={`${state.activeMenu === "about" ? "active" : ""} `}
              >
                About Us
              </Link>
            </li>
            <li onClick={() => dispatch({ type: "itwork" })}>
              <Link
                to={`${process.env.PUBLIC_URL}/how-works`}
                onClick={scrollTop}
                className={`${state.activeMenu === "itwork" ? "active" : ""} `}
              >
                How It Works
              </Link>
            </li>
            {/* <li onClick={() => dispatch({ type: "brows" })}>
              <Link
                to={`${process.env.PUBLIC_URL}/live-auction`}
                onClick={scrollTop}
                className={`${state.activeMenu === "brows" ? "active" : ""} `}
              >
                Browse Product
              </Link>
            </li> */}
            {/* <li
              className="menu-item-has-children"
              onClick={() => dispatch({ type: "news" })}
            >
              <Link
                to={"#"}
                className={`${
                  state.activeMenu === "news" ? "active" : ""
                } ${"drop-down"}`}
              >
                News
              </Link>
              <i className="bx bx-plus dropdown-icon" />
              <ul
                className={
                  state.activeMenu === "news"
                    ? "submenu d-block"
                    : "submenu d-xl-block d-none"
                }
              >
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/blog`}
                    onClick={scrollTop}
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/blog-Details`}
                    onClick={scrollTop}
                  >
                    Blog Details
                  </NavLink>
                </li>
              </ul>
            </li> */}
            {/* <li
              className="menu-item-has-children"
              onClick={() => dispatch({ type: "pages" })}
            >
              <Link
                to={"#"}
                className={`${
                  state.activeMenu === "pages" ? "active" : ""
                } ${"drop-down"}`}
              >
                Pages
              </Link>
              <i className="bx bx-plus dropdown-icon" />
              <ul
                className={
                  state.activeMenu === "pages"
                    ? "submenu d-block"
                    : "submenu d-xl-block d-none"
                }
              >
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/auction-details`}
                    onClick={scrollTop}
                  >
                    Auction Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/faq`}
                    onClick={scrollTop}
                  >
                    Faq
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/dashboard`}
                    onClick={scrollTop}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/login`}
                    onClick={scrollTop}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/signup`}
                    onClick={scrollTop}
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${process.env.PUBLIC_URL}/error`}
                    onClick={scrollTop}
                  >
                    404
                  </NavLink>
                </li>
              </ul>
            </li> */}
            <li onClick={() => dispatch({ type: "contact" })}>
              <Link
                to={`${process.env.PUBLIC_URL}/contact`}
                onClick={scrollTop}
                className={`${state.activeMenu === "contact" ? "active" : ""} `}
              >
                Contact
              </Link>
            </li>
          </ul>
          {/* mobile-search-area */}
          <div className="d-lg-none d-block">
            <form className="mobile-menu-form">
              <div className="input-with-btn d-flex flex-column">
                <input type="text" placeholder="Search here..." />
                <button type="submit" className="eg-btn btn--primary btn--sm">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="nav-right d-flex align-items-center">
          <div className="hotline d-xxl-flex d-none">
            <div className="hotline-icon">
              <img
                alt="images"
                src={process.env.PUBLIC_URL + "/images/icons/header-phone.svg"}
              />
            </div>
            <div className="hotline-info">
              <span>Click To Call</span>
              <h6>
                <a href="tel:347-274-8816">+92 302 2082996</a>
              </h6>
            </div>
          </div>
          {/* <div className="search-btn" onClick={searchFullScreen}>
            <i className="bi bi-search" />
          </div> */}
          { auth?.Name ?

          <div className="flex ">

          <div className="eg-btn btn--primary header-btn">
           <Link to={`/${auth.Role}/dashboard`} replace onClick={scrollTop}>
              {auth.Name}'s Account
            </Link> 
          </div>


          
          <div className="eg-btn btn--primary header-btn flex items-center justify-center  ml-4">
          <FiLogOut className="flex mt-1" onClick={()=>{logout()}} />
            
            </div>
          
          </div>
          
          :
          
          <div className="eg-btn btn--primary header-btn">
          <Link to={`${process.env.PUBLIC_URL}/login`} onClick={scrollTop}>
             {auth.Name}Login
           </Link> 
         </div>
          
          }
          <div
            className="mobile-menu-btn d-lg-none d-block"
            onClick={handleSidbarMenu}
          >
            <i className="bx bx-menu" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
