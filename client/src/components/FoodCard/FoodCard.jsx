import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ items }) => {
  const { user } = useAuth();
  const { name, image, price, recipe, _id } = items;
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  //we will not use cart in here, just refetch
  const [, refetch] = useCart();
  const handleAddToCart = (food) => {
    if (user && user.email) {
      //send cart item to the database.
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      // send data to backend '/carts'
      axiosSecure.post('/carts', cartItem).then((res) => {
        console.log(res.data);

        // show users that data was added to cart
        if (res.data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${name} added to you cart`,
            showConfirmButton: false,
            timer: 1500,
          });

          // After showing confirmation to user's that data was added to cart and
          // refech cart to update the cart items counts
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: 'Please login to add to the cart',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,Login',
      }).then((result) => {
        if (result.isConfirmed) {
          //Send the user to the login page
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

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
          <button
            onClick={handleAddToCart}
            className='bg-slate-100 btn btn-outline border-0 border-b-4 mt-4'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
