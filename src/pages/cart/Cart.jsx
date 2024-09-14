
import QuantityBox from "../../components/quantityBox/QuantityBox";

// react icons
import { RiDeleteBin6Fill } from "react-icons/ri"
import { PiSignOutBold } from "react-icons/pi";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';

import { useContext, useEffect, useState } from "react";


import { deleteCartData, editcartData, fetchCartDataFromApi } from "../../utils/api";

import "./Cart.css";
import createToast from "../../utils/toastify";
import { MyContext } from "../../App";


const Cart =  () => {

  const [cartData, setCartData] = useState([]); 
  const [productQuantity, setProductQuantity] = useState(); 

  const [cartFields, setCartFields] = useState({}); 
  const [isLoading, setIsLoading] = useState(false); 
  const [changeQuantity, setChangeQuantity] = useState(0); 
  const context = useContext(MyContext); 

  useEffect(() => {
    fetchCartDataFromApi("/").then((res) => {
      setCartData(res.cartList); 
    });

    // real time data update 
    context.getCartData(); 

   }, [context]); 

  // quantity 
   const quantity = (val) => {
    setProductQuantity(val); 
    setChangeQuantity(val); 
  }

  // select item data 
  const selectedItem = (item, quantityVal) => {

    if (changeQuantity !== 0) {
      setIsLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      
      cartFields.productTitle = item?.productTitle
      cartFields.image = item?.image
      cartFields.rating = item?.rating
      cartFields.price = item?.price
      cartFields.quantity = quantityVal
      cartFields.subTotal = parseInt(item?.price * quantityVal) 
      cartFields.productId = item?.productId
      cartFields.userId = user?.userId
  
      // update cart data
      editcartData(`/${item?._id}`, cartFields).then(() => {
      
          setTimeout(() => {
            setIsLoading(false); 
          }, 1000);
  
          // refresh databse 
          fetchCartDataFromApi("/").then((res) => {
            setCartData(res.cartList); 
          });
  
      });

    }
  }

 // delete cart product 
 const removeProduct = (id) => {
  deleteCartData(`/${id}`).then((res) => {
    createToast("Cart Product Deleted Successfull", "success");

      // refresh databse 
      fetchCartDataFromApi("/").then((res) => {
        setCartData(res.cartList); 
      });

      context.getCartData(); 
  })
 }; 

 
 useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  return (
    <>
    
      <div className="section cart-section-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
               <div className="top-part-cart">
                    <h1 className="head-cart"> Your Carts </h1>
                    <p> There are <span> {cartData?.length}</span> products in your cart </p>                    
              </div>
            </div>
          </div>
          <div className="row my-cart-row ">
            <div className="col-md-8 cart-part-left ">
                    {/* cart body start  */}
                    <div className="cart-body">
                      <div className="table-responsive cart-product">
                      <table className="table table-bordered ">
                            <thead>
                                  <tr> 
                                    <th> Product </th>
                                    <th > Unit Price </th>
                                    <th className="mobile-hide"> Quantity </th>
                                    <th> Subtotal </th>
                                    <th className="mobile-hide"> Remove </th>
                                  </tr>           
                            </thead>
                            <tbody>   
                              {
                                cartData?.length !== 0 ? cartData?.map((item, index) => {
                                  
                                  
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
                                             <h5> {item?.productTitle?.substr(0, 30) + "..."}  </h5> 
                                          </Link>  
                                          <Rating name="half-rating" value={item?.rating}  readOnly  size="small" />               
                                        </div>
                                    </div>
                                  </td>
                                  <td className="product-price"> Tk {item?.price} </td>
                                  <td className="mobile-hide"> 
                                    <div className="cart-counter">
                                       <QuantityBox 
                                         value = {item?.quantity}
                                         quantity = {quantity} 
                                         item = {item} 
                                         selectedItem = {selectedItem}
                                         
                                       />
                                  </div>
                                  </td>
                                  <td className="subTotal"> {item?.subTotal}  </td>
                                  <td className="delete-product mobile-hide"> 
                                      <span onClick={() => removeProduct(item?._id)}>  <RiDeleteBin6Fill  /> 
                                      </span>
                                  </td>
                                </tr> 
                                }) : <p className="cart-not-found"> No Cart Product Added </p>
                              }
                                     
                                                   
                                          
                            </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="continue-btn mb-3">
                       <Link to="/"> <span> <FaLongArrowAltLeft /></span> Continue Shopping </Link>
                    </div>
               </div>

               {/**** cart total part  ******/}
                <div className="col-md-4 cart-part-right">
                  <div className="total-box">
                    <div className="card p-2">
                      <div className="card-body">
                        <h3 className="cart-total"> Cart Totals </h3>
                        <div className="sub-total d-flex align-items-center justify-content-between">
                            <p className="top-total"> Subtotal </p>
                            <h4 className="sub-price"> 
                            {
                                 cartData?.length !== 0
                                 ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                                 : 0
                              }
                            </h4>
                        </div>
                        <div className='border-info d-flex align-items-center justify-content-between mb-4'>
                            <h5 className='mb-0 same-text'>Shipping</h5>
                            <h3 className='right-text ml-auto mb-0 font-weight-bold'><span >Free</span></h3>
                          </div>


                        <div className='d-flex align-items-center justify-content-between mb-4'>
                            <h5 className='mb-0 same-text'>Estimate for</h5>
                            <h3 className='right-text ml-auto mb-0 font-weight-bold'>United Kingdom</h3>
                        </div>

                        <div className='d-flex align-items-center justify-content-between  mb-4'>
                          <h5 className='mb-0 same-text'>Total</h5>
                          <h3 className='right-text ml-auto mb-0 font-weight-bold'>
                              {
                                 cartData?.length !== 0
                                 ? cartData.reduce((total, item) => total + (parseFloat(item?.price) * item.quantity), 0)
                                 : 0
                              } <span className='text-g'>                
                            </span>
                          </h3>
                        </div>
                        <div className="process-btn" >
                                <Link to="/checkout"> Proceed To Checkout <PiSignOutBold className='cart-icon'/> 
                                </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>

      {
        isLoading === true &&  <div className="loading-data"></div>
      }
    </>
  )
}

export default Cart





