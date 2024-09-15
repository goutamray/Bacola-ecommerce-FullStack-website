
// react icons 
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

import { useState } from "react";

import "./Contact.css"
import createToast from "../../utils/toastify";
import { postMessageData } from "../../utils/api";
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name : "",
    email: "",
    message: "",
    subject: "",
  });
  
  // Handle input change 
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

   // Handle form submit 
   const handleContactFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate all inputs 
    if ( !input.name || !input.email || !input.message || !input.subject) {
      setLoading(false);
      createToast("All fields are required", "error");
      return;
    }
  
    // Call contact API
    postMessageData("/create", input)
      .then((res) => {
        createToast("Message Send Successful", "success");

        setInput({
          name : "",
          email: "",
          message: "",
          subject: "",
        }) 
      })
      .catch((err) => {
         console.log(err.message);
         createToast("Message Send Failed", "success");
      })

  };



  return (
    <>
      <div className="contact-section">
        <div className="container">
           <div className="row">
            <div className="col">
              <div className="contact-text">
                 <h2> Get In Touch </h2>
                  <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel. </p>
              </div>  
            </div>
           </div>
           <div className="row mt-5">
            <div className="col-md-4">
               <div className="contact-part">
                 <span> <FaMapMarkerAlt /> </span>
                 <h6> 102 Street 2714 Donovan </h6>
                 <p> Lorem ipsum dolor, sit amet consectetur. </p>
               </div>
            </div>
            <div className="col-md-4">
             <div className="contact-part">
                 <span> <FaPhoneVolume /> </span>
                 <h6> +8809638902053 </h6>
                 <p> Lorem ipsum dolor, sit amet consectetur. </p>
               </div>
            </div>
            <div className="col-md-4">
              <div className="contact-part">
                 <span> <IoMailOutline /> </span>
                 <h6> goutamr362@gmail.com</h6>
                 <p> Lorem ipsum dolor, sit amet consectetur. </p>
               </div>
            </div>
           </div>
        </div>
      </div>
      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
             <div className="col-md-8 shadow p-5">
                <div className="form-text">
                   <h2> Send Us </h2>
                   <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sed dolorem earum dicta sapiente eveniet officia! Expedita aut iste sapiente. </p>
                </div>
              <div className="form py-5">
                  <form onSubmit={handleContactFormSubmit}>
                     <div className="row">
                      <div className="col-md-6">
                       <div className="mb-3">
                          <label htmlFor="name" className="form-label"> Name </label>
                          <input 
                             type="text" 
                             className="form-control" 
                             id="name"
                             name="name"
                             value={input.name}
                             onChange={handleInputChange}
                           />
                        </div>
                      </div>
                      <div className="col-md-6">
                       <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email address</label>
                          <input 
                             type="email"  
                             className="form-control" 
                             id="email" 
                             name="email"
                             value={input.email}
                             onChange={handleInputChange}
                            />
                        </div>
                      </div>
                     </div>
                     <div className="mb-3">
                          <label htmlFor="subject" className="form-label"> Subject </label>
                          <input 
                             type="text" 
                             className="form-control" 
                             id="subject"
                             name="subject"
                             value={input.subject}
                             onChange={handleInputChange} 
                            />
                      </div>
                     <div className="mb-3">
                       <div className="mb-3">
                          <label htmlFor="message" className="form-label"> Message </label>
                           <textarea 
                               className="form-control" 
                                id="message" 
                                rows="4"
                                name="message"
                                value={input.message}
                                onChange={handleInputChange}
                             >
                             </textarea>
                       </div>
                      </div>
                    <button type="submit"> Send Message </button>
                  </form>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
