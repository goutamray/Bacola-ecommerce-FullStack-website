
// react icons 
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";

// material ui button
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { Dialog } from "@mui/material";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition( props, ref ) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CountryDrop = () => {
  const [isOpemModal, setIsOpenModal] = useState(false);
  const [selectedTab, setSelectedTab ] = useState(null);
  
  const context = useContext(MyContext); 
  const [countryList, setCountryList ] = useState([]);

  const selectCountry = (index, country) => {
    setSelectedTab(index); 
    setIsOpenModal(false); 
    context.setSelectedCountry(country); 
  }

  useEffect(() => {
    setCountryList(context.countryList)
  }, [context.countryList]); 

  // file list 
  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();

     if(keyword !== ""){
      const list = countryList.filter((item) => {
        return item.country.toLowerCase().includes(keyword); 
      }); 
       setCountryList(list); 

     }else{
      setCountryList(context.countryList)
     }
  }


  return (
    <>
      <div >
         <Button className="countryDrop" onClick={() => setIsOpenModal(true)}>
            <div className="my-select ">
                <span className="location"> Your Location </span>
                <span className="country"> 
                  {  context.selecetedCountry !== "" ? 
                     context.selecetedCountry?.length > 12 ? 
                     context.selecetedCountry?.substr(0, 12) + '...' : 
                     context.selecetedCountry :
                     "Select Location" }
               </span>
            </div>
            <div className="ml-auto">
               <FaAngleDown />
            </div>
          </Button>
       </div>


       <Dialog  open={isOpemModal} onClose={() => setIsOpenModal(false)}  className="location-modal"  TransitionComponent={Transition}>
           <h2> Choose your Delivery Location </h2>
          <p> Enter your address and we will specify the offer for your area. </p>
          <button className="close_" onClick={() => setIsOpenModal(false)} > <IoMdClose /> </button>
          <div className="header-search w-100 mt-4">
                <button className="search"  > <IoIosSearch /> </button>
               <input type="text" placeholder="Search your area...." onChange={filterList}/>
          </div>
          <ul className="countryList">
            {
              countryList?.length !== 0 && countryList?.map((item, index) => {
                return (
                  <li key={index}> 
                      <Button 
                      onClick={() => selectCountry(index, item?.country )}
                      className={` ${ selectedTab === index ? "active" : "" }`}
                       > 
                        {item?.country} 
                      </Button> 
                  </li>
                )
              })
            }
          
          </ul>
       </Dialog>
    </>
  )
}

export default CountryDrop



