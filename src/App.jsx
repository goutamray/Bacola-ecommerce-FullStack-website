
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import pages 
import Home from "../src/pages/home/Home";
import Listing from './pages/listing/Listing';

// import components
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ProductModal from './components/productModal/ProductModal';


import About from './pages/about/About';
import Cart from './pages/cart/Cart';

import Contact from './pages/contact/Contact';
import MyAccount from './pages/myAccount/MyAccount';
import ProductDetails from './pages/productDetails/ProductDetails';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';


import Order from './pages/order/Order';
import NotFound from './pages/notFound/NotFound';
import { createCartData, fetchCartDataFromApi, fetchDataFromApi, fetchProductFromApi } from './utils/api';

import { ToastContainer } from 'react-toastify';
import createToast from './utils/toastify';
import WishList from './pages/wishlist/WishList';
import Checkout from './pages/checkout/Checkout';
import ThankYou from './pages/thankYou/ThankYou';
import Search from './pages/search/Search';

// context 
const MyContext = createContext();

import './App.css';
import OrderTruck from './pages/orderTruck/OrderTruck';

function App() {
  const [countryList , setCountryList ] = useState([]);
  const [selecetedCountry, setSelectedCountry ] = useState('');
  const [isOpenProductModal, setIsOpenProductModal] = useState({
    id : "",
    open : false,
  });
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true); 
  const [isLogin, setIsLogin] = useState(false); 

  const [productData, setProductData] = useState(); 
  const [categoryData, setCategoryData] = useState([]); 
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
      userId: ""
    };
  });

  const [addingCart, setAddingCart] = useState(false); 

   const [cartData, setCartData ] = useState();
   const [searchData, setSearchData] = useState([]); 


 // get all countries
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries")
  }, [])

  // get all single product modal 
  useEffect(() => {
    isOpenProductModal.open === true &&  
    fetchProductFromApi(`/${isOpenProductModal.id}`).then((res) => {
      setProductData(res.product)
    });

    fetchDataFromApi("/").then((res) => {
      setCategoryData(res); 
    }); 

  // cart all data
  fetchCartDataFromApi("/").then((res) => {
    setCartData(res.cartList);
  }); 

  }, [isOpenProductModal ]);

  const getCountry = async(url) => {
     const response = await axios.get(url).then((res) => {
      setCountryList(res?.data?.data);
     })
  }

    // login & logout 
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        setIsLogin(true); 
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData); 
      } else {
        setIsLogin(false); 
        setUser({
          name: "",
          email: "",
          userId: ""
        });
      }
    }, []);

  // get cart data 
  const getCartData = () => {
       // cart all data
      fetchCartDataFromApi("/").then((res) => {
            setCartData(res.cartList);
      }); 
  }; 
       

    // add to cart 
     const addToCart = (data) => {
      setAddingCart(true); 

      // create new cart product 
      createCartData("/add", data).then((res) => {
        
        if (res.status === true) {
          // Product added successfully
          createToast("Successfully Product Added", "success");

          setTimeout(() => {
            setAddingCart(false); 
          }, 2000);

          getCartData(); 

          return;

        } else if (res.status === false) {
          // Product already in the cart or some other issue
          return createToast("Product Already Added");
        } else {
          // Handle unexpected statuses
          return createToast("An unexpected error occurred", "error");
        }
      }).catch((error) => {
        // Handle any network or other errors
        console.error("Error adding product to cart:", error);
        createToast("Product Already Added", );
        setAddingCart(false); 
        return;
      });
    };
    
  // send all data
  const values = {
    countryList,
    selecetedCountry,
    setSelectedCountry,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow, 
    setIsHeaderFooterShow, 
    isLogin,
    setIsLogin,
    categoryData,
    setCategoryData,
    productData,
    setProductData,
    user,
    setUser,
    addToCart, 
    addingCart,
    setAddingCart,
    cartData,
    setCartData,
    getCartData,
    searchData,
    setSearchData,

  };   

  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

     <BrowserRouter >
        <MyContext.Provider value={values}>
          {/* header part */}
            {
              isHeaderFooterShow === true &&  <Header />
            }
          
                <Routes >
                  <Route  path='/' exact={true} element={ <Home /> }/>
                  <Route  path='/about' exact={true} element={ <About /> }/>
                  <Route  path='/contact' exact={true} element={ <Contact /> }/>
                  <Route  path='/category/:id' exact={true} element={ <Listing /> }/>
                  <Route  path='/product/:id' exact={true} element={ <ProductDetails /> }/>
                  <Route path="/product/:productId" exact={true} element={<ProductDetails />} />
                  <Route path="/search" exact={true} element={<Search />} />
                  <Route  path='/cart' exact={true} element={ <Cart /> }/>
                  <Route  path='/order-trucking' exact={true} element={ <OrderTruck /> }/>
                  <Route  path='/wishlist' exact={true} element={ <WishList /> }/>
                  <Route  path='/checkout' exact={true} element={ <Checkout /> }/>
                  <Route  path='/signIn' exact={true} element={ <SignIn /> }/>
                  <Route  path='/signUp' exact={true} element={ <SignUp /> }/>
                  <Route  path='/thank-you' exact={true} element={ <ThankYou /> }/>
                  <Route  path='*' exact={true} element={ <NotFound /> }/>

             
                  <Route  path='/my-account' exact={true} element={ <MyAccount /> } />
                   
                  <Route path='orders' exact={true} element={<Order />}/>
                   
               
              </Routes>

            {/* footer part  */}
             {
                isHeaderFooterShow === true &&   <Footer />
             }
           

            {/* Product modal */}
             {
                isOpenProductModal.open === true && <ProductModal data={productData}/>
             }
         
          </MyContext.Provider>
     </BrowserRouter>
    </>
  )
}

export default App
export { MyContext };



