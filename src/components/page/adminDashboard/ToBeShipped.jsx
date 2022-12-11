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

function ToBeShipped() {
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
  const getadminInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/getadminproducts",

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
    getadminInfo();
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
      getadminInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };

  const shipped = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3500/admin/shipped`,
        {
          ProductID: id,
        },
        {
          withCredentials: true,
        }
      );
      Swal.fire("Shipped!", "Your product has been marked shipped.", "success");
      getadminInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-tobeshipped"
        role="tabpanel"
        aria-labelledby="v-pills-tobeshipped-tab"
      >
        {/* table title*/}
        <div className="table-title-area">
          <h3>To Be Shipped Products</h3>
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
                <th>Name</th>
                <th>Category</th>
                <th>Buyer Name</th>
                <th>Sold Price</th>
                <th>Location</th>

                <th>Mark Shipped</th>
              </tr>
            </thead>
            <tbody>
              {sellerInfo?.data.ToBeShipped
                ? sellerInfo.data.ToBeShipped.map((i) => (
                    <tr>
                      <td data-label="">
                        <img
                          alt="dashbordImage"
                          src={i.Image}
                          className="img-fluid"
                        />
                      </td>
                      <td data-label="Product Name">{i.Name}</td>
                      <td data-label="Bidding Category">{i.Category}</td>
                      <td data-label="Buyer Name">{i.ProductOwner.Name}</td>
                      <td data-label="Bid Amount(USD)">{i.SoldPrice}$</td>

                      <td data-label="Location">{i.Location}</td>

                      <td data-label="Action">
                        <button
                          onClick={() => shipped(i._id)}
                          className="eg-btn action-btn green p-3 text-white hover:bg-black"
                        >
                          Shipped
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
            {sellerInfo?.data ? sellerInfo.data.ToBeShipped.length : ""}{" "}
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

export default ToBeShipped;
