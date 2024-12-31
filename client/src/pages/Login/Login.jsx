import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
  //useContext API
  const { signinUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email, formData.password);
    // signinUser(formData.email, formData.password).then((result) => {
    //   const user = result.user;
    //   console.log(user);
    // });
  };
  return (
    <div className='font-[sans-serif]'>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md'>
          <div className='md:max-w-md w-full px-4 py-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-12'>
                <h3 className='text-gray-800 text-3xl font-extrabold'>
                  Sign in
                </h3>
                <p className='text-sm mt-4 text-gray-800'>
                  Don't have an account{' '}
                  <Link
                    className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'
                    to='/register'
                  >
                    Register here
                  </Link>
                </p>
              </div>

              {/* Social Login */}
              <div className='space-x-10 flex justify-center mb-16 text-5xl'>
                <button type='button' className='border-none outline-none'>
                  <FcGoogle />
                </button>
                <button type='button' className='border-none outline-none'>
                  <FaFacebook />
                </button>
                <button type='button' className='border-none outline-none'>
                  <FaGithub />
                </button>
              </div>

              <div>
                <label className='text-gray-800 text-xs block mb-2'>
                  Email
                </label>
                <div className='relative flex justify-between items-center'>
                  <input
                    onChange={handleChange}
                    name='email'
                    type='text'
                    value={formData.email}
                    required
                    className='w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none'
                    placeholder='Enter email'
                  />
                  <span className='absolute right-2'>
                    <MdEmail />
                  </span>
                </div>
              </div>

              <div className='mt-8'>
                <label className='text-gray-800 text-xs block mb-2'>
                  Password
                </label>
                <div className='relative flex items-center'>
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    name='password'
                    type='password'
                    required
                    className='w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none'
                    placeholder='Enter password'
                  />
                  <span className='absolute right-2'>
                    <IoMdEye />
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap items-center justify-between gap-4 mt-6'>
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
                    Remember me
                  </label>
                </div>
                <div>
                  <a className='text-blue-600 font-semibold text-sm hover:underline'>
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className='mt-12'>
                <button
                  type='submit'
                  className='w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className='md:h-full bg-[#000842] rounded-xl lg:p-12 p-8'>
            <img
              src='https://readymadeui.com/signin-image.webp'
              className='w-full h-full object-contain'
              alt='login-image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
