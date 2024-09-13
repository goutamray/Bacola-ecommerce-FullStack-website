import { Link } from "react-router-dom";

// react icons
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import { useContext } from "react";
import { MyContext } from "../../../App";

const Navigation = () => {
  const [isOpenSideNav, setIsOpemSideNav ] = useState(false); 
  
  const context = useContext(MyContext); 
  
  return (
    <>
        <nav className="header-bottom ">
          <div className="container ">
             <div className="row my-custom-row">
                 <div className="col-sm-3 bottom-footer-part">
                     <div className="category-tab">
                       <button onClick={() => setIsOpemSideNav(!isOpenSideNav)}> 
                            <span className="menu"> <IoMenu /> </span>
                            <span> ALL CATEGORIES  </span>
                            <span className="angle"> <FaAngleDown /> </span>
                        </button>
                        <div className={`sidebarnav ${isOpenSideNav === true ? "open" : ""}`}  >
                           <ul>

                          {
                             context.categoryData?.categoryList?.length !== 0 &&
                             context.categoryData?.categoryList?.map((item, index) => {
                              return  <li key={index} > 
                                       <Link to={`/category/${item?._id}`}> {item?.name} </Link>
                                        </li>
                            })
                          }
                           </ul>
                        </div>
                     </div>
                 </div>
                 <div className="col-sm-9 bottom-footer-right-part">

                   <div className="main-menu">
                      <ul className="list list-inline">
                        <li className="list-inline-item custom-icon "> 
                          <Link to="/">         
                               Home 
                           </Link>
                        </li>

                        {
                            context.categoryData?.categoryList?.length !== 0 &&
                            context.categoryData?.categoryList?.map((item, index) => {
                              return  <li className="list-inline-item" key={index}> 
                              <Link to={`/category/${item?._id}`}> {item?.name } 
                              </Link>
                            </li>
                            })
                          }
                      </ul>
                   </div>
                   
                 </div>
             </div>
          </div>
       </nav>
    </>
  )
}

export default Navigation
