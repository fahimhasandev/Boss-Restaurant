import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaFacebook, FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  // axios
  const axiosPublic = useAxiosPublic();

  // Google Login
  const hangleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      const user = result.user;

      console.log(user);
      const userInfo = () => {
        email: result.user?.email;
        name: result.user?.displayName;
      };

      // use public axios to send data to backend. THis also will check if the user existed or not
      axiosPublic
        .post('/users', userInfo)
        .then((res) => {
          console.log(res.data);
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    });
  };

  return (
    <>
      <div className='space-x-10 flex justify-center mb-16 text-5xl'>
        <button
          type='button'
          className='border-none outline-none'
          onClick={hangleGoogleSignIn}
        >
          <FcGoogle />
        </button>
        <button type='button' className='border-none outline-none'>
          <FaFacebook />
        </button>
        <button type='button' className='border-none outline-none'>
          <FaGithub />
        </button>
      </div>
      <div className='divider'>OR</div>
    </>
  );
};

export default SocialLogin;
