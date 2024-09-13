
import Slider from "react-slick";

import { FaArrowRightLong } from "react-icons/fa6"; 

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchSliderFromApi } from "../../utils/api";

const HomeBanner = () => {
  const [sliderData, setSliderData] = useState([]); 
 
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  useEffect(() => {
    fetchSliderFromApi("/").then((res) => {
      setSliderData(res.sliderList)
    })
  }, []); 

 
  return (
    <div className="py-2">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
                  <Slider {...settings}>
                    {
                      sliderData?.length !== 0 && sliderData?.map((item, index) => {
                        return  <div className="item" key={index}>
                        <img src={item?.photo} alt="slider1" height={400} className="rounded my-custom-size" />
                       <div className="slide-content">
                         <div className="offer-part">
                           <h6> {item?.offerText} </h6>
                           <p> {item?.discount} off </p>
                         </div>
                         <div className="main-content">
                            <h1 className="entry-title">{item?.title} </h1>
                            <p> {item?.subTitle} </p>
                          <div className="price-data">
                            <p> from </p>
                            <h1> $ {item?.price} </h1>
                          </div>
                          <Link to="/shop"> Shop Now <FaArrowRightLong /></Link> 
                         </div>
                       </div>
                    </div>
                      })
                    }
                     
                </Slider>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomeBanner



