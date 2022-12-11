import React, { useState } from "react";

import { useFormik } from "formik";
import { Store } from "react-notifications-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function SignUpWrap() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)

  const [phoneValue, setphoneValue] = useState("00")
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
        PhoneNumber: phoneValue,
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

  function hasNumber(val) {
    return /[0-9]/.test(val);
  }

  function hasAlphabet(val) {
    return /[A-Za-z]/.test(val);
  }

 
  function hasSpecialChar(val) {
    return /[!@#$%^&*]/.test(val);
  }



  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 25) {
      errors.name = "Must be 25 characters or less";
    }
    // phoneValue==null
    
    if (phoneValue.length >18 || phoneValue.length <12 ) {
      errors.phonenumber = "Phone Number not valid";
    }

    if (!isEmail(values.email)) {
      errors.email = "Email not valid";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!hasNumber(values.password)) {
      errors.password = "Must have number";
    }

    if (!hasSpecialChar(values.password)) {
      errors.password = "Must have special character";
    }

    if (!hasAlphabet(values.password)) {
      errors.password = "Must have alphabet";
    }
    //hasAlphabet

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
      phonenumber:"",
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

                    className="bg-green-500 hover:bg-green-700 pointer:cusor text-white p-2 ml-2 rounded"
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
                        formik.values.name != "00" ? (
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
                        <PhoneInput
                          id="phonenumber"
                          onChange={setphoneValue}
                          defaultValue={phoneValue}
                          type="tel"
                          placeholder="Phone Number"
                        />
                        {formik.errors.phonenumber == null &&
                        phoneValue != "00" ? (
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
                        <select   
                        
                          id="country"
                        
                        onChange={formik.handleChange}
                          value={formik.values.country}
                          placeholder="Country" class="form-control">


                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
            </select>
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
                {/* <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <Link
                      to={"#"}
                      className="eg-btn google-btn d-flex align-items-center"
                    >
                      <i className="bx bxl-google pointer:cusor" />
                      <span>signup whit google</span>
                    </Link>
                   
                  </div>
                </div> */}
                <div className="form-poicy-area mt-5">
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
