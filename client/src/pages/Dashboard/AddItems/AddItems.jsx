import { FaUtensils } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(res.data);
    console.log(res.data.image.url);
  };

  return (
    <div>
      <SectionTitle heading='Add an item' subheading="What's new?" />
      <div className='bg-[#F3F3F3] w-10/12 mx-auto p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col my-10'>
            {/* Receipe Name */}
            <div className='flex flex-col m-8 '>
              <span className=''>Recipe name*</span>
              <input
                type='text'
                {...register('name')}
                placeholder='Type here'
                className='input input-bordered w-full '
              />
            </div>

            <div className='flex justify-evenly'>
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text'>Category*</span>
                </div>
                <select
                  defaultValue='default'
                  className='select select-bordered'
                  {...register('category')}
                >
                  <option disabled value='default'>
                    Category
                  </option>
                  <option>Salad</option>
                  <option>Pizza</option>
                  <option>Soup</option>
                  <option>Dessert</option>
                  <option>Drinks</option>
                </select>
              </label>
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text'>Price*</span>
                </div>
                <input
                  type='text'
                  {...register('price')}
                  placeholder='price'
                  className='input input-bordered w-full max-w-xs'
                />
              </label>
            </div>

            {/* Recipe Details */}
            <div className='flex flex-col m-8'>
              <span className=''>Recipe Details*</span>
              <textarea
                {...register('recipe')}
                className='textarea textarea-bordered'
                placeholder='Bio'
              ></textarea>
            </div>
            {/* File Input */}
            <input
              type='file'
              className='m-8 file-input  max-w-xs'
              {...register('image')}
            />
            {/* Button */}

            <button
              type='submit'
              className='btn bg-[#835D23] text-white w-full max-w-xs m-8'
            >
              Add Item
              <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
