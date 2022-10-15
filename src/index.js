import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/App";
import { createRoot } from "react-dom/client"; // For React 18
import MainLayout from "./components/layout/MainLayout";
import Contact from "./components/page/contact/Contact";
import ErrorPage from "./components/page/error/ErrorPage";
import SignUp from "./components/page/signUp/SignUp";
import Faq from "./components/page/faq/Faq";
import "./index.css"
import Login from "./components/page/login/Login";
import AuctionDetails from "./components/page/auctionDetails/AuctionDetails";
import Dashboard from "./components/page/dashboard/Dashboard";
import Blog from "./components/page/blog/Blog";
import BlogDetails from "./components/page/BlogDetails/BlogDetails";
import LiveAuction from "./components/page/LiveAuction.jsx/LiveAuction";
import HowItWork from "./components/page/howItWork/HowItWork";
import About from "./components/page/about/About";
import Layout2 from "./components/layout/Layout2";
import Layout3 from "./components/layout/Layout3";
import Merchant from "./components/page/joinMerchant/Merchant";


//Default Warniing Error Hide
// console.log = console.warn = console.error = () => {};

/*
=>version : 0.1
=>Event : Rendering al content to web
=>Action: define all routes and page
@return HTML
*/




const  Root = () =>{
  return <>

    <Routes>
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
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/live-auction`}
          element={<LiveAuction/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/how-works`}
          element={<HowItWork/>}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/faq`}
          element={<Faq/>}
        /> 
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/join-merchant`}
          element={<Merchant/>}
        /> 
    
    </Routes>

</>
}
// export default Root;

const children = (
  <BrowserRouter>

      <Root />

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
