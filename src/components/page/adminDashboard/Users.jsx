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

function Users() {
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
  const [buyerInfo, setbuyerInfo] = useState(null);
  const getSellersInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/getsellers",

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

  const getBuyersInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3500/admin/getbuyers",

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
    getSellersInfo();
    getBuyersInfo()
    console.log("sellerInfo", sellerInfo);
    console.log("buyerInfo", buyerInfo);
  }, []);

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
      getSellersInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };

  const deleteSeller = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3500/admin/deleteSeller`,
        {
          SellerID: id,
        },
        {
          withCredentials: true,
        }
      );
      Swal.fire("Delete!", "Seller has been removed", "success");
      getSellersInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };


  const deleteBuyer = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3500/admin/deleteBuyer`,
        {
          BuyerID: id,
        },
        {
          withCredentials: true,
        }
      );
      Swal.fire("Delete!", "Buyer has been removed", "success");
      getSellersInfo();
    } catch (e) {
      Swal.fire(e.code, "Please try again", "error");
    }
  };


  return (
    <>
      <div
        className="tab-pane fade"
        id="v-pills-Users"
        role="tabpanel"
        aria-labelledby="v-pills-Users-tab"
      >
        {/* table title*/}
        <div className="table-title-area">
          <h3>Sellers</h3>
      
        </div>
        {/* table */}
        <div className="table-wrapper">
          <table className="eg-table order-table table mb-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Products</th>
                <th>Location</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sellerInfo?.data
                ? sellerInfo.data.map((i) => (
                    <tr>
                      <td data-label="">
                        <img
                          alt="dashbordImage"
                          src={i.ProfilePicture}
                          className="img-fluid"
                        />
                      </td>
                      <td data-label="Name">{i.Name}</td>
                      <td data-label="Email">{i?.Email}</td>
                      <td data-label="PhoneNumber">+{i?.PhoneNumber}</td>
                      <td data-label="Totals Products">{i?.Products.length}</td>

                      <td data-label="Country">{i?.Country}</td>

                      <td data-label="Action">
                        <button
                          onClick={() => deleteSeller(i._id)}
                          className="eg-btn action-btn green p-3 text-white hover:bg-black"
                        >
                          Delete
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
            Total Sellers: {sellerInfo?.data ? sellerInfo.data.length : ""}{" "}
          </p>
        </div>
   
      {/* table title*/}
      <div className="table-title-area">
        <h3 className="mt-6">Buyers</h3>
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
              <th>Email</th>
              <th>Phone Number</th>
              <th>Bought Products</th>
              <th>Location</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyerInfo?.data
              ? buyerInfo.data.map((i) => (
                  <tr>
                    <td data-label="">
                      <img
                        alt="dashbordImage"
                        src={i.ProfilePicture}
                        className="img-fluid"
                      />

                    </td>
                    <td data-label="Name">{i.Name}</td>
                    <td data-label="Email">{i?.Email}</td>
                    <td data-label="PhoneNumber">+{i?.PhoneNumber}</td>
                    <td data-label="Bought Products">{i?.BoughtProducts?.length}</td>

                    <td data-label="Country">{i?.Country}</td>

                    <td data-label="Action">
                      <button
                        onClick={() => deleteBuyer(i._id)}
                        className="eg-btn action-btn green p-3 text-white hover:bg-black"
                      >
                        Delete
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
        <p>Total Buyers: {buyerInfo?.data ? buyerInfo?.data?.length : ""} </p>
      </div>
      </div>

    </>
  );
}

export default Users;
