
// import components
import HomeBanner from "../../components/homeBanner/HomeBanner"
import ProductItem from "../../components/productItem/ProductItem";
import CategorySlider from "../../components/category/CategorySlider";

// react icons 
import { FaArrowRightLong } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

// images 
import man from "../../assets/avater/aaaa.jpg"
import news from "../../assets/banner/news.png"

import { useContext, useEffect, useState } from "react";
import { fetchDataFromApi, fetchProductFromApi } from "../../utils/api";
import { MyContext } from "../../App";

// material ui 
 import Tabs from '@mui/material/Tabs';
 import Tab from '@mui/material/Tab';
 import axios from "axios";

import "./Home.css";

const Home = () => {
   const [productData, setProductData] = useState([]); 
   const [categoryAllData, setCategoryAllData] = useState([]); 

   const context = useContext(MyContext);

   // get all product & category 
   useEffect(() => {
      fetchProductFromApi("/").then((res) => {
         setProductData(res?.productList);
      }); 

      fetchDataFromApi("/").then((res) => {
         setCategoryAllData(res?.categoryList); 
       }); 
   }, []); 


  // filter 
   const [selectedCategory, setSelectedCategory] = useState('');
   const [products, setProducts] = useState([]);

   useEffect(() => {
      if (categoryAllData?.length > 0) {
         const firstCategoryId = categoryAllData[0]._id;
         setSelectedCategory(firstCategoryId);
         fetchProducts(firstCategoryId);
      }
   }, [categoryAllData]);

   const fetchProducts = async (category) => {
      try {
         const response = await axios.get(`http://localhost:5050/api/v1/product?category=${category}`);
         setProducts(response.data.productList);
      } catch (error) {
         console.error('Error fetching products:', error);
      }
   };

   // handle category change 
   const handleCategoryChange = (event, newValue) => {
      setSelectedCategory(newValue);
      fetchProducts(newValue);

   };


 // show header footer 
  useEffect(() => {
     context.setIsHeaderFooterShow(true); 
 }, [context]); 

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  return (
    <>
      <HomeBanner />

      {/* cat slider  */}
       {
         categoryAllData?.length !== 0 && 
         <CategorySlider catData={categoryAllData} />
       }
 

      {/* Home Banner */}
      <div className="homeBanner py-5 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-3 hide-tab-banner">
               <div className="sticky">
                     <div className="info rounded">
                        <h2> Bacola Natural Foods </h2>
                        <div className="product-name">
                        <h3> Special Organic </h3>
                        <h1> Roats Burger </h1>
                        </div>
                        <div className="price mt-1">
                        <p> only-from </p>
                        <h4> $14.99 </h4>
                        </div>
                     </div>

                     <div className="data-all rounded">
                        <h2> Best Bakery Products </h2>
                        <div className="product-name">
                        <h3 className="fresh"> Freshest Products </h3>
                        <h1> every hour. </h1>
                        </div>
                        <div className="price mt-1">
                        <p> only-from </p>
                        <h4> $24.99 </h4>
                        </div>
                        <button> Shop Now</button>
                     </div>
               </div>
            </div>

            
            <div className="col-sm-12 col-md-9 product-row ">
               <div className="product-slider">

                  <div className="product-header">
                     <div className="populart-text">
                        <h2> Popular Products </h2>
                        {/* <p> Do not miss the current offers until the end of   March. </p> */}
                    </div>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                     >
                        {categoryAllData?.length > 0 &&
                           categoryAllData.map((item) => (
                                 <Tab key={item?._id} value={item?._id} label={item?.name} className="dynamic-cat-data" />
                           ))
                        }
                     </Tabs>
                  </div> 

               <div className="product_row_all mt-4">
                   <Swiper
                      slidesPerView={4}
                      spaceBetween={10}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        340: {
                          slidesPerView: 2,
                          spaceBetween: 15,
                        },
                        640: {
                          slidesPerView: 3,
                          spaceBetween: 15,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                      }}
                      navigation={true}
                      modules={[ Navigation]}
                      className="mySwiper"
                    >
                     {
                        products?.length !== 0 ? 
                        products?.map((item, index) => {
                          return <SwiperSlide key={index}>
                          <ProductItem item={item}/>
                       </SwiperSlide>
                        }) : <p> No Products Found</p>
                     }      
                    </Swiper> 
                          
                  </div> 
               </div>

               {/* new products */}
               <div className="product-slider mt-5">
                  <div className="product-header">
                     <div>
                        <h2> NEW PRODUCTS </h2>
                        {/* <p> New products with updated stocks. </p> */}
                    </div>
                  
                  </div>

                  <div className="product_row_all product-row2 mt-4 d-flex ">
                     {
                        productData.length !== 0 && 
                        productData.map((item, index) => {
                           return <ProductItem key={index} item={item}/>
                        })
                     }                                   
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* comment section */}
      <div className="comment-section">
         <div className="container">
            <h2> Client Comments </h2>
            <div className="row my-comment-section ">
               <div className="col-sm-6 col-md-12 col-xl-3">
                  <div className="comment-data">
                     <h4 > The Best Marketplace </h4>
                      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. </p>
                      <div className="client">
                        <img src={man} alt="" />
                        <div className="name-data">
                           <h4> Tina Mcdonnell </h4>
                           <p> Sales Manager </p>
                        </div>
                      </div>
                  </div>
               </div>
               <div className="col-sm-12 col-md-12 col-xl-9">
                  <div className="product-banner">
                     <div className="data-all-product rounded">
                        <h2> Weekend Discount 40% </h2>
                        <div className="product-name">
                        <h3 className="fresh"> Legumes & Cereals </h3>
                        <p> Feed your family the best  </p>
                        </div>
                        <button> Shop Now</button>
                     </div>
                     <div className="data-all-product2 rounded">
                        <h2> Weekend Discount 40%  </h2>
                        <div className="product-name">
                        <h3 className="fresh"> Dairy & Eggs </h3>
                        <p>A different kind of grocery store  </p>
                        </div>   
                        <button> Shop Now</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* news letter section */}
      <div className="newsletter">
         <div className="container">
            <div className="row news-row">
               <div className="col-sm-6">
                 <div className="newleter-content">
                    <h4> $20 discount for your first order </h4>
                    <h1> Join our newsletter and get... </h1>
                    <p> Join our email subscription now to get updates on promotions and coupons. </p>
                    <div className="news-btn">
                     <span> <CiMail /> </span>
                      <input type="text" placeholder="Your email address"/>
                      <button> Subscribe </button>
                    </div>
                 </div>
               </div>
               <div className="col-sm-6">
                  <div className="newsleter-image">
                     <img src={news} alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
      
    </>
  )
}

export default Home




