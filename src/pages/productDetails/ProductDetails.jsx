
// material ui 
import { Rating } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

// import components
import ProductZoom from "../../components/productZoom/ProductZoom";
import QuantityBox from "../../components/quantityBox/QuantityBox";
import RelatedProduct from "./relatedProduct/RelatedProduct";
import { MyContext } from "../../App";

// react icons 
import { CiHeart } from "react-icons/ci";
import { FaCodeCompare } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import avaterPhoto from "../../assets/banner/avater-photo.jpg"

import { createReviewData, createWishListData, getReviewData } from "../../utils/api";
import createToast from "../../utils/toastify";

// loading 
import CircularProgress from '@mui/material/CircularProgress';

import "./ProductDetails.css"; 

const ProductDetails = () => {
  const [activeSize, setActiveSize] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [productData, setProductData] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]); // State to hold related products
  const [cartFields, setCartFields] = useState({}); 
  const [productQuantity, setProductQuantity] = useState(); 
 
  const [tabError, setTabError] = useState(false);

 const [reviewsData, setReviewsData] = useState([]);
 const [rating, setRating] = useState(0)

  const [input, setInput ] = useState({
      productId : "",
      customerName : "",
      customerId : "",
      customerRating : null,
      review : "",
  })

 // handle review change 
 const handleReviewChange = (e) => {
  setInput((prevState) => ({
    ...prevState,
    [e.target.name] : e.target.value
  }))
 }; 

  const context = useContext(MyContext);
  const navigate = useNavigate();

  // Function to handle active size selection
  const isActive = (index) => {
    setActiveSize(index);
    setTabError(false); 
  };

  const { id } = useParams();

  // get single product data & related products 
  const fetchSingleProduct = async (id) => {
    try {
      setLoading(true); // Start loading
      setActiveSize(null); 

      // Fetch the single product
      const productRes = await axios.get(`http://localhost:5050/api/v1/product/${id}`);
      const fetchedProduct = productRes.data.product;
      setProductData(fetchedProduct); // Set the fetched product data to state

      // Fetch related products within the same category, excluding the current product
      if (fetchedProduct && fetchedProduct.category) {
        const category = fetchedProduct.category;
        try {
          const relatedRes = await axios.get(`http://localhost:5050/api/v1/product/related-product`, {
            params: {
              category,
              excludeProductId: id // Exclude the current product from the related products
            }
          });
          setRelatedProducts(relatedRes.data.relatedProducts); // Set related products to state
        } catch (error) {
          console.error('Error fetching related products:', error);
          setRelatedProducts([]); // Clear related products on error
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProductData(null); // Set to null on error
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch product when the component mounts or the 'id' parameter changes
  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);


  // quantity 
  const quantity = (val) => {
    setProductQuantity(val); 
  }


  // add to cart 
  const addToCart = () => {

    if (activeSize !== null) {
      const user = JSON.parse(localStorage.getItem("user"));

      cartFields.productTitle = productData?.name
      cartFields.image = productData?.photo[0]
      cartFields.rating = productData?.rating
      cartFields.price = productData?.oldPrice
      cartFields.quantity = productQuantity
      cartFields.subTotal = parseInt(productData?.oldPrice * productQuantity) 
      cartFields.productId = productData?._id
      cartFields.userId = user?.userId
  
      context?.addToCart(cartFields);

      setTimeout(() => {
        navigate("/cart")
      }, 2000);
    }else{
      setTabError(true); 
    }
  }


  // handle review submit 
  const handleReviewSubmit = (e) => {
     e.preventDefault();
     setLoading(true); 

     const user = JSON.parse(localStorage.getItem("user"));

     input.customerId = user?.userId;
     input.productId = id;
     input.customerName = user?.name;
     input.customerPhoto = user?.photo; 

       // Validate all inputs 
       if (!input.review || !input.customerRating) {
        setLoading(false);
        createToast("All fields are required", );
        return;
      }

     createReviewData("/", input).then((res) => {
        createToast("Review Submitted Successful", "success");
        setLoading(false);
        // empty 
        setInput({
          review: "",
          customerRating: "",
        });

        getReviewData(`/review?productId=${id}`).then((res) => {
          setReviewsData(res.reviews); 
        })

     })

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // product review 
  useEffect(() => {
    getReviewData(`/review?productId=${id}`).then((res) => {
      setReviewsData(res.reviews); 
    })
  }, [id]); 



    // add to wish list 
    const addToWishList = (id) => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user !== undefined && user !== null && user !== "")  {
        const modalData = {
          productTitle : productData?.name,
          image : productData?.photo[0],
          rating : productData?.rating,
          price : productData.oldPrice,
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
     <div className="productDetails ">
      <div className="container">
         <div className="row details-row ">
           <div className="col-sm-3 details-page-left-part ">
               <ProductZoom images={productData?.photo} discount={productData?.discount}/>
           </div>
           <div className="col-sm-9 details-page-right-part ">

           <div>
              {loading ? (
                <p>Loading...</p>
              ) : productData ? (
                 <div className="product-details">
                <h3> {productData?.name} </h3>
                <div className="d-flex align-items-center"> 
                    <div className="brand d-flex align-items-center ">
                        <span> Brands </span>
                        <span className="ml-2"> <b> {productData?.brand} </b></span>
                    </div>
                    <div className="reviews d-flex align-items-center gap-2">
                       <Rating name="read-only" value={parseInt(productData?.rating)} readOnly size="small"/>
                        <span > ( {reviewsData?.length} ) Reviews </span>
                    </div>
                </div>
                <div className="product-content">
                        <div className="price-total">
                             <span className="delete-price"> {productData?.price}</span>
                            <span className="regular-price"> {productData?.oldPrice} </span>
                            <span className="currency-data"> Tk  </span>
                        </div>
                        <p className="stock"> In Stock </p>
                        <p className="desc">{productData?.description}</p>

                {/* product ram data  */}
                     {
                          productData?.productRams?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Ram : </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              productData?.productRams?.map((item, index) => {      
                                return <li className='list-inline-item' key={index}> 
                                   <a 
                                     href="#" 
                                     className={`tag ${activeSize === index ? "active" : ""}`} 
                                     onClick={() => isActive(index)} 
                                     > 
                                     {item} 
                                  </a>
                             </li>
                              })
                            }                
                         </ul>
                       </div>
                     }

                   {/* product size data  */}

                       {
                          productData?.productSize?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Size :  </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              productData?.productSize?.map((item, index) => {
                                return <li className='list-inline-item' key={index}> 
                                     <a 
                                        href="#" 
                                        className={`tag ${activeSize === index ? "active" : ""}`} 
                                        onClick={() => isActive(index)} 
                                       > 
                                       {item} 
                                     </a>
                             </li>
                              })
                            }                
                         </ul>
                       </div>
                     }

                   {/* product weight data  */}
                       {
                          productData?.productWeight?.length !== 0 && 
                          <div className="productSize d-flex align-items-center mt-3 mb-4">
                          <span> Weight :  </span>
                          <ul className={`list list-inline ${tabError === true && 'error'}`}>
                            {
                              productData?.productWeight?.map((item, index) => {
                                return <li className='list-inline-item' key={index}> 
                                     <a 
                                       href="#" 
                                       className={`tag ${activeSize === index ? "active" : ""}`} 
                                       onClick={() => isActive(index)} 
                                      > 
                                      {item} 
                                    </a>
                             </li>
                              })
                            }                
                          </ul>
                        </div>
                      }
                      

                      {/****  cart btn ********/}
                        <div className="all-count-compare d-flex align-items-center gap-2">
                          <div className="cart-counter ">
                             <QuantityBox quantity={quantity}/>
                             <button 
                                 className="cart-btn" 
                                 onClick={() => addToCart()}> 
                                 {
                                  context.addingCart === true ? "Adding...." : "Add To Cart"
                                 }
                                      
                              </button>
                          </div>
                           <div className="wish-compare-btn">
                             <Tooltip title="Add To WishList" placement="top-start">
                                <Button className="my-wish-btn" onClick={() => addToWishList(productData?._id)}> 
                                  <CiHeart /> 
                                </Button>   
                              </Tooltip>
                             <Tooltip title="Add To Compare " placement="top-start">
                                <Button className="my-wish-btn" > <FaCodeCompare /> </Button>   
                              </Tooltip>
                          </div>
                  
                        </div>

                      {/* follow us  */}
                      <div className="follow-us-btn">
                            <div>
                              <p> Share : </p>
                            </div>
                            <div className="share-icon">
                              <span> <FaFacebook /> </span>
                              <span> <FaXTwitter /> </span>
                              <span> <FaLinkedin /> </span>
                              <span> <FaPinterest /> </span>
                              <span> <FaTelegram /> </span>
                            </div>
                          </div>
                      </div>
              </div>
              ) : (
                <p>No product found.</p>
              )}
            </div>
             
           </div>
         </div>
      </div>
     </div>

     <div className="container">
            {/* product tab details  */}
            <div className="card productDetailsTab p-5">
                     <div className="custom-tabs">
                       <ul className='list list-inline'>
                         <li className='list-inline-item my-custom-list '> 
                             <button className={`${activeTab === 0 && "active" }`} onClick={() => setActiveTab(0)}> Description </button> 
                          </li>
                         <li className='list-inline-item my-custom-list'> 
                             <button className={`${activeTab === 1 && "active" }`} onClick={()   => setActiveTab(1)}> Additional info </button> 
                          </li>
                         <li className='list-inline-item my-custom-list'> 
                             <button className={`${activeTab === 2 && "active" }`} onClick={() => setActiveTab(2)}> Reviews ( {reviewsData?.length} )  </button> 
                          </li>
                       </ul>
                  
                  {
                    activeTab === 0 && <div className="tab-content mt-3">
                    <p className="all-small-font"> {productData?.description} </p>
                   </div>
                  }
                    
                  {
                    activeTab === 1 && <div className="tab-content mt-3">
                    <div className="table-responsive">
                       <table className='table table-bordered'>
                              <tbody>
                                                       <tr className="stand-up">
                                                           <th>Stand Up</th>
                                                           <td>
                                                               <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="folded-wo-wheels">
                                                           <th>Folded (w/o wheels)</th>
                                                           <td>
                                                               <p>32.5″L x 18.5″W x 16.5″H</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="folded-w-wheels">
                                                           <th>Folded (w/ wheels)</th>
                                                           <td>
                                                               <p>32.5″L x 24″W x 18.5″H</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="door-pass-through">
                                                           <th>Door Pass Through</th>
                                                           <td>
                                                               <p>24</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="frame">
                                                           <th>Frame</th>
                                                           <td>
                                                               <p>Aluminum</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="weight-wo-wheels">
                                                           <th>Weight (w/o wheels)</th>
                                                           <td>
                                                               <p>20 LBS</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="weight-capacity">
                                                           <th>Weight Capacity</th>
                                                           <td>
                                                               <p>60 LBS</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="width">
                                                           <th>Width</th>
                                                           <td>
                                                               <p>24″</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="handle-height-ground-to-handle">
                                                           <th>Handle height (ground to handle)</th>
                                                           <td>
                                                               <p>37-45″</p>
                                                           </td>
                                                       </tr>
                                                       <tr className="wheels">
                                                           <th>Wheels</th>
                                                           <td>
                                                               <p>12″ air / wide track slick tread</p>
                                                           </td>
                                                       </tr>
                                                      
                                                       
                             </tbody>
                       </table>
                    </div>
                    </div>
                  }
                   
                  {/* review part  */}

                   {
                    activeTab === 2 && <div className="tab-content mt-3">
                         <div className="row">
                          <div className="col-md-8 left-review-box ">
                               <div className="review-customer">
                                  <h4> Customer questions & answers  </h4>
                            {
                              reviewsData?.length !== 0 && 
                              reviewsData?.slice(0)?.reverse()?.map((item, index) => {

                                const localUser = JSON.parse(localStorage.getItem("user"));
                                const localUserPhoto = localUser?.photo;

                                return  <div className="card p-3 review-card mb-4" key={index}>
                                <div className="image-item">
                                  <div className="rounded-circle">
                                  <img
                                        src={
                                          localUserPhoto && localUser?.userId === item?.customerId
                                          ? localUserPhoto // Show localStorage photo if it belongs to the current user
                                          : item?.customerPhoto || avaterPhoto
                                            }
                                          alt={item?.customerName}
                                          className="review-image"
                                        />
                                     
                                   </div>
                                   <p> {item?.customerName} </p>
                                </div>
                                <div className="customer-review-info ">
                                    <div className="card-info">
                                      <div className="review-date">
                                        <p className="now-date"> {item?.createdAt?.split("T")[0]}  </p>
                                        </div>
                                        <div className="star-message mt-3"> 
                                          <p className="message"> {item?.review} </p>
                                        </div> 
                                    </div>
                                    <div className="review-final">
                                      <span>  
                                        <Rating 
                                           name="read-only" 
                                           value={item?.customerRating} 
                                           readOnly 
                                           size="small"
                                          /> 
                                      </span>   
                                    </div>
                                </div>
                          
                            </div>
                              })
                            }
                               
                           
                            <div className="review-form">
                                     <h3> Add a review </h3>
                             
                                 <form className="form" onSubmit={handleReviewSubmit} > 
                                     <div className="form-group my-2">
                                        <textarea 
                                            cols="30" rows="5" className="form-control" placeholder="Write Comment"
                                            name="review" 
                                            value={input.review}
                                            onChange={handleReviewChange}
                                          >
                                        </textarea>
                                     </div>
                                     <div className="row my-3">
                                          <div className="col-md-6">
                                            <div className="form-group star-view ">
                                            <span className="me-3"> 
                                                Review    
                                            <Rating
                                                name="customerRating"
                                                value={input.customerRating}
                                                onChange={(event, newValue) => {
                                                  setRating(newValue);
                                                  setInput((prev) => ({
                                                    ...prev,
                                                    customerRating : newValue
                                                  }))
                                                }}
                                              />
                                                </span>
                                              </div>
                                          </div>  
                                       </div>                                
                                     <button 
                                        type="submit" 
                                        className="submit-btn"> 
                                          {
                                            loading === true ?   
                                            <CircularProgress color="inherit" className="ml-3 loader "/> : 
                                            "Submit Review"
                                          }
                                         
                                     </button>
                                  </form>

                                 </div> 
                               </div>
                          </div>

                          <div className="col-md-4">
                               <div className="review-details">
                                    <h4> Customer reviews </h4>
                                    <div className="review-count">
                                      <p> <span> <Rating name="read-only" value={5} readOnly size="small"/> </span> <span className="total"> 4.8 out of 5 </span> </p>
                                    </div>

                                     <div className="progress-bar-item">
                                      <div className="single-progress">
                                        <span> 5 star </span>
                                         <div className="progress" style={{width: "100%"}}  >
                                           <div className="progress-bar" style={{width: "75%"}}> 75% </div>
                                         </div>                                     
                                      </div>

                                      <div className="single-progress">
                                        <span> 4 star </span>
                                         <div className="progress" style={{width: "100%"}}  >
                                           <div className="progress-bar" style={{width: "25%"}}> 25% </div>
                                         </div>
                                      </div>

                                      <div className="single-progress">
                                        <span> 3 star </span>
                                         <div className="progress" style={{width: "100%"}}  >
                                           <div className="progress-bar" style={{width: "45%"}}> 45% </div>
                                         </div>
                                      </div>

                                      <div className="single-progress">
                                        <span> 2 star </span>
                                         <div className="progress" style={{width: "100%"}}  >
                                           <div className="progress-bar" style={{width: "65%"}}> 65% </div>
                                         </div>
                                      </div>
                                      <div className="single-progress">
                                        <span> 1 star </span>
                                         <div className="progress" style={{width: "100%"}}  >
                                           <div className="progress-bar" style={{width: "75%"}}> 75% </div>
                                         </div>
                                      </div>
                                      <div className="small-last">
                                         <p href="#" className="small-text"> How are ratings calculated? </p>
                                      </div>
                                    </div>
                               </div>
                          </div>
                         </div>
                     </div>
                  }     

                     </div>
                  </div>
     </div>

     {/* related product  */}
     <RelatedProduct title={"RELATED PRODUCTS"} relatedProducts={relatedProducts}/>

    </>
  )
}

export default ProductDetails




