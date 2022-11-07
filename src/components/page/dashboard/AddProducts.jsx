import React, { useState } from "react";
import { useFormik } from "formik";
import { Store } from "react-notifications-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import DateTimePicker from 'react-datetime-picker'
axios.defaults.withCredentials = true;

function AddProducts() {


  const {auth, setAuth} = useAuth()
  const [openEye, setOpenEye] = useState();



  const handleEyeIcon = () => {
    if (openEye === false || openEye === 0) {
      setOpenEye(1);
    } else {
      setOpenEye(false);
    }
  };


  const [getFileBase64String, setFileBase64String] = useState("/images/blog/bid.gif");


  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    console.log("\nfile", file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      var Base64 = reader.result;
      console.log("Base64", Base64);
      setFileBase64String(Base64);
    };
  }


  const [closingDate, setClosingDate] = useState(new Date())


  function isPositiveInteger(str) {
    if (typeof str !== 'string') {
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

    if(!values.name ){
      errors.name = "Required";
    }
    if(!values.description ){
      errors.description = "Required";
    }
    if(!values.category){
      errors.category = "Required";
    }
    if(!isPositiveInteger(values.initialprice)){
      errors.initialprice = "Enter a positive number";
    }
    if(!values.location || values.name.length > 20){
      errors.location = "Required";
    }
    if(!values.bidclosingdate){
      errors.bidclosingdate = "Required";
    }

    if(getFileBase64String=="/images/blog/bid.gif"){
      errors.file = "Required";
    }
    const temp = getPriceAllowed(formik.values.category)

    if( parseInt(values.initialprice) > parseInt(temp) ){

      
      errors.initialprice = "Price less then";

    }

    return errors;
  };


  const addToDatabase = async (val) => {
    console.log("addToDatabase!", val , closingDate)
    const MaxAllowedBid =  getPriceAllowed(val.category)


    try {
      const res = await axios.post(
        "http://localhost:3500/seller/addProduct",
        {
          ProductOwnerID: auth.dbId,
          Name: val.name,
          Description: val.description,
          Category: val.category,
          InitialPrice: val.initialprice,
          MaxAllowedBid: MaxAllowedBid,
          Location: val.location ,
          BidClosingDate: closingDate,
          Image: getFileBase64String,
        },
        {
          withCredentials: true,
        }
      );

      Swal.fire("Product added successfully", "Product has been added successfully", "success");

    }
    catch (e) {
      // setErrorModal(true)
      
      if (e.response.status == "409")
        Swal.fire("Product already exists", "Please enter new name", "error");
      else Swal.fire(e.code, "Please try again", "error");


    }

    // reload();
  };



  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      initialprice: "",
      location: "",
     bidclosingdate: new Date(),
  
     file:""

    },
    // eslint-disable-next-line no-unused-vars
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values ));
      console.log("getFileBase64String", getFileBase64String);

      addToDatabase(values);
    },
  });

  const [priceallowed, setPriceallowed] = useState("")

  const getPriceAllowed = (e) => {
    if(e=="Appliances") return "12000"
    else if(e=="Apps & Games") return "11000"
    else if(e=="Arts, Crafts, & Sewing") return "10000"
    else if(e=="Books") return "100000"
    else if(e=="Clothing, Shoes and Jewelry") return "80000"
    else if(e=="Collectibles & Fine Art") return "70000"
    else if(e=="Computers") return "50000"
    else if(e=="Electronics") return "75000"
    else if(e=="Handmade") return "120000"
    else if(e=="Health, Household") return "200000"
    else if(e=="Home & Kitchen") return "200000"
    
  
  }

  
  return (
    <>
      <div
        className="tab-pane fade"
        id="v-pills-addproducts"
        role="tabpanel"
        aria-labelledby="v-pills-addproducts-tab"
      >
        <div className="dashboard-profile">
          <div className="owner">
            <div className="image">
              <img
                alt="images"
                className="border-2 object-contain "
                src={getFileBase64String}
              />
            </div>
            <div className="content">
              <h3>Product for Bid</h3>
              <p className="para">
                Enter product details to add it to your bid collection
              </p>
            </div>
          </div>
          <div className="form-wrapper">
            <form action="#">
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Name *</label>
                    <input
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="Name"
                    />
                    {formik.errors.name == null && formik.values.name != "" ? (
                      <span className="text-green-600 text-xs">
                        Looks good!
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-red-600 text-xs">
                      {formik.errors.name}
                    </span>
                  </div>

                  
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Description *</label>
                    <input
                      id="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      placeholder="Description"
                    />
                    {formik.errors.description == null &&
                    formik.values.description != "" ? (
                      <span className="text-green-600 text-xs">
                        Looks good!
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-red-600 text-xs">
                      {formik.errors.description}
                    </span>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <label>Category *</label>
                  <select
                    id="category"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    <option value="">Select Category </option>

                    <option value="Appliances">Appliances </option>
                    <option value="Apps & Games">Apps & Games</option>
                    <option value="Arts, Crafts, & Sewing">
                      Arts, Crafts, & Sewing{" "}
                    </option>

                    <option value="Books">Books </option>
                    <option value="Cell Phones & Accessories">
                      Accessories{" "}
                    </option>
                    <option value="Clothing, Shoes and Jewelry">
                      Clothing
                    </option>
                    <option value="Collectibles & Fine Art">Jewelry</option>
                    <option value="Computers">Computers </option>
                    <option value="Electronics">Electronics </option>
                    <option value="Handmade">Handmade </option>
                    <option value="Health, Household">
                      Health, Household{" "}
                    </option>
                    <option value="Home & Kitchen">Home & Kitchen </option>
                  </select>
                  {formik.errors.category == null &&
                  formik.values.category != "" ? (
                    <span className="text-green-600 text-xs">Great!</span>
                  ) : (
                    ""
                  )}
                  <span className="text-red-600 text-xs">
                    {formik.errors.category}
                  </span>
                </div>

                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Location *</label>
                    <input
                      id="location"
                      onChange={formik.handleChange}
                      value={formik.values.location}
                      placeholder="Description"
                    />
                    {formik.errors.location == null &&
                    formik.values.location != "" ? (
                      <span className="text-green-600 text-xs">
                        Looks good!
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-red-600 text-xs">
                      {formik.errors.location}
                    </span>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-12 col-md-3">
                  <div className="form-inner">
                    <label>Initial Price *</label>
                    <input
                      id="initialprice"
                      onChange={formik.handleChange}
                      value={formik.values.initialprice}
                      placeholder="Initial Price"
                    />
                    {formik.errors.initialprice == null &&
                    formik.values.initialprice != "" ? (
                      <span className="text-green-600 text-xs">
                        Looks good!
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-red-600 text-xs">
                      {formik.errors.initialprice}
                    </span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-12 col-md-3">



                <div className="form-inner">
                    <label>Price Allowed $$$ *</label>
             <div>
              {getPriceAllowed(formik.values.category)}
             </div>
          
                  </div>


                </div>


                <div className="col-xl-6  col-lg-12 col-md-6">
                  <div className="form-inner flex flex-col">
                    <label>Bid Closing Date/Time *</label>
                   
                    <DateTimePicker id="bidclosingdate"  onChange={setClosingDate} value={closingDate} />


                  </div>
                </div>




                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Choose image *</label>
                    <input
                      required
                      type="file"
                      id="file"
                      onChange={(e) => {
                        encodeFileBase64(e.target.files[0]);
                      }}

                     
                   
                    />
                    {formik.errors.file == null && formik.values.file != "" ? (
                      <span className="text-green-600 text-xs">
                        Looks good!
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-red-600 text-xs">
                      {formik.errors.file}
                    </span>
                  </div>
                </div>

             

         



                <div className="col-12">
                  <div className="button-group">
                    <button 
                    
                     className="eg-btn profile-btn"
                 
                     onClick={formik.handleSubmit}
                     >
                      
                      Add Product
                    </button>
                    <button className="eg-btn cancel-btn">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProducts;
