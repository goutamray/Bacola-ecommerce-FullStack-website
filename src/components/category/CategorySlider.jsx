
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { useEffect, useState } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const CategorySlider = ({ catData }) => {
  const [categoryData, setCategoryData ] = useState([]);

  // get all category 
  useEffect(() => {
    setCategoryData(catData);
  }, [catData]);


  return (
    <div className="cat-slider py-5">
       <div className="container">
        <h3 className='mb-4 '> Featured Categories </h3>
           <div className="row">
             <div className="col">
             <Swiper
                      slidesPerView={10}
                      spaceBetween={10}
                      slidesPerGroup={1}
                      loop={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      navigation={true}
                      breakpoints={{
                        340: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 7,
                          spaceBetween: 20,
                        },
                      }}
                      modules={[ Navigation, Autoplay]}
                      className="mySwiper-data"
                    >
                        {
                          categoryData.length !== 0 &&  categoryData?.map((item, index) => {
                             return <SwiperSlide key={index} >
                             <Link to={`/category/${item?._id}`}> 
                                <div className="item" style={{ background : item.color}}>
                                   <img src={item.photo} alt="" />
                                   <h6 className='text-center'> {item.name}</h6>
                                </div>
                            </Link>
                            </SwiperSlide>
                            })
                        }
                         
                    </Swiper>
             </div>
           </div>
       </div>
    </div>
  )
}

export default CategorySlider
