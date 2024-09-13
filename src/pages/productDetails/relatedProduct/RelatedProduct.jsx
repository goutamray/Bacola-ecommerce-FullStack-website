import ProductItem from "../../../components/productItem/ProductItem"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';



import "./ProductRelated.css"
const RelatedProduct = ( { title, relatedProducts }) => {

  return (
    <>
        <div className="related-Product ">
          <div className="container">
            <div className="row">
              <div className="col">
              <div className="product-slider">
                  <div className="product-header">
                     <div>
                        <h2> { title } </h2>
                    </div>
                  </div>

                  <div className="product_row_all mt-4">
                      <Swiper
                          slidesPerView={5}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                   
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
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 50,
                            },
                          }}
                          navigation={true}
                          modules={[  Navigation]}
                          className="mySwiper"
                        >
                          {
                            relatedProducts?.length !== 0 && 
                            relatedProducts?.map((item, index) => {
                              return  <SwiperSlide key={index}>
                              <ProductItem item={item}/>
                           </SwiperSlide>
                            })
                          }
                      

                          {/* <SwiperSlide>
                             <ProductItem />
                          </SwiperSlide>

                          <SwiperSlide>
                             <ProductItem />
                          </SwiperSlide>

                          <SwiperSlide>
                             <ProductItem />
                          </SwiperSlide>

                          <SwiperSlide>
                             <ProductItem />
                          </SwiperSlide>

                          <SwiperSlide>
                             <ProductItem />
                          </SwiperSlide> */}
                    </Swiper>
                          
                  </div>
               </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default RelatedProduct




