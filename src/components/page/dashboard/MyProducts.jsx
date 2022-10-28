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

axios.defaults.withCredentials = true;

function MyProducts() {
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
  const [sellerInfo, setsellerInfo] = useState(null);
  const getsellerInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/seller/getsellerproducts",

        {
          withCredentials: true,
        }
      );

      setsellerInfo(res);
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }

    // reload();
  };

  
  useEffect(() => {
    getsellerInfo();
    console.log("sellerInfo", sellerInfo);
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

  const deleteProduct = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3500/seller/deleteproduct`,
        {
          ID: id,
        },
        {
          withCredentials: true,
        }
      );
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
      getsellerInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };

  
  return (
    <>
      <div
        className="tab-pane fade"
        id="v-pills-myproducts"
        role="tabpanel"
        aria-labelledby="v-pills-myproducts-tab"
      >
        
        {/* table title*/}
        <div className="table-title-area">
          <h3>Products List</h3>
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
                <th>Initial Bid</th>
                <th>Highest Bid</th>
              
                <th>Max Allowed Bid</th>
                <th>Status</th>
                <th>Closing Date/Time</th>
                <th>Remaining Days</th>
                <th>Open Bids</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sellerInfo?.data.Products
                ? sellerInfo.data.Products.map((i) => (
                    <tr>
                      <td data-label="">
                        <img
                          alt="dashbordImage"
                          src={i.Image}
                          className="img-fluid"
                        />
                      </td>
                      <td data-label="Bidding ID">{i.Category}</td>
                      <td data-label="Bid Amount(USD)">{i.InitialPrice}$</td>
                      <td data-label="Highest Bid">N/A</td>

                      <td data-label="Bid Amount(USD)">{i.MaxAllowedBid}$</td>
                      <td data-label="Status" className="text-green">
                        {i.IsSold ? "Sold" : "Not Sold"}
                      </td>
                      <td data-label="Bid Amount(USD)">
                        {moment(` ${i.BidClosingDate}`).format(
                          "MMM Do YYYY, h:mm a"
                        )}
                      </td>

                      <td data-label="Remaining Days">


                      {
                  Math.floor(((i.BidClosingDate-new Date()) % (1000 * 60)) / 1000)

                           !=0
                          ? <>
                          
                         <Counter date={i.BidClosingDate} />

                          </>
                          : "Time Over"}

               

                                
                      </td>

                      <td data-label="See Bids">
                      <Link
                            to={`${process.env.PUBLIC_URL}/seller/bids/${i._id}`}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }

                            className='text-green-800 hover:text-green-900'
                           
                          >
                           See Bids
                          </Link>

                          </td>

                      <td data-label="Delete">
                        <button
                          className="eg-btn action-btn"
                          onClick={() => deleteProduct(i._id)}
                        >
                          <MdOutlineDeleteOutline />
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
            Total Products:{" "}
            {sellerInfo?.data ? sellerInfo.data.Products.length : ""}{" "}
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

export default MyProducts;
