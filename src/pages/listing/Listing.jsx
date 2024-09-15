
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

// import components 
import SideBar from "../../components/sidebar/SideBar";
import ProductItem from "../../components/productItem/ProductItem";

// react icons 
import { FaAngleDown } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { RiGridFill } from "react-icons/ri";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaFilter } from "react-icons/fa";


// material ui
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import Pagination from '@mui/material/Pagination';

import { useEffect } from "react";
import axios from "axios";

import "./Listing.css";

const Listing = () => {
  const [productView, setProductView ] = useState('four');
  const [productData, setProductData] = useState([]); 
  const [loading, setLoading] = useState(true); // Add a loading state 

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isOpenSideBar, setIsOpenSideBar ] = useState(false); 


  // open filter 
  const openSideBarData = () => {
    setIsOpenSideBar(() => !isOpenSideBar)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   // get params id 
  const { id } = useParams(); 

  // Function to fetch products based on the category ID or fetch all products if no category ID
  const fetchProducts = async (categoryId) => {
    try {
      setLoading(true); // Start loading
      let url = categoryId ? 
        `http://localhost:5050/api/v1/product?category=${categoryId}` : 
        `http://localhost:5050/api/v1/product`;

      const response = await axios.get(url);
      setProductData(response.data.productList || []); // Set the fetched product data to state
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductData([]); // Set to empty array on error
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch products when the component mounts or the 'id' parameter changes
  useEffect(() => {
    fetchProducts(id);
  }, [id]);


  // filter category by sidebar content 
  const filterData = async (id) => {
    try {
      setLoading(true); // Start loading
      let url = id ? 
        `http://localhost:5050/api/v1/product?category=${id}` : 
        `http://localhost:5050/api/v1/product`;

      const response = await axios.get(url);
      setProductData(response.data.productList || []); // Set the fetched product data to state
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductData([]); // Set to empty array on error
    } finally {
      setLoading(false); // End loading
    }
  };


  // filter by price 
  const filterByPrice = async (price, categoryId) => {
    try {
      setLoading(true); // Start loading
      
      // Build the URL with query parameters
      let url = `http://localhost:5050/api/v1/product?`;
      
      if (price && price.length === 2) {
        url += `minPrice=${parseFloat(price[0])}&maxPrice=${parseFloat(price[1])}`;
      }

      if (categoryId) {
        url += `&category=${categoryId}`;
      }

      // Make the API request
      const response = await axios.get(url);
      setProductData(response.data.productList || []); // Set the fetched product data to state
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductData([]); // Set to empty array on error
    } finally {
      setLoading(false); // End loading
    }
  };


  // filter by rating 
  const filterByRating = async (rating, categoryId) => {
    try {
      console.log('Filtering by rating:', rating, 'and category:', categoryId); // Log the inputs
      setLoading(true);
      const url = categoryId 
        ? `http://localhost:5050/api/v1/product?rating=${rating}&category=${categoryId}` 
        : `http://localhost:5050/api/v1/product`;
      
      const response = await axios.get(url);
      setProductData(response.data.productList || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
     window.scrollTo(0,0); 
  }, []); 

  return (
    <>

        <button 
           className="btn btn-primary w-100 filters-btn mb-2" 
           onClick={openSideBarData}> 
           Open Filters 
        </button>

       <div className="bradcrumb py-10">
          <div className="container custom-background ">
            <div className="col">
                <h2 className="pt-5"> <Link to="/"> Home </Link> / Shop</h2>
            </div>
          </div>
       </div>
        <div className="product-listing-page">
          <div className="container">
            <div className="productListing d-flex">
                <SideBar 
                   filterData={filterData} 
                   filterByPrice={filterByPrice} 
                   filterByRating={filterByRating} 
                   isOpenSideBar={isOpenSideBar} 
                   openSideBarData={openSideBarData}
                  />
            
                <div className="content_right">
                   <div className="showBy d-flex align-items-center justify-content-between">
                      <div className="left-grid d-flex align-items-center gap-2 ">
                         <button className={productView === "one" && "acti" } 
                         onClick={() => setProductView('one')}> <FiMenu /> </button>
                         <button className={productView === "three" && "acti" } 
                          onClick={() => setProductView('three')}> <RiGridFill /> </button>
                         <button className={productView === "four" && "acti" } 
                         onClick={() => setProductView('four')}> <TfiLayoutGrid4Alt /> </button>
                      </div>
                      <div 
                         className="mobile-filter-button" 
                         onClick={openSideBarData}
                        >
                            <button> <FaFilter /> Filter </button>
                        </div>

                      <div className="drop-btn">  
                       <Button
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          show 9 <span> <FaAngleDown  /> </span> 
                        </Button>
                        <Menu
                          className="showPerPageDrop"
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={handleClose}> 10 </MenuItem>
                          <MenuItem onClick={handleClose}> 20 </MenuItem>
                          <MenuItem onClick={handleClose}> 30 </MenuItem>
                          <MenuItem onClick={handleClose}> 40 </MenuItem>
                        </Menu>
                      </div>
                   </div>
                   <div className="productListingGrid">
                        {loading ? (
                          <p>Loading...</p>
                        ) : productData.length > 0 ? (
                          productData.map((item) => (
                            <ProductItem itemView={productView} key={item?._id} item={item} />
                          ))
                        ) : (
                          <p className="no-product">No products found.</p>
                        )}
                    </div>

                   {/* pagination */}
                   <div className="d-flex justify-content-center align-items-center mt-5">
                       <Pagination count={10} color="primary" /> 
                   </div>
                </div>

             
            </div>
          </div>
        </div>
        
       
    </>
  )
}

export default Listing




