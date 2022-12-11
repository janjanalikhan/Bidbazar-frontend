import React from "react";
import ContentOfDashboardTab from "./ContentOfDashboardTab";
import AddProducts from "./AddProducts";
import ContentOfOrder from "./ContentOfOrder";
import ContentOfProfile from "./ContentOfProfile";
import ToBeShipped from "./ToBeShipped";
import Shipped from "./Shipped"
import Users from "./Users"
import DeshbordMenu from "./DashboardMenu";
import MyProducts from "./MyProducts";


function DashbordWrap() {
  return (
    <>
      <div className="dashboard-section pt-120 pb-120">
        <img
          alt="images"
          src={process.env.PUBLIC_URL + "/images/bg/section-bg.png"}
          className="img-fluid section-bg-top"
        />
        <img
          alt="images"
          src={process.env.PUBLIC_URL + "/images/bg/section-bg.png"}
          className="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row g-4">
            <DeshbordMenu />
            <div className="col-lg-9">
              <div className="tab-content" id="v-pills-tabContent">

{/* 
                <ContentOfDashboardTab /> */}
                {/* <AddProducts />
                <MyProducts/>
               */}


                {/* <ContentOfProfile />
                <ContentOfOrder /> */}


                <ToBeShipped />
                <Shipped />
                <Users/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashbordWrap;
