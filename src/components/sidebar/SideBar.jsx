
// material ui 
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup'; 
import Rating from '@mui/material/Rating'; 

// range slider 
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useState } from 'react';

import sidebarImg from "../../assets/banner/sidebar.png"
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IoClose } from "react-icons/io5";

const SideBar = (props) => {
   const [value, setValue] = useState([20, 90000]);
   const [radioData, setRadioData] = useState();
   const context = useContext(MyContext);
   const [categoryId, setCategoryId] = useState(""); 
   const { id } = useParams(); 

   // Handle category selection
   const handleChange = (event) => {
      const selectedCategory = event.target.value;
       setRadioData(selectedCategory);
       setCategoryId(selectedCategory);
   
       // Immediately filter by the selected category and price range
       props.filterByPrice(value, selectedCategory);

   };

   // Set category ID from URL parameters
   useEffect(() => {
      setCategoryId(id); 
   }, [id]);

   // Trigger filtering by price range and category ID
   useEffect(() => {
   if (categoryId) {
      props.filterByPrice(value, categoryId);
   }
   }, [value, categoryId]);


   // rating change filter 
   const onRatingChange = (newRating) => {
      props?.filterByRating(newRating, categoryId); // Pass the selected rating and current category ID
      props?.openSideBarData(); 
    }; 

  return (
    <>
      <div className={`sidebar ${props.isOpenSideBar === true ? "openSidebar" : ""}`}>
        <div className="sticky">
          <div className="filterBox">
              <h6> PRODUCT CATEGORIES <button onClick={props.openSideBarData}> <IoClose /> </button> </h6>
              <div className="scroll">
                <ul>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={radioData}
                  onChange={handleChange}
                  >
                     {
                        context?.categoryData?.categoryList?.length !== 0 &&
                        context?.categoryData?.categoryList?.map((item, index) => {
                           return <li key={index} onClick={props?.openSideBarData}> 
                           <FormControlLabel value={item?._id}  control={<Radio />} label={item?.name} />
                        </li>
                        })
                     } 
                  </RadioGroup>
                </ul>
                 
              </div>
          </div>

          <div className="filterBox">
              <h6 >  FILTER BY PRICE </h6>
              <RangeSlider min={20} max={90000}  step={5} value={value} onInput={setValue} onClick={props?.openSideBarData}/>
              <div className="d-flex pt-2 pb-2 priceRange">
                 <span> From: <strong className='text-dark'>Tk : {value[0]} </strong> </span>
                 <span className='ml-auto second-price'> From: <strong className='text-dark'>Tk : {value[1]} </strong> </span>
              </div>
          </div>

          {/* Brand */}
          <div className="filterBox">
              <h6> Filter By Rating </h6>
              <div className="scroll">
                <ul>
                     <li onClick={() => onRatingChange(5)} >
                        <Rating 
                           name="read-only" 
                           value={5} 
                           readOnly 
                           size="small" 
                           
                        />
                     </li>
                     <li onClick={() => onRatingChange(4)}>
                        <Rating 
                           name="read-only" 
                           value={4} 
                           readOnly 
                           size="small" 
                          
                        />
                     </li>
                     <li onClick={() => onRatingChange(3)}>
                        <Rating 
                           name="read-only" 
                           value={3} 
                           readOnly 
                           size="small" 
                        
                        />
                     </li>
                     <li onClick={() => onRatingChange(2)}>
                        <Rating 
                           name="read-only" 
                           value={2} 
                           readOnly 
                           size="small" 
                        
                        />
                     </li>
                     <li onClick={() => onRatingChange(1)}>
                        <Rating 
                           name="read-only" 
                           value={1} 
                           readOnly
                           size="small" 
                        />
                     </li>
                </ul>
              </div>
          </div>
          <div className="image hide">
            <img src={sidebarImg} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar





