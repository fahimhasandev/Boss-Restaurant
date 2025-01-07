import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { AuthContext } from '../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import {Helmet} from 'react-helmet-async'
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password).then( result => {
      const loggedUser = result.useForm
    })
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>Boss Restaurant | Sign Up</title>
      </Helmet>

      <div className='font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4'>
        <div className='grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden'>
          <div className='max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4'>
            <div>
              <h4 className='text-white text-lg font-semibold'>
                Create Your Account
              </h4>
              <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 className='text-white text-lg font-semibold'>
                Simple & Secure Registration
              </h4>
              <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <form
            className='md:col-span-2 w-full py-6 px-6 sm:px-16'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mb-6'>
              <h3 className='text-gray-800 text-2xl font-bold'>
                Create an account
              </h3>
            </div>

            <div className='space-y-6'>
              <div className='form-control'>
                <label className='text-gray-800 text-sm mb-2 block'>Name</label>
                <div className='relative flex items-center'>
                  <input
                    name='name'
                    type='text'
                    {...register('name', { required: true, maxLength: 25 })}
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter name'
                  />
                  <FaRegUser className='w-4 h-4 absolute right-4 text-slate-300' />
                </div>
                {errors.name && (
                  <span>This field is required and maxlength 25</span>
                )}
              </div>

              <div className='form-control'>
                <label className='text-gray-800 text-sm mb-2 block'>
                  Email Id
                </label>
                <div className='relative flex items-center'>
                  <input
                    {...register('email', { required: true })}
                    name='email'
                    type='email'
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter email'
                  />
                  <MdOutlineMail className='w-4 h-4 absolute right-4 text-slate-300' />
                </div>
                {errors.email && <span>This field is required</span>}
              </div>

              <div className='form-control'>
                <label className='text-gray-800 text-sm mb-2 block'>
                  Password
                </label>
                <div className='relative flex items-center'>
                  <input
                    {...register('password', { required: true })}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter password'
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className='w-4 h-4 absolute right-4 cursor-pointer text-slate-300'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className='text-red-600'>This field is required</span>
                )}
              </div>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />

                <label
                  htmlFor='remember-me'
                  className='ml-3 block text-sm text-gray-800'
                >
                  I accept the
                  <Link
                    to={'/'}
                    className='text-blue-600 font-semibold hover:underline ml-1'
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            <div className='!mt-12'>
              <button
                type='submit'
                className='w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none'
              >
                Create an account
              </button>
            </div>
            <p className='text-gray-800 text-sm mt-6 text-center'>
              Already have an account?{' '}
              <Link
                to={'/login'}
                className='text-blue-600 font-semibold hover:underline ml-1'
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
