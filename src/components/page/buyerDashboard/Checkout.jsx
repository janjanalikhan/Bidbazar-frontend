import React, { useState, useEffect } from "react";

import axios from "axios";

import Swal from "sweetalert2";
import { useParams } from "react-router-dom";


const Checkout = () => {

    const { SellerID,ProductID,SoldPrice } = useParams();

    const changeFromDatabase = async () => {
        try {
          await axios.post(
            "http://localhost:3500/buyer/changeFromDatabase",
            {
              SellerID: SellerID,
              ProductID: ProductID,
              SoldPrice: SoldPrice,
            },
    
            {
              withCredentials: true,
            }
          )
         
        } catch (e) {
          Swal.fire(e.code, "Please try again", "error");
        }
    
        // reload();
      };

      useEffect(() => {
        changeFromDatabase();
     
      }, []);




  return (
    <div className="flex flex-col justify-content items-center mt-20 mb-20">
      <h2 className="text-2xl text-green-600 mt-">Checkout Successful!</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your product status at your products for confirmation.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>customers@bidbazar.com</strong>
      </p>
    </div>
  )
}

export default Checkout
