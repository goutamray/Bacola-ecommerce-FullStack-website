
// react icons 
import { Dialog } from "@mui/material"
import { IoMdClose } from "react-icons/io"
import { CiHeart } from "react-icons/ci";
import { FaCodeCompare } from "react-icons/fa6";

import Rating from '@mui/material/Rating';

import { useContext, useState} from "react";
import { MyContext } from "../../App";


import QuantityBox from "../quantityBox/QuantityBox";

import "./ProductModal.css"; 
import ProductZoom from "../productZoom/ProductZoom";
import createToast from "../../utils/toastify";
import { createWishListData } from "../../utils/api";

const ProductModal = ({ closeProductModal, data }) => {
  const [activeSize, setActiveSize] = useState(null);
  // const [activeTab, setActiveTab] = useState(0);
  const [tabError, setTabError] = useState(false);
  const [cartFields, setCartFields] = useState({}); 
  const [productQuantity, setProductQuantity] = useState();  

  const context = useContext(MyContext)
  
   // Function to handle active size selection
   const isActive = (index) => {
    setActiveSize(index);
    setTabError(false); 
  };

    // quantity 
    const quantity = (val) => {
      setProductQuantity(val); 
    }
  
  
    // add to cart 
    const addToCart = () => {
  
      if (activeSize !== null) {
        const user = JSON.parse(localStorage.getItem("user"));
  
        cartFields.productTitle = data?.name
        cartFields.image = data?.photo[0]
        cartFields.rating = data?.rating
        cartFields.price = data?.oldPrice
        cartFields.quantity = productQuantity
        cartFields.subTotal = parseInt(data?.oldPrice * productQuantity) 
        cartFields.productId = data?._id
        cartFields.userId = user?.userId
    
        context.addToCart(cartFields);
      }else{
        setTabError(true); 
      }
    }
 
  // add to wish list 
  const addToWishList = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user !== undefined && user !== null && user !== "")  {
      const modalData = {
        productTitle : data?.name,
        image : data?.photo[0],
        rating : data?.rating,
        price : data.oldPrice,
        productId : id,
        userId : user?.userId,
      }
  
      createWishListData(`/`, modalData).then((res) => {
  
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
      <div>
        <Dialog  open={true} onClose={() => context.setIsOpenProductModal(false)} className="productModal">
          <div className="modal-top-part">
                <button className="close_btn" onClick={() => context.setIsOpenProductModal(false)}> <IoMdClose /> </button>
                <h3> {data?.name?.substr(0, 50) + "..."}</h3>
                <div className="d-flex align-items-center"> 
                    <div className="brand d-flex align-items-center ">
                        <span> Brands </span>
                        <span className="ml-2"> <b> {data?.brand}</b></span>
                    </div>
                    <Rating name="read-only" value={parseInt(data?.rating)} readOnly size="small"/>
                </div>
                <hr />
             <div>
               <div className="product-details-popup">
                  <div className="row">
                    <div className="col-md-5 ">
                      <ProductZoom images={data?.photo} discount={data?.discount}/>
                    </div>

                    <div className="col-md-7">
                      <div className="product-content">
                      <h4 className="product-name"> {data?.name?.substr(0, 50) + "..."} </h4>
                        <div className="price-total">
                             <span className="delete-price">${data?.price}</span>
                         
                            <span className="regular-price mr-2"> ${data?.oldPrice}</span>
                        </div>
                        <p className="stock"> In Stock </p>
                   
                        <p className="desc">{data?.description?.substr(0, 250) + "..."}</p>

                {/* product ram data  */}
                     {
                          data?.productRams?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Ram : </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              data?.productRams?.map((item, index) => {      
                                return <li className='list-inline-item' key={index}> 
                                <a href="#" className={`tag ${activeSize === index ? "active" : ""}`} onClick={() => isActive(index)} > {item} </a>
                             </li>
                              })
                            }                
                         </ul>
                       </div>
                     }

                   {/* product size data  */}

                       {
                          data?.productSize?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Size :  </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              data?.productSize?.map((item, index) => {
                                return <li className='list-inline-item' key={index}> 
                                <a href="#" className={`tag ${activeSize === index ? "active" : ""}`} onClick={() => isActive(index)} > {item} </a>
                             </li>
                              })
                            }                
                         </ul>
                       </div>
                     }

                   {/* product weight data  */}
                       {
                          data?.productWeight?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Weight :  </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              data?.productWeight?.map((item, index) => {
                                return <li className='list-inline-item' key={index}> 
                                <a href="#" className={`tag ${activeSize === index ? "active" : ""}`} onClick={() => isActive(index)} > {item} </a>
                             </li>
                              })
                            }                
                          </ul>
                        </div>
                      }

                        <div className="d-flex align-items-center gap-2">
                            <QuantityBox quantity={quantity} />
                            <button 
                                 className="cart-btn" 
                                 onClick={() => addToCart()}> 
                                 {
                                  context.addingCart === true ? "Adding...." : "Add To Cart"
                                 }
                                      
                              </button>
                        </div>
                        <div className="wish-compare">
                            <button  
                                onClick={() => addToWishList(data?._id)} > 
                              <CiHeart /> Add To Wishlist
                            </button>
                            <button> <FaCodeCompare /> compare </button>
                        </div>
                      </div>
                    </div>
               </div>
             </div>
            </div>
           </div>
         </Dialog>
      </div>
    </>
  )
}

export default ProductModal




