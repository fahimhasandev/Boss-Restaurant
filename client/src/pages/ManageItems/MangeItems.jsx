import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMenu from '../../hooks/useMenu';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MangeItems = () => {
  const [menu] = useMenu();

  const handleDeleteItem = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your file has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  };

  return (
    <div>
      <SectionTitle />
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menu.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src={item.image}
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleEditItem(item._id)}
                    className='btn btn-ghost btn-lg'
                  >
                    <FaEdit className='text-red-600' />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className='btn btn-ghost btn-lg'
                  >
                    <FaTrash className='text-red-600' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeItems;
