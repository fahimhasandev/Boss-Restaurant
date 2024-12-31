import React from 'react';

const FoodCard = ({ items }) => {
  const { name, image, price, recipe } = items;
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>
        ${price}
      </p>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p className=''>{recipe}</p>
        <div className='card-actions justify-end'>
          <button className='bg-slate-100 btn btn-outline border-0 border-b-4 mt-4'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
