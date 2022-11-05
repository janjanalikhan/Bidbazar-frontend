import React ,{useState, useEffect} from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/App";
import { createRoot } from "react-dom/client"; // For React 18
import MainLayout from "./components/layout/MainLayout";
import Contact from "./components/page/contact/Contact";
import ErrorPage from "./components/page/error/ErrorPage";
import SignUp from "./components/page/signUp/SignUp";
import Faq from "./components/page/faq/Faq";
import "./index.css";
import Login from "./components/page/login/Login";
import AuctionDetails from "./components/page/auctionDetails/AuctionDetails";
import Dashboard from "./components/page/dashboard/Dashboard";
import Bids from "./components/page/dashboard/Bids";
import buyerDashboard from "./components/page/buyerDashboard/Dashboard";

import Blog from "./components/page/blog/Blog";
import BlogDetails from "./components/page/BlogDetails/BlogDetails";
import LiveAuction from "./components/page/LiveAuction.jsx/LiveAuction";
import HowItWork from "./components/page/howItWork/HowItWork";
import About from "./components/page/about/About";
import Layout2 from "./components/layout/Layout2";
import Layout3 from "./components/layout/Layout3";
import Merchant from "./components/page/joinMerchant/Merchant";
import { ThemeContextProvider } from "./components/contexts/themeContext";
import ProfilePage from "./components/page/home/ProfilePage";
import useAuth from "./components/hooks/useAuth";
import LoginAuth from "./Auth/LoginAuth";
import RequireAuth from "./Auth/RequireAuth";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
//Default Warniing Error Hide
// console.log = console.warn = console.error = () => {};

/*
=>version : 0.1
=>Event : Rendering al content to web
=>Action: define all routes and page
@return HTML
*/

const Root = () => {
  const { auth } = useAuth();
  // const auth = {Role: "Admin"}

  const { id } = useParams();

  const location = useLocation();




  console.log("IM AT CON ROUTES: ", auth.Role);

  return (
    <>
      <Routes path="/">
        <Route element={<LoginAuth />}>
          <Route path="/" element={<MainLayout />} />
        </Route>

        <Route element={<LoginAuth />}>
          <Route exact path={`/about`} element={<Layout page={About} />} />
          <Route exact path={`/contact`} element={<Layout page={Contact} />} />

          <Route
            exact
            path={`/how-works`}
            element={<Layout page={HowItWork} />}
          />
          <Route exact path={`/faq`} element={<Layout page={Faq} />} />
   

          <Route path="/login" element={<Layout page={Login} />} />
          <Route path="/signup" element={<Layout page={SignUp} />} />

          <Route path="/profile/:id" element={<Layout page={ProfilePage} />} />


        </Route>

        <Route element={<RequireAuth role="Seller" />}>
          <Route
            exact
            path={`seller/dashboard`}
            element={<Layout page={Dashboard} />}
          />
          <Route
            exact
            path={`seller/bids/:id`}
          
            element={<Layout page={Bids} />}
            Bids
          >

          </Route>

          <Route exact path={`/about`} element={<Layout page={About} />} />
          <Route exact path={`/contact`} element={<Layout page={Contact} />} />
          <Route exact path={`/blog`} element={<Layout page={Blog} />} />
          <Route exact path={`/how-works`} element={<Layout page={HowItWork} />} />
          <Route exact path={`/faq`} element={<Layout page={Faq} />} />


        </Route>

        <Route element={<RequireAuth role="Buyer" />}>
          <Route
            exact
            path={`buyer/dashboard`}
            element={<Layout page={buyerDashboard} />}
          />


          <Route exact path={`/about`} element={<Layout page={About} />} />
          <Route exact path={`/contact`} element={<Layout page={Contact} />} />
          <Route exact path={`/blog`} element={<Layout page={Blog} />} />
          <Route exact path={`/how-works`} element={<Layout page={HowItWork} />} />
          <Route exact path={`/faq`} element={<Layout page={Faq} />} />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/buyer/live-auction`}
            element={<Layout page={LiveAuction} />}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/buyer/auction-details/:id`}
            element={<Layout page={AuctionDetails}/>}
          />
        </Route>

        {/* <Route element={<RequireAuth role="Buyer" />}>
          <Route path="/admin/*" element={<AdminRoutes />} />

        </Route> */}

        {/* 
      
      <Route exact path="/" element={<MainLayout/>} />
      <Route exact path="/index2" element={<Layout2/>} />
      <Route exact path="/index3" element={<Layout3/>} />
    
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/about`}
          element={<About/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/contact`}
          element={<Contact/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/error`}
          element={<ErrorPage/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/signup`}
          element={<SignUp/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/login`}
          element={<Login/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/auction-details`}
          element={<AuctionDetails/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/dashboard`}
          element={<Dashboard/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/blog`}
          element={<Blog/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/blog-details`}
          element={<BlogDetails/>}
        />
       
    */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
// export default Root;

const children = (
  <BrowserRouter>
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  </BrowserRouter>
);

const container = document.getElementById("root");

// ReactDOM.render(children, container); // For React 17
createRoot(container).render(children); // For React 18

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
