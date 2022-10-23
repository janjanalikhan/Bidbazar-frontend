import React, { useState } from "react";

import { useFormik } from "formik";
import { Store } from "react-notifications-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";

function SignUpWrap() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)

  const showNotification = () => {
    Store.addNotification({
      title: "Thanks for signing up!",
      message: `${formik.values.email} has been signup`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });

    Swal.fire({
      title: "Thanks for signing up!",
      text: "Now you can login",
      icon: "success",
      confirmButtonText: "Sign In",
    });

    navigate("/login", { replace: true });
  };
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
  const addToDatabase = async (val) => {
    console.log("addToDatabase Fun" + val);

    // const PhoneNumber = val.phonenumber;
    // const Gender = val.gender;
    // const Designation = val.designation;
    // const isSupervisor = true;
    // const isCommittee = false;
    // const ProfilePicture = getFileBase64String;

    try {
      await axios.post("http://localhost:3500/signup", {
        Name: val.name,
        Email: val.email,
        Password: val.password,
        PhoneNumber: val.phonenumber,
        Addres: val.address,
        Country: val.country,
        Role: val.role,
        ProfilePicture: getFileBase64String,
      });
      showNotification();
      setRefresh(!refresh)
    } catch (e) {
      console.log(e);

      if (e.response.status == "409")
        Swal.fire("Email already exists", "Please try again", "error");
      else Swal.fire(e.code, "Please try again", "error");
    }

    
  };

  function isEmail(val) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
  }

  function isPhoneNumber(val) {
    return /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(val);
  }

  function isPassword(val) {
    return /^.{4,15}$/.test(val);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!isPhoneNumber(values.phonenumber)) {
      errors.phonenumber = "Phone Number not valid";
    }

    if (!isEmail(values.email)) {
      errors.email = "Email not valid";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.address) {
      errors.address = "Required";
    }

    if (!values.country) {
      errors.country = "Required";
    }

    if (!values.role) {
      errors.role = "Required";
    }
    if (!values.agree) {
      errors.agree = "Required";
    }

    if(getFileBase64String=="/images/blog/bid.gif"){
      errors.file = "Required";
    }

    // else if (values.designation.length > 15) {
    //   errors.designation = 'Must be 15 characters or less';
    // }

    // if (!values.gender) {
    //   errors.gender = 'Required';
    // }

    // if (!isPassword(values.password)) {
    //   errors.password = 'Password not valid. Must have 4-15 characters';

    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phonenumber: "",
      password: "",
      email: "",
      address: "",
      country: "",
      role: "",
      agree: "",
      file:""
     
    },
    // eslint-disable-next-line no-unused-vars
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values));

      addToDatabase(values);
    },
  });

  return (
    <>
      <div className="signup-section pt-120 pb-120">
        <img
          alt="images"
          src={process.env.PUBLIC_URL + "/images/bg/section-bg.png"}
          className="section-bg-top"
        />
        <img
          alt="images"
          src={process.env.PUBLIC_URL + "/images/bg/section-bg.png"}
          className="section-bg-bottom"
        />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <div className="form-title">
                  <h3>Sign Up</h3>
                  <p>
                    Do you already have an account?{" "}
                    <Link
                      to={`${process.env.PUBLIC_URL}/login`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Log in here
                    </Link>
                  </p>
                </div>
                <form className="w-100">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Name *</label>
                        <input
                          id="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder="Full Name"
                        />
                        {formik.errors.name == null &&
                        formik.values.name != "" ? (
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

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Phone Number *</label>
                        <input
                          id="phonenumber"
                          onChange={formik.handleChange}
                          value={formik.values.phonenumber}
                          type="tel"
                          placeholder="Phone Number"
                        />
                        {formik.errors.phonenumber == null &&
                        formik.values.phonenumber != "" ? (
                          <span className="text-green-600 text-xs">
                            Looks good!
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-red-600 text-xs">
                          {formik.errors.phonenumber}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Email *</label>
                        <input
                          id="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          type="email"
                          placeholder="Email"
                        />
                        {formik.errors.email == null &&
                        formik.values.email != "" ? (
                          <span className="text-green-600 text-xs">
                            Looks good!
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-red-600 text-xs">
                          {formik.errors.email}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Password *</label>
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          type={openEye === 1 ? "password" : "text"}
                          name="password"
                          id="password"
                          placeholder="Create A Password"
                        />
                        {formik.errors.password == null &&
                        formik.values.password != "" ? (
                          <span className="text-green-600 text-xs">
                            Looks good!
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-red-600 text-xs">
                          {formik.errors.password}
                        </span>
                        <i
                          className={
                            openEye === 1
                              ? "bi bi-eye-slash"
                              : "bi bi-eye-slash bi-eye"
                          }
                          onClick={handleEyeIcon}
                          id="togglePassword"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Address *</label>
                        <input
                          id="address"
                          onChange={formik.handleChange}
                          value={formik.values.address}
                          placeholder="Address"
                        />
                        {formik.errors.address == null &&
                        formik.values.address != "" ? (
                          <span className="text-green-600 text-xs">
                            Looks good!
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-red-600 text-xs">
                          {formik.errors.address}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Country *</label>
                        <input
                          id="country"
                          onChange={formik.handleChange}
                          value={formik.values.country}
                          placeholder="Country"
                        />
                        {formik.errors.country == null &&
                        formik.values.country != "" ? (
                          <span className="text-green-600 text-xs">
                            Looks good!
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="text-red-600 text-xs">
                          {formik.errors.country}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6  ">
                      <label>Are you seller/buyer? *</label>
                      <select
                        id="role"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                      >
                        <option defaultValue="">Select Seller or Buyer </option>
                        <option value="Seller">Seller</option>
                        <option value="Buyer">Buyer</option>
                      </select>
                      {formik.errors.role == null &&
                      formik.values.role != "" ? (
                        <span className="text-green-600 text-xs">Great!</span>
                      ) : (
                        ""
                      )}
                      <span className="text-red-600 text-xs">
                        {formik.errors.role}
                      </span>
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

                    <div className="col-md-12 mt-3">
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id="agree"
                            onChange={formik.handleChange}
                            value={formik.values.agree}
                          />
                          <label htmlFor="agree">
                            I agree to the Terms &amp; Policy
                          </label>

                          <span className="text-red-600 ml-2 text-xs">
                            {formik.errors.agree}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={formik.handleSubmit}
                    className="account-btn"
                  >
                    Create Account
                  </div>
                </form>
                <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <Link
                      to={"#"}
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google" />
                      <span>signup whit google</span>
                    </Link>
                    <Link
                      to={"#"}
                      className="eg-btn facebook-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-facebook" />
                      signup whit facebook
                    </Link>
                  </div>
                </div>
                <div className="form-poicy-area">
                  <p>
                    By clicking the "signup" button, you create a Cobiro
                    account, and you agree to Cobiro's{" "}
                    <Link to={"#"}>Terms &amp; Conditions</Link> &amp;{" "}
                    <Link to={"#"}>Privacy Policy.</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpWrap;
