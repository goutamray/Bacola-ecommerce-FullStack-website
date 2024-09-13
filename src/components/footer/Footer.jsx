
// react icons 
import { CiDiscount1, CiDollar } from "react-icons/ci";
import { FaTruck } from "react-icons/fa";
import { TbMilk } from "react-icons/tb";
import logo from "../../assets/logo/logo.png"

import { Link } from "react-router-dom";

// image 
import payment from "../../assets/banner/payments.png";

import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="top-footer">
         <div className="container top-container">  
          <div className="row">
            <div className="col-sm-3">
               <div className="top-part">       
                  <span> <TbMilk /> </span>
                  <p> Everyday fresh products </p>
               </div>        
            </div>
            <div className="col-sm-3">
              <div className="top-part">       
                  <span> <FaTruck /> </span>
                  <p> Free delivery for order over $70 </p>
               </div>
            </div>
            <div className="col-sm-3">
               <div className="top-part">       
                  <span> <CiDiscount1 /> </span>
                  <p> Daily Mega Discounts </p>
               </div>
            </div>
            <div className="col-sm-3">
               <div className="top-part">       
                  <span> <CiDollar /> </span>
                  <p> Best price on the market  </p>
               </div>
            </div>
          </div>
         </div>
      </div>

      {/* middle footer */}
      <div className="middle-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="footer-middle-part">
                <div className="logo">
                  <Link to="/"> 
                      <img src={logo} alt="logo" />
                  </Link>
                 
                </div>
                <ul>
                  <li> <Link href="#"> Fresh Vegetables </Link></li>
                  <li> <Link href="#"> Herbs & Seasonings </Link></li>
                  <li> <Link href="#"> Fresh Fruits </Link></li>
                  <li> <Link href="#"> Cuts & Sprouts</Link></li>
                  <li> <Link href="#"> Cuts & Sprouts</Link></li>
                  <li> <Link href="#"> Cuts & Sprouts</Link></li>
                  <li> <Link href="#"> Cuts & Sprouts</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-middle-part">
                <h2> BREAKFAST & DAIRY </h2>
                <ul>
                  <li> <Link href="#"> Milk & Flavoured Milk </Link></li>
                  <li> <Link href="#"> Butter and Margarine </Link></li>
                  <li> <Link href="#"> Cheese </Link></li>
                  <li> <Link href="#"> Eggs Substitutes </Link></li>
                  <li> <Link href="#"> Honey </Link></li>
                  <li> <Link href="#"> Marmalades </Link></li>
                  <li> <Link href="#"> Sour Cream and Dips</Link></li>
                  <li> <Link href="#"> Sour Cream and Dips</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-middle-part">
                <h2> MEAT & SEAFOOD </h2>
                <ul>
                  <li> <Link href="#"> Breakfast Sausage </Link></li>
                  <li> <Link href="#"> Dinner Sausage </Link></li>
                  <li> <Link href="#"> Beef </Link></li>
                  <li> <Link href="#"> Chicken </Link></li>
                  <li> <Link href="#"> Sliced Deli Meat </Link></li>
                  <li> <Link href="#"> Shrimp </Link></li>
                  <li> <Link href="#"> Wild Caught Fillets </Link></li>
                  <li> <Link href="#"> Crab and Shellfish </Link></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-middle-part">
                <h2> BEVERAGES </h2>
                <ul>
                  <li> <Link href="#"> Water</Link> </li>
                  <li> <Link href="#"> Sparkling Water </Link> </li>
                  <li> <Link href="#"> Soda & Pop </Link> </li>
                  <li> <Link href="#"> Soda & Pop </Link> </li>
                  <li> <Link href="#"> Coffee </Link></li>
                  <li> <Link href="#"> Milk & Plant-Based Milk </Link> </li>
                  <li> <Link href="#"> Tea & Kombucha </Link> </li>
                  <li> <Link href="#"> Drink Boxes & Pouches </Link> </li>
                </ul>
              </div>
            </div>
          
          </div>
        </div>
      </div>

      {/***** bottom footer  ******/}
      <div className="bottom-footer">
          <div className="container">
           <div className="row">
              <div className="col-sm-6">
                <div className="copyright">
                  <p> CopyRight @copy All Right Reserved By <a href="#"> Goutam Ray </a> </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="payment ">
                    <img src={payment} alt="payment" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </>
  )
}

export default Footer
