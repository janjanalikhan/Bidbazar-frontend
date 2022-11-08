import React, { useState, useEffect } from "react";

import Select from "react-select";
import { orderListOptions } from "../../../data/data";
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

function PaymentsToBeMade() {
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#EEEEEE",
      padding: 0,
      "&:hover": { borderColor: "#32c36c" },
      boxShadow: state.isFocused ? null : null,
    }),
  };
  const [buyerInfo, setbuyerInfo] = useState(null);
  const getbuyerInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/buyer/getbuyerproducts",
  
        {
          withCredentials: true,
        }
      );
  
      setbuyerInfo(res);
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  
    // reload();
  };
  
  useEffect(() => {
    getbuyerInfo();
    console.log("buyerInfo", buyerInfo);
  }, []);

  const formatTime = (duration) => {
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration % 3600) / 60);
    var seconds = duration % 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };


  const acceptBid = async (buyerID, ProductID, soldPrice,SellerID) => {
    try {
      await axios.post(
        "http://localhost:3500/buyer/checkout",
        {
            SellerID: SellerID,
          BuyerID: buyerID,
          ProductID: ProductID,
          SoldPrice: soldPrice,
        },

        {
          withCredentials: true,
        }
      ).then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
          

        }
      })
      .catch((err) => console.log(err.message));


     
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };


  return (
    <>
      <div
        className="tab-pane fade"
        id="v-pills-payments"
        role="tabpanel"
        aria-labelledby="v-pills-payments-tab"
      >
        {/* table title*/}
        <div className="table-title-area">
          <h3>Payments To Be Made</h3>
          {/* <Select
            placeholder="filer order"
            valueContainer="select"
            options={orderListOptions}
            styles={customStyle}
          /> */}
        </div>
        {/* table */}
        <div className="table-wrapper">
          <table className="eg-table order-table table mb-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Initial Bid(USD)</th>
          
                <th>Accepted Bid Price</th>

                <th>Payment</th>
           
           
              


              

              </tr>
            </thead>
            <tbody>
              {buyerInfo?.data.ProductsPaymentsToClear
                ? buyerInfo.data.ProductsPaymentsToClear.map((i) =>

                i.IsSold?"":


                
                (
                    <tr>
                      <td data-label="">
                        <img
                          alt="dashbordImage"
                          src={i.Image}

                          className="img-fluid"
                        />
                      </td>
                      <td data-label="Bidding ID">{i.Category}</td>
                      <td data-label="Bid Amount(USD)">${i.InitialPrice}</td>
                  
                      <td data-label="Accepted Bid Price">${i.AcceptedBidPrice}</td>
                  
                      <td data-label="Action">
                     
                        <button
                          onClick={() => acceptBid(i.Buyer, i._id ,i.AcceptedBidPrice , i.ProductOwner._id)}
                          className="eg-btn action-btn green p-3 text-white hover:bg-black"
                        >
                          Pay Now
                        </button>
                    
                    </td>
                     

                  
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
        {/* pagination area */}
        <div className="table-pagination">
          <p>
            Total Payments made till now:{" "}
            {buyerInfo?.data ? buyerInfo.data.ProductsPaymentsToClear.length : ""}{" "}
          </p>

          {/* <nav className="pagination-wrap">
            <ul className="pagination style-two d-flex justify-content-center gap-md-3 gap-2">
              <li className="page-item">
                <Link className="page-link" to={"#"} tabIndex={-1}>
                  Prev
                </Link>
              </li>
              <li className="page-item active" aria-current="page">
                <Link className="page-link" to={"#"}>
                  01
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to={"#"}>
                  02
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to={"#"}>
                  03
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to={"#"}>
                  Next
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </>
  );
}

export default PaymentsToBeMade;
