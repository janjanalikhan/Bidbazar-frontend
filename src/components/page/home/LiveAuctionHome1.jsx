import React from 'react'
import { Link } from 'react-router-dom'
import LiveAuctionCard from '../LiveAuction.jsx/LiveAuctionCard'

function LiveAuctionHome1() {
  return (
    <>
     <div className="live-auction pb-120">
        <img alt="images" src={process.env.PUBLIC_URL + "/images/bg/section-bg.png"} className="img-fluid section-bg" />
        <div className="container position-relative">
          <img alt="images" src={process.env.PUBLIC_URL + "/images/bg/dotted1.png"} className="dotted1" />
          <img alt="images" src={process.env.PUBLIC_URL + "/images/bg/dotted1.png"} className="dotted2" />
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
              <div className="section-title1">
                <h2>Live Auction</h2>
                <p className="mb-0">Explore on the world's best &amp; largest Bidding marketplace with our beautiful Bidding
                  products. We want to be a part of your smile, success and future growth.</p>
              </div>
            </div>
          </div>
          <div className="row gy-4 mb-60 d-flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc1.png"
                price="75.99"
                title="Brand New royal Enfield 250 CC For Sale"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc2.png"
                price="85.99"
                title="Wedding Special Exclusive Cupple Ring (S2022)"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc3.png"
                price="99.99"
                title="Brand New Honda CBR 600 RR For Sale (2022)"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc4.png"
                price="35.99"
                title="Toyota AIGID A Class Hatchback Sale (2017 - 2021)"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc5.png"
                price="45.99"
                title="Havit HV-G61 USB Black Double Game Pad With Vibrat"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 ">
            <LiveAuctionCard
                image="/images/bg/live-auc6.png"
                price="35.99"
                title="IPhone 11 Pro Max All Variants Available For Sale"
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-4 text-center">
              <Link to={`${process.env.PUBLIC_URL}/live-auction`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="eg-btn btn--primary btn--md mx-auto">View All</Link>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default LiveAuctionHome1