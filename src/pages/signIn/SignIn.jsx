import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../App";

import logo from "../../assets/logo/logo.png"
import google from "../../assets/logo/google.png"

// loading 
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField'; 
import { Link, useNavigate } from "react-router-dom";

import "./SignIn.css"; 
import createToast from "../../utils/toastify";
import {  createNewUser } from "../../utils/api";


const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);

  const context = useContext(MyContext)
  
  // Handle input change 
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  
  const navigate = useNavigate();

    // Handle form submit 
    const handleLoginFormSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
    
      // Validate all inputs 
      if (!input.email || !input.password) {
        setLoading(false);
        createToast("All fields are required", "error");
        return;
      }
    
      // Call login API
      createNewUser("/login", input)
        .then((res) => {
          localStorage.setItem("token", res.token);
    
          const user = {
            name: res?.user?.name,
            email: res?.user?.email,
            userId: res?.user?._id,
          };
          localStorage.setItem("user", JSON.stringify(user));
    
          createToast("User Login Successful", "success");
          navigate("/");
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
          
          if (errorMessage.includes("Email")) {
            createToast("Invalid Email. Please check your email.", "error");
          } else if (errorMessage.includes("password")) {
            createToast("Incorrect password. Please try again.", "error");
          } else {
            createToast(errorMessage, "error");
          }
        })
        .finally(() => {
          setLoading(false);
          setInput({
            email: "",
            password: "",
            isAdmin: true,
          });
        });
    };



  useEffect(() => {
    context.setIsHeaderFooterShow(false); 
  }, [context]);  

  return (
    <>
      <div className="section signInpage">
        <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                  <div className="card p-5 shadow">
                     <img src={logo} alt="logo" />
                     <h1> Sign In </h1>
                     <div className="form mt-4">
                      {/* login form  */}
                        <form onSubmit={handleLoginFormSubmit}>
                          <div className="form-group">
                            <TextField 
                                 id="standard-basic" 
                                 label="Email" 
                                 type="email"  
                                 variant="standard" 
                                 className="w-100" 
                                 name="email"
                                 value={input.email}
                                 onChange={handleInputChange}
                                />
                          </div>
                          <div className="form-group">
                              <TextField  
                                  id="standard-basic" 
                                  label="Password" 
                                  type="password" 
                                  variant="standard" 
                                  className="w-100"
                                  name="password"
                                  value={input.password}
                                  onChange={handleInputChange}
                                />
                          </div>
                          <div className="py-3">
                             <Link to="/forget-password"> Forget Password </Link> 
                          </div>
                          <div className="login-btn">
                              <button type="submit" className="my-button btn btn-lg ">       
                              {
                                loading === true ?   
                                <CircularProgress color="inherit" className="ml-3 loader "/> : 
                                "Sign In"
                              }
                              </button>
                              <Link to="/" onClick={() => context.setIsHeaderFooterShow(true)}>Cancel</Link>
                          </div>
                        </form>

                        <div className="not-account mt-3">
                          <p className="text-center">  Not have an Acount <Link to="/signUp">  <b>  Sign Up </b> </Link>  </p>
                        </div>
                        <div className="text-center mt-3 text-black">
                          <p> Or continue with social account </p>
                        </div>
                        <button className="google-btn" >
                          <img src={google} alt="google" />
                          <span>  Sign In with Google </span>
                        </button>
                     </div>
                  </div>
              </div>
              <div className="col-md-4"></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignIn




