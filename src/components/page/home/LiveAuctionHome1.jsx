import React, { useState, useEffect } from "react";

import Pagination from "../../common/Pagination";

import Select from "react-select";
import Counter from "../../common/Counter";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Table } from "@table-library/react-table-library/table";
import moment from "moment";
axios.defaults.withCredentials = true;


function LiveAuctionHome1() {

  const [allProducts, setallProducts] = useState(null);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/public/products",

        {
          withCredentials: true,
        }
      );
      setallProducts(res);
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  
  useEffect(() => {
    getAllProducts();
  }, []);

  console.log("allProducts", allProducts);

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
          <div className="row gy-4 d-flex justify-content-center">

          {allProducts == null
              ? ""
              : allProducts.data.map((product, index) => (

                product.ProductOwner==null ?"":


                  <div key={index} className="col-lg-4 col-md-6 col-sm-10">
                    <div
                      data-wow-duration="1.5s"
                      data-wow-delay="0.2s"
                      className="eg-card auction-card1 wow fadeInDown"
                    >
                      <div className="auction-img">
                        <img
                          alt="images"
                          src={product.Image}
                          className='h-[250px] object-cover'
                        />
                        <div className="auction-timer">
                          <div className="countdown" id="timer1">
                            <div className="hidden hover:display">
                          {  moment
                          .duration(
                            moment(product.BidClosingDate).diff(moment())
                          )
                          .days() + 1} Days
                          </div>
                            <h4>


                            {
                  Math.floor(((product.BidClosingDate-new Date()) % (1000 * 60)) / 1000)

                           !=0
                          ? <>
                         
                          
                       <Counter date={product.BidClosingDate} />

                          </>
                          : "Time Over"}
                              
                            </h4>
                          </div>
                        </div>

                        <Link
                            to={`${process.env.PUBLIC_URL}/profile/${product?.ProductOwner?._id}`}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                           
                          >
                        <div className="author-area">
                          <div className="author-emo">
                            <img
                              alt="images"
                              src={
                             product?.ProductOwner?.ProfilePicture
                              }
                            />
                          </div>

                          <div className="author-name">
                            <span>Owner @{product?.ProductOwner?.Name}</span>
                          </div>
                        </div>

                        </Link>
                      </div>
                      <div className="auction-content">
                        <h4>
                          <Link
                            to={`${process.env.PUBLIC_URL}/buyer/auction-details/${product?._id}`}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                          >
                            {product?.Name}
                          </Link>
                        </h4>
                        <p>
                          Bidding Price : <span>${product?.InitialPrice}</span>
                        </p>
                        <div className="auction-card-bttm">
                          <Link
                            to={`${process.env.PUBLIC_URL}/buyer/auction-details/${product?._id}`}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="eg-btn btn--primary btn--sm"
                          >
                            Place a Bid
                          </Link>
                          <div className="share-area">
                            <ul className="social-icons d-flex">
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-facebook" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-twitter" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-pinterest" />
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="bx bxl-instagram" />
                                </Link>
                              </li>
                            </ul>
                            <div>
                              <Link to={"#"} className="share-btn">
                                <i className="bx bxs-share-alt" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                
                
                )}
                
  
          </div>
          {/* <div className="row d-flex justify-content-center">
            <div className="col-md-4 text-center">
              <Link to={`${process.env.PUBLIC_URL}/live-auction`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="eg-btn btn--primary btn--md mx-auto">View All</Link>
            </div>
          </div> */}
        </div>
      </div>   
    </>
  )
}

export default LiveAuctionHome1