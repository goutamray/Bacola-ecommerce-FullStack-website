
import { Link } from "react-router-dom";
import error from "../../assets/404.webp";

import "./NotFound.css";
const NotFound = () => {
  return (
    <>
      <div className="right-content py-5">
         <div className="all-error">
          <img src={error} alt="" />
          <div className="content-error">
            <h2> OOOPS! THIS PAGE CANT BE FOUND. </h2>
            <p> Its looks like nothing was found at this location. </p>
            <button className="btn btn-primary btn-lg mt-5">
              <Link to="/" className="text-white">  Back To Home </Link> 
            </button>
          </div>
         </div>
      </div>
    </>
  )
}

export default NotFound



