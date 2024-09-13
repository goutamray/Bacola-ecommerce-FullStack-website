import { useRef } from "react";

import Slider from "react-slick";

// image zoom css 
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';



const ProductZoom = ({ images, discount }) => {
  const zoomSliderBig = useRef(); 
  const zoomSlider = useRef(); 

 // setting 1 
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade : false,
    arrows : true
  };

   // setting 2 
  let settings2 = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade : false,
    arrows : false 
  };

  // click to change images
  const goto = ( index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);

  };

  return (
    <>
      <div className="productZoom">
          <div className="product-zoom-box">
                          <div className="discount-pro">
                             <span> { discount } % </span>
                          </div>
                       <Slider {...settings2} className="product-galary-slider-big" ref={zoomSliderBig}>    
                          {
                            images?.map((item, index) => {
                              return  <div className="item big-photo" key={index}>
                              <div className="product-zoom">
                                  <InnerImageZoom zoomType="hover"
                                  zoomScale= "1"  src={item}  /> 
                                  
                            </div>
                          </div>
                            })
                          }
                                   
                            </Slider>
                       </div>
                     {/*galary image start  */}
                      <div className="zoom-galary">
                        <Slider {...settings} className="product-galary-slider" ref={zoomSlider}>

                        {
                          images?.map((item, index) => {
                            return  <div className="item small-photo" key={index}>
                            <img src={item} alt="zoom" onClick={() => goto(index)}/>
                        </div>
                          })
                        }
                          
                       </Slider>
                      </div>
      </div>
    </>
  )
}

export default ProductZoom





