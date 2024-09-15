
import axios from "axios"

/**
 *  fetch category data from api
 * @param {*} url 
 * @returns 
 */
export const fetchDataFromApi = async(url) => {
   try {
      const response = await axios.get("http://localhost:5050/api/v1/category"+url);
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 

/**
 * Create category data
 * @param {string} url - The endpoint URL (e.g., "/create")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const postData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/category${url}`, formData); 
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};


/**
 * edit category data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const editData = async( url, updatedData ) => {
  try {
   const { res } = await axios.patch(`http://localhost:5050/api/v1/category${url}`, updatedData); 
   return res;  
  } catch (error) {
   console.error('Error submitting form data:', error.message);
   throw error; // Re-throw the error for handling in the calling func
  }
}; 


/**
 * delete category data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteData = async( id ) => {
   try {
      const { res } = await axios.delete(`http://localhost:5050/api/v1/category${id}`); 
      return res; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 * send product data to api 
 * @param {*} url 
 * @param {*} formData 
 * @returns 
 */
export const productData = async (url, formData) => {
   try {
       const res = await axios.post(`http://localhost:5050/api/v1/product${url}`, formData);
       return res.data; // Return the data property from the response
   } catch (error) {
       console.error('Error submitting form data:', error.message);
       throw error; // Re-throw the error for handling in the calling function
   }
};


/**
 *  fetch product data from api
 * @param {*} url 
 * @returns 
 */
export const fetchProductFromApi = async(url) => {
   try {
      const res = await axios.get("http://localhost:5050/api/v1/product"+url);
      return res.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
    
};


/**
 * delete product data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteProductData = async( id ) => {
   try {
      const res = await axios.delete(`http://localhost:5050/api/v1/product${id}`); 
      return res.data; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 

/**
 * edit product data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const editProductData = async( url, updatedData ) => {
   try {
    const res = await axios.patch(`http://localhost:5050/api/v1/product${url}`, updatedData); 
    return res.data;  
   } catch (error) {
    console.error('Error submitting form data:', error.message);
    throw error; // Re-throw the error for handling in the calling func
   }
 }; 
 

/**
 * send brand data to database from api 
 * @param {*} url 
 * @param {*} formData 
 * @returns 
 */
export const createBrandData = async(url, formData) => {
   try {
      const response = await axios.post("http://localhost:5050/api/v1/brand"+ url, formData); 
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 *  fetch data from api
 * @param {*} url 
 * @returns 
 */
export const fetchBrandDataFromApi = async(url) => {
   try {
      const response = await axios.get("http://localhost:5050/api/v1/brand"+url);
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 

/**
 * delete brand data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteBrandData = async( id ) => {
   try {
      const response = await axios.delete(`http://localhost:5050/api/v1/brand${id}`); 
      return response.data; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 * edit brand data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const editBrandData = async( url, updatedData ) => {
   try {
    const response = await axios.patch(`http://localhost:5050/api/v1/brand${url}`, updatedData); 
    return response.data;  
   } catch (error) {
    console.error('Error submitting form data:', error.message);
    throw error; 
   }
 }; 

/**
 * send sub category data to database from api 
 * @param {*} url 
 * @param {*} formData 
 * @returns 
 */
export const createSubCategoryData = async(url, formData) => {
   try {
      const response = await axios.post("http://localhost:5050/api/v1/subCategory"+ url, formData); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 *  fetch data from api
 * @param {*} url 
 * @returns 
 */
export const fetchSubCategoryDataFromApi = async(url) => {
   try {
      const res = await axios.get("http://localhost:5050/api/v1/subCategory"+url);
      return res.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 

/**
 * delete sub category data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteSubCategoryData = async( id ) => {
   try {
      const res = await axios.delete(`http://localhost:5050/api/v1/subCategory${id}`); 
      return res.data; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 

/**
 * edit sub category data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const editSubCategoryData = async( url, updatedData ) => {
   try {
    const res = await axios.patch(`http://localhost:5050/api/v1/subCategory${url}`, updatedData); 
    return res.data;  
   } catch (error) {
    console.error('Error submitting form data:', error.message);
    throw error; 
   }
 }; 


 /**
 * send product data to api 
 * @param {*} url 
 * @param {*} formData 
 * @returns 
 */
 export const createNewUser = async (url, formData) => {
   try {
       const response = await axios.post(`http://localhost:5050/api/v1/user${url}`, formData);
       return response.data; // Return the data property from the response
   } catch (error) {
       console.error('Error submitting product form data:', error.message);
       throw error; // Re-throw the error for handling in the calling function
   }
};

/**
 *  fetch user from api
 * @param {*} url 
 * @returns 
 */
export const fetchUserDataFromApi = async(url) => {
   try {
      const res = await axios.get("http://localhost:5050/api/v1/user"+url);
      return res.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 

/**
 * update user data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const updateUserData = async( url, updatedData ) => {
   try {
    const response = await axios.patch(`http://localhost:5050/api/v1/user${url}`, updatedData); 
   
     return response.data;  
   } catch (error) {
    console.error('Error submitting form data:', error.message);
    throw error; 
   }
 }; 


/**
 * update user password data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const changePassData = async (url, formData) => {
   try {
     const response = await axios.patch(`http://localhost:5050/api/v1/user${url}`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data'  // Ensure correct headers are set
       }
     });
     return response.data;
   } catch (error) {
     console.error('Error submitting form data:', error.message);
     throw error;
   }
 };
 

/**
 * Create cart data
 * @param {string} url - The endpoint URL (e.g., "/add")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const createCartData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/cart${url}`, formData); 
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 *  fetch cart data from api
 * @param {*} url 
 * @returns 
 */
export const fetchCartDataFromApi = async(url) => {
   try {
      const response = await axios.get("http://localhost:5050/api/v1/cart"+url);
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 


/**
 * delete cart data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteCartData = async( id ) => {
   try {
      const res = await axios.delete(`http://localhost:5050/api/v1/cart${id}`); 
      return res.data; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 * edit cart data from api 
 * @param {*} url 
 * @param {*} updatedData 
 * @returns 
 */
export const editcartData = async( url, updatedData ) => {
   try {
    const res = await axios.patch(`http://localhost:5050/api/v1/cart${url}`, updatedData); 
    return res.data;  
   } catch (error) {
    console.error('Error submitting form data:', error.message);
    throw error; // Re-throw the error for handling in the calling func
   }
 }; 
 

/**
 * Create review data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const createReviewData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/review${url}`, formData); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 * Create review data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const getReviewData = async(url ) => {
   try {
       const response = await axios.get("http://localhost:5050/api/v1"+url);
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};



/**
 *  fetch Wishlist data from api
 * @param {*} url 
 * @returns 
 */
export const fetchWishlistDataFromApi = async(url) => {
   try {
      const response = await axios.get("http://localhost:5050/api/v1/wishlist"+url);
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 

/**
 * Create wishlist data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const createWishListData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/wishlist${url}`, formData); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 * delete cart data from api 
 * @param {*} id 
 * @returns 
 */
export const deleteWishlistData = async( id ) => {
   try {
      const res = await axios.delete(`http://localhost:5050/api/v1/wishlist${id}`); 
      return res.data; 
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
}; 


/**
 * Create order data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const createOrderData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/order${url}`, formData); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 * All order data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const fetchAllOrderData = async(url) => {
   try {
      const response = await axios.get(`http://localhost:5050/api/v1/order${url}`); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 *  fetch slider data from api
 * @param {*} url 
 * @returns 
 */
export const fetchSliderFromApi = async(url) => {
   try {
      const response = await axios.get("http://localhost:5050/api/v1/slider"+url);
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }  
}; 


/**
 * All order data
 * @param {string} url - The endpoint URL (e.g., "/")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const fetchSearchProductData = async(url) => {
   try {
      const response = await axios.get(`http://localhost:5050/api/v1/search${url}`); 
       return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

/**
 * Create message data
 * @param {string} url - The endpoint URL (e.g., "/create")
 * @param {FormData} formData - The form data to submit
 * @returns {Promise<Object>} - The response data from the server
 */
export const postMessageData = async(url, formData) => {
   try {
      const response = await axios.post(`http://localhost:5050/api/v1/message${url}`, formData); 
      return response.data;
   } catch (error) {
      console.error('Error submitting form data:', error.message);
      throw error; 
   }
};

