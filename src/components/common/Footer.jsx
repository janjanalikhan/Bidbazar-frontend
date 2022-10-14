import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
function Footer(props) {
  
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();

  }, []);
  const scrollTop=()=>window.scrollTo({top:0,behavior:"smooth"})
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <Link tio={`${process.env.PUBLIC_URL}/`} onclick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-logo.png"} /></Link>
                  <p>Lorem ipsum dolor sit amet consecte tur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore.</p>
                  <form>
                    <div className="input-with-btn d-flex jusify-content-start align-items-strech">
                      <input type="text" placeholder="Enter your email" />
                      <button type="submit"><img alt="images" src={process.env.PUBLIC_URL + "/images/icons/send-icon.svg"} /></button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h5>Navigation</h5>
                  <ul className="footer-list">
                    <li><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}live-auction`}>All Product</Link></li>
                    <li><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}how-works`}>How It Works</Link></li>
                    <li><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/login`}>My Account</Link></li>
                    <li><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/about`}>About Company</Link></li>
                    <li><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}/blog`}>Our News Feed</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h5>Help &amp; FAQs</h5>
                  <ul className="footer-list">
                    <li><Link to={`${process.env.PUBLIC_URL}/product`} onClick={scrollTop}>Help Center</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/faq`} onClick={scrollTop}>Customer FAQs</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/login`} onClick={scrollTop}>Terms and Conditions</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/about`} onClick={scrollTop}>Security Information</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/blog`} onClick={scrollTop}>Merchant Add Policy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h5>Latest Feed</h5>
                  <ul className="recent-feed-list">
                    <li className="single-feed">
                      <div className="feed-img">
                        <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}><img alt="images" src={process.env.PUBLIC_URL + "/images/blog/recent-feed1.png"} /></Link>
                      </div>
                      <div className="feed-content">
                        <span>January 31, 2022</span>
                        <h6><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}>Grant Distributions Conti nu to Incr Ease.</Link>
                        </h6>
                      </div>
                    </li>
                    <li className="single-feed">
                      <div className="feed-img">
                        <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}><img alt="images" src={process.env.PUBLIC_URL + "/images/blog/recent-feed2.png"} /></Link>
                      </div>
                      <div className="feed-content">
                        <span>February 21, 2022</span>
                         
                        <h6><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}>Seminar for Children to Learn About.</Link></h6>
                      </div>
                    </li>
                    <li className="single-feed">
                      <div className="feed-img">
                        <Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}><img alt="images" src={process.env.PUBLIC_URL + "/images/blog/recent-feed3.png"} /></Link>
                      </div>
                      <div className="feed-content">
                        <span>March 22, 2022</span>
                        <h6><Link onClick={scrollTop} to={`${process.env.PUBLIC_URL}blog-details`}>Education and teacher for all African
                            Children.</Link></h6>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row d-flex align-items-center g-4">
              <div className="col-lg-6 d-flex justify-content-lg-start justify-content-center">
                <p>Copyright 2022 <Link to={"#"}>Bid Out</Link> | Design By <a href="https://themeforest.net/category/site-templates?term=egenslab" className="egns-lab">Egens Lab</a></p>
              </div>
              <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center align-items-center flex-sm-nowrap flex-wrap">
                <p className="d-sm-flex d-none">We Accepts:</p>
                <ul className="footer-logo-list">
                  <li><Link to={"#"} onClick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-pay1.png"} /></Link></li>
                  <li><Link to={"#"} onClick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-pay2.png"} /></Link></li>
                  <li><Link to={"#"} onClick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-pay3.png"} /></Link></li>
                  <li><Link to={"#"} onClick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-pay4.png"} /></Link></li>
                  <li><Link to={"#"} onClick={scrollTop}><img alt="images" src={process.env.PUBLIC_URL + "/images/bg/footer-pay5.png"} /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
