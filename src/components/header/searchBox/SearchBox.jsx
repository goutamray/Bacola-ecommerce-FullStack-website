import { useContext, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { fetchSearchProductData } from "../../../utils/api";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";


// loading 
import CircularProgress from '@mui/material/CircularProgress';

const SearchBox = ( { hanleOpenSearch }) => {
  const [searchFields, setSearchFields] = useState("");
  const [loading, setLoading] = useState(false); 

 const context = useContext(MyContext); 

 const navigate = useNavigate()

  // input value change 
  const onChangeValue = (e) => {
    setSearchFields(e.target.value);
  }

   // search products 
  const searchProducts = () => {
    setLoading(true)

    // query data form database 
    fetchSearchProductData(`?q=${searchFields}`).then((res) => {
      context.setSearchData(res);
      hanleOpenSearch()
    
      setTimeout(() => {
        setLoading(false); 
        setSearchFields("");
      }, 2000);
      navigate("/search"); 
    })
  }



  return (
    <>
          <div className="header-search">
               <input type="text"placeholder="Search for products...." onChange={onChangeValue} value={searchFields}/>
                <button 
                   className="search"
                   onClick={searchProducts}
                > 

              {
                loading === true ?   
                <CircularProgress color="inherit" className="ml-3 loader "/> 
                : <IoIosSearch /> 
              }
                  
                </button>
          </div>
    </>
  )
}

export default SearchBox



