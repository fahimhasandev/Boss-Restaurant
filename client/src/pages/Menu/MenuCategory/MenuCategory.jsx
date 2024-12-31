import React from 'react';
import MenuItem from '../../shared/MenuItem/MenuItem';
import Cover from '../../shared/Cover/Cover';
import coverImg from '../../../assets/menu/banner3.jpg';
import { Link } from 'react-router-dom';
const MenuCategory = ({ items, title, img }) => {
  return (
    <div className='pt-8'>
      {title && <Cover img={img} title={title} />}
      <div className='grid md:grid-cols-2 gap-10'>
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className='btn btn-outline border-0 border-b-4 mt-4'>
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
