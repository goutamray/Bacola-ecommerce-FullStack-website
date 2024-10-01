
// react icons
import { RiDeleteBin6Fill } from "react-icons/ri"
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';

import { useContext, useEffect, useState } from "react";
import { deleteWishlistData, fetchWishlistDataFromApi } from "../../utils/api";

import emptyCart from "../../assets/banner/emptyCart.png"

import createToast from "../../utils/toastify";
import { MyContext } from "../../App";


import "./Wishlist.css"
const WishList = () => {
  const [myListData, setMyListData] = useState([]); 
  const context = useContext(MyContext); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

      fetchWishlistDataFromApi(`?userId=${user?.userId}`).then((res) => {
        setMyListData(res.wishlist); 
      });

    // real time data update 
    context.getCartData(); 

  }, [context]); 



 // delete cart product 
 const removeProduct = (id) => {
  deleteWishlistData(`/${id}`).then((res) => {
    createToast("Wish List Product Deleted Successfull", "success");

    const user = JSON.parse(localStorage.getItem("user"));

    // refresh database 
    fetchWishlistDataFromApi(`?userId=${user?.userId}`).then((res) => {
      setMyListData(res.wishlist); 
    });

    context.getCartData(); 
  })
 }; 


 useEffect(() => {
  window.scrollTo(0, 0);
 }, []);

  return (
    <>
    
      <div className="section wishlist-section">
        <div className="container">
          <div className="row">
            <div className="col">
               <div className="top-part-cart">
                    <h1 className="head-cart"> Your WishList </h1>
                    <p> There are 
                      <span> {myListData?.length} </span>
                       products in your wishList 
                    </p>                    
              </div>
            </div>
          </div>


   {
    myListData?.length !== 0 ? 
   
          <div className="row my-cart-row">
            <div className="col-md-12">
                    {/* cart body start  */}
                    <div className="cart-body">
                      <div className="table-responsive cart-product">
                      <table className="table">
                            <thead>
                                <tr> 
                                    <th> Product </th>
                                    <th> Unit Price </th>
                                    <th> Remove </th>
                                </tr>           
                            </thead>
                            <tbody>   
                              {
                                 myListData?.length !== 0 &&
                                 myListData?.map((item, index) => {
                                  return <tr key={index}>
                                  <td> 
                                    <div className="table-box d-flex align-items-center">
                                        <div className="image">
                                            <Link to=""> 
                                                <img src={item?.image} alt={item?.productTitle} />
                                            </Link>  
                                        </div>
                                        <div className="product-content">
                                        <Link to={item?.productId ? `/product/${item.productId}` : "#"}>
                                             <h5> {item?.productTitle}  </h5> 
                                          </Link>  
                                          <Rating name="half-rating" value={item?.rating}  readOnly  size="small" />               
                                        </div>
                                    </div>
                                  </td>
                                  <td className="product-price"> Tk {item?.price} </td>
                                  <td className="delete-product"> 
                                      <span onClick={() => removeProduct(item?._id)}>  <RiDeleteBin6Fill  /> 
                                      </span>
                                  </td>
                                </tr> 
                                }) 
                              }           
                            </tbody>
                        </table>
                      </div>
                    </div>
                 </div>
          </div> 
          : 
          <div className="empty-cart">
             <img src={emptyCart} alt="emptyCart" />
            <h2> Your Cart is currently empty </h2>
          
  
               <Link to="/">  <span> <FaHome /> </span>  Continue Shipping  </Link> 
        
        </div>
      }

        </div>
      </div>

     
    </>
  )
}

export default WishList





