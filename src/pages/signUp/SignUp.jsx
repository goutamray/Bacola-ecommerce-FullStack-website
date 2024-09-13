import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

// images 
import logo from "../../assets/logo/logo.png"
import google from "../../assets/logo/google.png"
import createToast from "../../utils/toastify"


// loading 
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField'; 

import "./SignUp.css";
import { createNewUser } from "../../utils/api";

const SignUp = () => {
  const [input, setInput] = useState({
    name : "",
    email : "",
    phone : "",
    password : "",
  }); 
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Set loading to true at the beginning
    setLoading(true);


    // validation 
    if (!input.name || !input.email || !input.password || !input.phone) {
      setLoading(false);
      createToast("All fields are required"); 
      return;
    }
  
    try {
      // Create user
      createNewUser("/signup", input)
        .then((res) => {
          console.log(res);
          
          setLoading(false); 
          createToast("User Register Successful", "success");
          
          // Redirect to login page after successful registration
          setTimeout(() => {
            navigate("/signIn");
          }, 2000);
          
          // Clear input fields
          setInput({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPass: "",
            isAdmin: true,
          });
        })
        .catch((error) => {
          setLoading(false);
    
          // Assuming the backend returns different error codes or messages for email and phone number conflicts
          if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data.message;
    
            if (status === 400) {
              if (errorMessage.includes("Email")) {
                // Email already exists
                createToast("Email already exists. Please use a different email.", "error");
              } else if (errorMessage.includes("Phone")) {
                // Phone number already exists
                createToast("Phone number already exists. Please use a different phone number.", "error");
              }
            } else {
              // Other errors
              createToast("Registration failed. Please try again.", "error");
            }
          } 
    
          console.error("Error during registration:", error);
        });
      } catch (error) {
        setLoading(false);
        console.error("Unexpected error:", error);
        createToast("An unexpected error occurred. Please try again.", "error");
      }
  
  };

  const context = useContext(MyContext); 

  // hide header footer 
  useEffect(() => {
    context.setIsHeaderFooterShow(false); 
  }, [context]); 

  return (
    <>
        <div className="section signInpage">
        <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                  <div className="card p-5 shadow">
                     <img src={logo} alt="logo" />
                     <h1> Sign Up </h1>
                     <div className="form mt-4">
                      {/* login form  */}
                        <form onSubmit={handleFormSubmit}>
                           <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                   <TextField 
                                      id="standard-basic" 
                                      label="First Name" 
                                      type="text" 
                                      variant="standard" 
                                      className="w-100" 
                                      name="name"
                                      value={input.name}
                                      onChange={handleInputChange}
                                    />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                 <TextField 
                                     id="standard-basic" 
                                     label="Phone Number" 
                                     type="text" 
                                     variant="standard" 
                                     className="w-100" 
                                     name="phone"
                                     value={input.phone}
                                     onChange={handleInputChange}
                                    />
                              </div>
                            </div>
                           </div>
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
                              <button className="my-button btn btn-lg " type="submit">
                                {
                                  loading === true ?   
                                  <CircularProgress color="inherit" className="ml-3 loader "/> : 
                                  "Sign Up"
                                }
                     
                              </button>
                              <Link to="/" onClick={() => context.setIsHeaderFooterShow(true)}>Cancel</Link>
                          </div>
                        </form>

                        <div className="not-account mt-3">
                          <p className="text-center">  Already have an Acount <Link to="/signIn">  <b>  Sign In </b> </Link>  </p>
                        </div>
                        <div className="text-center mt-3 text-black">
                          <p> Or continue with social account </p>
                        </div>
                        <button className="google-btn">
                          <img src={google} alt="google" />
                          <span>  Sign In with Google </span>
                        </button>
                     </div>
                  </div>
              </div>
              <div className="col-md-3"></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp


