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
import Counter from "../../common/Counter";
import moment from "moment";
import { MagnifyingGlass ,FallingLines,MutatingDots} from 'react-loader-spinner'

function Bids() {
  const { id } = useParams();
  const [productInfo, setproductInfo] = useState(null);
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
      console.log("res", res);
      setproductInfo(res.data);
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  const acceptBid = async (bidderId, soldPrice) => {
    try {
      const res = await axios.post(
        "http://localhost:3500/seller/acceptBid",
        {
          ID: bidderId,
          ProductID: id,
          SoldPrice: soldPrice,
        },

        {
          withCredentials: true,
        }
      );
      getproductInfo()

      Swal.fire("Bid Accepted Sucessfully", "You have sold the item", "success");
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  useEffect(() => {
    getproductInfo();
    console.log("productInfo", productInfo);
  }, []);
  return (
    <>
      <div className="m-[100px]">
        <div className="table-title-area">
          <h3>All Bids </h3>
          {/* <select id="order-category">
            <option value={"01"}>Show: Last 05 Order</option>
            <option value={"02"}>Show: Last 03 Order</option>
            <option value={"03"}>Show: Last 15 Order</option>
            <option value={"04"}>Show: Last 20 Order</option>
          </select> */}
        </div>

        <div className="table-wrapper">
         
              {productInfo == null || productInfo.Bids.length==0
                ? 
                
                <div className="text-xl h-[300px] flex flex-col items-center justify-center  text-green-700 text-center">
<MutatingDots 
  height="100"
  width="100"
  color="#4fa94d"
  secondaryColor= '#4fa94d'
  radius='12.5'
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
 /> 
<div className="flex mt-2">

                No bids currently found  
</div>
                
                
                </div>

                : 
                <table className="eg-table order-table table mb-0">
                <thead>
                  <tr>
                    <th>-</th>
                    <th>Bidder</th>
    
                    <th>Bid Amount(USD)</th>
    
                    <th>Status</th>
                    <th>Date</th>
                    <th>Accept</th>
                  </tr>
                </thead>
                <tbody>
               { productInfo?.Bids.map((bid, index) => (
                    <tr>
                      <td data-label="Image">
                        <img
                          alt="images"
                          src={bid.Bidder.ProfilePicture}
                          className="img-fluid"
                        />
                      </td>

                      <td data-label="Title">{bid.Bidder.Name}</td>

                      <td data-label="Bid Amount(USD)">{bid.Amount}$</td>
                      <td data-label="Status" className="text-green">
                        {" "}
                        {productInfo.IsSold ? "Sold" : "Pending"}{" "}
                      </td>
                      <td data-label="date">
                        {moment(` ${bid.Date}`).format("MMM Do YYYY, h:mm a")}
                      </td>

                      <td data-label="Action">
                       { productInfo.IsSold?"-": <button
                          onClick={() => acceptBid(bid.Bidder._id, bid.Amount)}
                          className="eg-btn action-btn green"
                        >
                          <img
                            alt="perchesImage"
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/aiction-icon.svg"
                            }
                          />
                        </button>}
                      </td>
                    </tr>
                    ))}
                    </tbody>
          </table>
                  }
           
        </div>

        <div className="table-pagination">
          <p>
            Total Bids:{" "}
            {productInfo == null
              ? "No Bids Currently"
              : productInfo.Bids.length}
          </p>
        </div>
      </div>
    </>
  );
}

export default Bids;
