import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

//images
import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
  return (
    <section>
      <SectionTitle heading={'Order Online'} subheading={'From 11.am to 10.00pm'} />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className='mySwiper mb-24'
      >
        <SwiperSlide>
          <div>
            <img src={slide1} alt='slide1' />
            <h3 className='text-4xl uppercase text-center -mt-16 text-white'>
              Salads
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={slide2} alt='slide2' />
            <h3 className='text-4xl uppercase text-center -mt-16 text-white'>
              Pizza
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={slide3} alt='slide3' />
            <h3 className='text-4xl uppercase text-center -mt-16 text-white'>
              Soups
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={slide4} alt='slide4' />
            <h3 className='text-4xl uppercase text-center -mt-16 text-white'>
              Desert
            </h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={slide5} alt='slide5' />
            <h3 className='text-4xl uppercase text-center -mt-16 text-white'>
              Salads
            </h3>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
