
import { Link } from "react-router-dom";

// material ui 
import Rating from '@mui/material/Rating';

// react icons 
import { SlSizeFullscreen } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";

import { useContext } from "react";
import { MyContext } from "../../App";
import { createWishListData } from "../../utils/api";
import createToast from "../../utils/toastify";

const ProductItem = (props) => {
   const context = useContext(MyContext); 

  const viewProductDetails = (id) => {
    context.setIsOpenProductModal({
      id: id,
      open : true,
    }); 
  }; 


  // add to wish list 
  const addToWishList = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user !== undefined && user !== null && user !== "")  {
      const data = {
        productTitle : props?.item?.name,
        image : props?.item?.photo[0],
        rating : props?.item?.rating,
        price : props?.item?.oldPrice,
        productId : id,
        userId : user?.userId,
      }
  
      createWishListData(`/`, data).then((res) => {
  
        if (res.status === true) {
          // Product Wishlist added successfully
          createToast("Product Added Wish List", "success");
          return;
  
        } else if (res.status === false) {
          // Product already in the cart or some other issue
          return createToast("Product Already Wish List Added");
        } else {
          // Handle unexpected statuses
          return createToast("An unexpected error occurred", "error");
        }
      }).catch((error) => {
        // Handle any network or other errors
        console.error("Error adding product to cart:", error);
        createToast("Product Already Wish Listed", );
        return;
      });

    }else{
      createToast("Please Login Your Account");
    }
  }

  return (
    <>
       <div className={`item product-item ${props?.itemView} `}>
            <div className="imagewrapper">
                  <img src={props?.item?.photo[0]} alt="product" />
                    <div className="discount">
                         <span> {props?.item?.discount}% </span>
                   </div>
                   <div className="actions">
                      <button 
                          className="screen" 
                          onClick={() => viewProductDetails(props?.item?._id)}
                          > 
                          <SlSizeFullscreen />
                       </button>
                      <button 
                         className="cart"
                         onClick={() => addToWishList(props?.item?._id)}
                        > 
                        <IoIosHeartEmpty /> 
                      </button>
                   </div>
            </div>
             <div className="all-details">
                  <Link to={`/product/${props?.item?._id}`} > 
                      {props?.item?.name.length > 30 ? props?.item?.name.substring(0, 35) + ". . ." : props?.item?.name }
                  </Link>
                   <p> In Stock </p>
                  <Rating name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />
                   <div className="price-total">
                      <span className="delete-price"> {props?.item?.price} </span>
                      <span className="regular-price"> {props?.item?.oldPrice}  </span>
                      <span className="currency-data"> BDT  </span>
                   </div>
                    <Link to={`/product/${props?.item?._id}`} className="cart-btn"> Add to cart </Link>
               </div>                     
         </div>
    </>
  )
}

export default ProductItem
