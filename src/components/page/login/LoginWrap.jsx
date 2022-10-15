import React, { useState } from "react";

import { useFormik } from "formik";
import { Store } from "react-notifications-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
axios.defaults.withCredentials = true;

function LoginWrap() {


  
  const { auth, setAuth } = useAuth();

  const [openEye, setOpenEye] = useState();
  const handleEyeIcon = () => {
    if (openEye === false || openEye === 0) {
      setOpenEye(1);
    } else {
      setOpenEye(false);
    }
  };
  const navigate = useNavigate();

  const authByDatabase = async (val) => {
    console.log("authByDatabase Fun" + val);

    // const PhoneNumber = val.phonenumber;
    // const Gender = val.gender;
    // const Designation = val.designation;
    // const isSupervisor = true;
    // const isCommittee = false;
    // const ProfilePicture = getFileBase64String;

    try {
      const response= await axios.post(`http://localhost:3500/auth/${val.role}`, {
      
        Email: val.email,
        Password: val.password,
      
      });


      console.log("find it ", response.data);

      var decoded = jwt_decode(response.data.refreshToken);

      console.log("decoded", decoded);
      setAuth(decoded);
      console.log("SVED AUTH", auth);

      showNotification(response);
      

    } catch (e) {
      console.log(e);


     Swal.fire("Invalid Credentials!", "Please provide correct email and passsword", "error");
    }

    // reload();
  };

  const showNotification = (res) => {
    Store.addNotification({
      title: "Successfully logged in!",
      message: `${formik.values.email} has been logged in`,
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
    navigate("/login", { replace: true });

    Swal.fire({
      title: "Successfully logged in!",
      text: "The smartest side to take in a bidding war is the losing side. Enjoy!",
      icon: "success",
      confirmButtonText: "Lets Bid!",
    });


  };

  function isEmail(val) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
  }

  const validate = (values) => {
    const errors = {};

    if (!isEmail(values.email)) {
      errors.email = "Email not valid";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.role) {
      errors.role = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: ""
    },
    // eslint-disable-next-line no-unused-vars
    validate,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values));

      authByDatabase(values);
    },
  });

  return (
    <>
      <div className="login-section pt-120 pb-120">
        <img
          alt="imges"
          src="assets/images/bg/section-bg.png"
          className="img-fluid section-bg-top"
        />
        <img
          alt="imges"
          src="assets/images/bg/section-bg.png"
          className="img-fluid section-bg-bottom"
        />
        <div className="container">
          <div className="row d-flex justify-content-center g-4">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div
                className="form-wrapper wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".2s"
              >
                <div className="form-title">
                  <h3>Log In</h3>
                  <p>
                    New Member?{" "}
                    <Link
                      to={`${process.env.PUBLIC_URL}/signup`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      signup here
                    </Link>
                  </p>
                </div>
                <form className="w-100">
                  <div className="row">
                    <div className="col-md-12">
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
                    <div className="col-md-12">
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


           <div className="col-md-12  ">
                      <label>Are you seller/buyer? *</label>
                      <select
                        id="role"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                      >
                        <option value="">Select Seller or Buyer </option>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
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


                    <div className="col-12 ">
                      <div className=" form-inner underline  underline-offset-1  text-right">
                        <Link className="hover:text-green-700" to={"#"}>
                          Forgotten Password
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={formik.handleSubmit}
                    className="account-btn"
                  >
                   Log in
                  </div>
                </form>
                <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <a
                      href
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google" />
                      <span>signup whit google</span>
                    </a>
                    <a
                      href
                      className="eg-btn facebook-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-facebook" />
                      signup whit facebook
                    </a>
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

export default LoginWrap;
