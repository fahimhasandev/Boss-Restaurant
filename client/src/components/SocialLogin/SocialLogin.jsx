import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  // axios
  const axiosPublic = useAxiosPublic();

  // Google Login
  const hangleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log(credential, token, user);

      const userInfo = {
        email: user?.email,
        name: user?.displayName,
      };

      console.log(userInfo);
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
