import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImages from '../../../assets/home/featured.jpg';
import './featured.css';

const Featured = () => {
  return (
    <div className='featured-item bg-fixed text-white pt-8 my-20'>
      <SectionTitle subheading={'Check it out'} heading={'Featured Item'} />
      <div className='md:flex justify-center items-center py-12 px-16 bg-slate-500 bg-opacity-40'>
        <div>
          <img className='w-[800px]' src={featuredImages} alt='' />
        </div>
        <div className='md:ml-10'>
          <p>Aug 20, 2029</p>
          <p>Where Can I get some?</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
            debitis eveniet, laborum earum corporis enim itaque vel pariatur
            perspiciatis voluptate.
          </p>
          <button className='btn btn-outline border-0 border-b-2'>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
