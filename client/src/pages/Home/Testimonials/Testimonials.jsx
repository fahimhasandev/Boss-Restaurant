import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('reviews.json')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className='w-10/12 mx-auto my-10'>
      <SectionTitle
        subheading={'What Our Clients Say'}
        heading={'TESTIMONIALS'}
      />

      <div>
        <Swiper
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className='mySwiper'
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className='flex flex-col items-center gap-4 w-9/12 mx-auto'>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <FaQuoteLeft className='text-5xl' />
                <p>{review.details}</p>
                <h3 className='text-3xl text-yellow-500'>{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
