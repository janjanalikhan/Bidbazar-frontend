import AuctionDetailsInfo from "./AuctionDetailsInfo";
import AuctionDetailsTab from "./AuctionDetailsTab";

import React, { useState, useEffect, useRef } from "react";
import Pagination from "../../common/Pagination";
import { useFormik } from "formik";
import Select from "react-select";
import Counter from "../../common/Counter";
import ClosedBtn from "../../common/ClosedBtn";
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
import { Store } from "react-notifications-component";
axios.defaults.withCredentials = true;

function AuctionDetailsWrap({socket}) {
 

  const { id } = useParams();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [allProducts, setallProducts] = useState(null);
  const [productInfo, setproductInfo] = useState(null);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const getproductInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3500/common/product",
        {
          ID: id,
        },

        {
          withCredentials: true,
        }
      );
      setproductInfo(res.data);
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/common/products",

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
    getproductInfo();
    getAllProducts();
  }, []);

  const addToDatabase = async (val) => {
    console.log(
      "addToDatabase!",
      val.bidamount,
      "Bidder :",
      auth.dbId,
      new Date(),
      productInfo._id
    );

    try {
      const res = await axios.post(
        "http://localhost:3500/buyer/placebid",
        {
          BidderID: auth.dbId,
          ProductID: productInfo._id,
          BidAmount: val.bidamount,
        },
        {
          withCredentials: true,
        }
      );
      getproductInfo();
      Swal.fire(
        "Bid Placed successfully",
        "Bid has been placed successfully",
        "success"
      );
      Store.addNotification({
        title: "Bid Placed successfully",
        message: `${val.bidamount}$ bid has been placed`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } catch (e) {
      // setErrorModal(true)

      if (e.response.status == "409")
        Swal.fire("Product already exists", "Please enter new name", "error");
      else Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  function isPositiveInteger(str) {
    if (typeof str !== "string") {
      return false;
    }

    const num = Number(str);

    if (Number.isInteger(num) && num > 0) {
      return true;
    }

    return false;
  }
  const validate = (values) => {
    const errors = {};

    if (!values.bidamount) {
      errors.bidamount = "Required";
    }
    if (!isPositiveInteger(values.bidamount)) {
      errors.bidamount = "Enter a positive number";
    }

    if (parseInt(values.bidamount) < parseInt(productInfo.InitialPrice)) {
      errors.bidamount = "Enter amount greater then initial price";
    }

    if (parseInt(values.bidamount) > parseInt(productInfo.MaxAllowedBid)) {
      errors.bidamount = "Enter amount less then Max Allowed Bid";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      bidamount: "",
    },
    // eslint-disable-next-line no-unused-vars
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values));
      //console.log("getFileBase64String", getFileBase64String);

      addToDatabase(values);
    },
  });

  const [index, setIndex] = useState(0);


  return (
    <>
      {productInfo == null ? (
        "Do not exsist"
      ) : (
        <div className="auction-details-section pt-120 pb-120">
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
            <div className="row g-4 mb-50">
              <div className="col-xl-5 col-lg-7 d-flex flex-row  align-items-start   justify-content-center flex-md-nowrap flex-wrap gap-4">
                <div
                  className="tab-content  mb-4 d-flex justify-content-lg-start justify-content-center    wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".4s"
                >
                  <div
                    className="tab-pane  big-image fade show active justify-center items-center   "
                    id="gallery-img1"
                  >
                    <div className="auction-gallery-timer  d-flex align-items-center justify-content-center  flex-wrap">
                      <h3 id="countdown-timer-1 ">
                        {productInfo.IsSold ? (
                          "Sold"
                        ) : Math.floor(
                            ((productInfo.BidClosingDate - new Date()) %
                              (1000 * 60)) /
                              1000
                          ) != 0 ? (
                          <>
                            <Counter date={productInfo.BidClosingDate} />
                          </>
                        ) : (
                          "Time Over"
                        )}
                      </h3>
                    </div>
                    <img
                      alt="images"
                      src={productInfo.Image}
                      className="  h-[350px]  w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5">
                <div
                  className="product-details-right  wow fadeInDown"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <h3>{productInfo.Name}</h3>
                  <p className="para">{productInfo.Description}</p>
                  <h4>
                    Bidding Initial Price:{" "}
                    <span>${productInfo.InitialPrice}</span>
                  </h4>
                  <div className="bid-form">
                    <div className="form-title">
                      <h5>Bid Now</h5>
                      <div className="flex gap-1 ">
                        <p>
                          Minimum Bid{" "}
                          <strong className="text-green-600 hover:text-green-900">
                            ${productInfo.InitialPrice}
                          </strong>{" "}
                          |
                        </p>
                        <p>
                          Maximum Allowed Bid{" "}
                          <strong className="text-green-600 hover:text-green-900">
                            ${productInfo.MaxAllowedBid}
                          </strong>
                        </p>
                      </div>
                    </div>

                    {new Date(productInfo.BidClosingDate) < new Date() ? (
                      <div className="form-inner gap-2">
                        <input disabled type="text" placeholder="$00.00" />
                        <button
                          disabled
                          className="eg-btn btn--primary btn--sm"
                        >
                          Closed
                        </button>
                      </div>
                    ) : productInfo.IsSold ? (
                      <h3 id="countdown-timer-1 ">
                        Sold at{" "}
                        <span className="text-green-700 hover:text-green-900">
                          ${productInfo.SoldPrice}
                        </span>
                      </h3>
                    ) : (
                      <form>
                        <div className="form-inner gap-2">
                          <input
                            type="text"
                            placeholder="$00.00"
                            id="bidamount"
                            onChange={formik.handleChange}
                            value={formik.values.bidamount}
                          />

                          {formik.errors.bidamount == null &&
                          formik.values.bidamount != "" ? (
                            <span className="text-green-600 text-xs">
                              Looks good!
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="text-red-600 text-xs">
                            {formik.errors.bidamount}
                          </span>

                          <div
                            className="eg-btn btn--primary btn--sm bg-black cursor-pointer"
                            onClick={() => {
                              formik.handleSubmit()
                            
                            }}
                            // type="submit"
                          >
                            Place Bid
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center g-4">
              <div className="col-lg-8">
                <ul
                  className="nav nav-pills d-flex flex-row justify-content-start gap-sm-4 gap-3 mb-45 wow fadeInDown"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active details-tab-btn"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Bidding Policy{" "}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link details-tab-btn"
                      id="pills-bid-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-bid"
                      type="button"
                      role="tab"
                      aria-controls="pills-bid"
                      aria-selected="false"
                    >
                      Biding History
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link details-tab-btn"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Other Auction
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="describe-content">
                      <h4>Read the policy carefully</h4>
                      <p className="para">
                        When bidding procedures are used, bids shall be
                        advertised appropriately. Suppliers shall be invited to
                        have their names placed on mailing lists to receive
                        invitations to bid. When specifications are prepared,
                        they will be mailed to all merchants and firms who have
                        indicated an interest in bidding. All bids must be
                        submitted in sealed envelopes, addressed to the Board,
                        and plainly marked with the name of the bid and the time
                        of the bid opening. Bids shall be opened at the time
                        specified and all bidders and other persons shall be
                        invited to be present.
                      </p>

                      <ul className="describe-list">
                        <li>
                          <Link to={"#"}>
                            Whether your bid was successful or not, always
                            request feedback to support continual improvement
                            for the next bidding process
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"}>
                            Read the product description carefully
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"}>
                            Company will not be reesponsible for the product
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-bid"
                    role="tabpanel"
                    aria-labelledby="pills-bid-tab"
                  >
                    <div className="bid-list-area">
                      <ul className="bid-list">
                        {productInfo.Bids.length == 0 ? (
                          <div className="text-xl h-[300px] flex  items-center justify-center  text-green-700 text-center">
                            No bids currently placed
                          </div>
                        ) : (
                          productInfo.Bids.map((bid, index) => (
                            <li>
                              <div className="row d-flex align-items-center">
                                <div className="col-7">
                                  <div className="bidder-area">
                                    <div className="bidder-img ">
                                      <img
                                        alt={"none"}
                                        src={bid.Bidder.ProfilePicture}
                                        style={{
                                          height: "55px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                    </div>

                                    <div className="bidder-content">
                                      <Link to={"#"}>
                                        <h6>{bid.Bidder.Name}</h6>
                                      </Link>
                                      <p>${bid.Amount}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-5 text-end">
                                  <div className="bid-time">
                                    <p>{moment(bid.Date).fromNow()}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>

                      <br></br>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div className="row d-flex justify-content-center">
                      <div className="row gy-4 mb-60 d-flex justify-content-center">
                        {allProducts == null ? (
                          <div className="text-xl h-[300px] flex  items-center justify-center  text-green-700 text-center">
                            No products curently added
                          </div>
                        ) : (
                          allProducts.data.map((product, i) =>
                            index > 2 ? (
                              ""
                            ) : product.IsSold ? (
                              ""
                            ) : (
                              <div
                                key={index}
                                className="col-lg-4 col-md-6 col-sm-10"
                              >
                                <div
                                  data-wow-duration="1.5s"
                                  data-wow-delay="0.2s"
                                  className="eg-card auction-card1 wow fadeInDown"
                                >
                                  <div className="auction-img">
                                    <img
                                      alt="images"
                                      src={product.Image}
                                      className="h-[250px] object-cover"
                                    />
                                    <div className="auction-timer">
                                      <div className="countdown" id="timer1">
                                        <div className="hidden hover:display">
                                          {moment
                                            .duration(
                                              moment(
                                                product.BidClosingDate
                                              ).diff(moment())
                                            )
                                            .days() + 1}{" "}
                                          Days
                                        </div>
                                        <h4>
                                          {Math.floor(
                                            ((product.BidClosingDate -
                                              new Date()) %
                                              (1000 * 60)) /
                                              1000
                                          ) != 0 ? (
                                            <>
                                              <Counter
                                                date={product.BidClosingDate}
                                              />
                                            </>
                                          ) : (
                                            "Time Over"
                                          )}
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="author-area">
                                      <div className="author-emo">
                                        <img
                                          alt="images"
                                          src={
                                            product.ProductOwner.ProfilePicture
                                          }
                                        />
                                      </div>
                                      <div className="author-name">
                                        <span>
                                          Owner @{product.ProductOwner.Name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="auction-content">
                                    <h4>
                                      <button
                                        onClick={() => {
                                          navigate(
                                            `/buyer/auction-details/${product._id}`,
                                            { replace: true }
                                          );
                                          window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                          });
                                          getproductInfo();
                                          getAllProducts();
                                        }}
                                      >
                                        {product.Name}
                                      </button>
                                    </h4>
                                    <p>
                                      Bidding Price :{" "}
                                      <span>${product.InitialPrice}</span>
                                    </p>
                                    <div className="auction-card-bttm">
                                      <button
                                        onClick={() => {
                                          navigate(
                                            `/buyer/auction-details/${product._id}`,
                                            { replace: true }
                                          );
                                          window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                          });
                                          getproductInfo();
                                          getAllProducts();
                                        }}
                                        className="eg-btn btn--primary btn--sm"
                                      >
                                        Place a Bid
                                      </button>
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
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog-sidebar">
                  <div
                    className="sidebar-banner wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay="1s"
                  >
                    <span>Cars</span>
                    <h3>Toyota AIGID A Clasis Cars Sale</h3>
                    <Link
                      onClick={() => window.open("https://toyota-highway.com/")}
                      className="eg-btn btn--primary card--btn"
                    >
                      Google Ad
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuctionDetailsWrap;
