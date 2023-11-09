import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLogin, error } = useSelector((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isLogin) {
      console.log("loginnn");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      navigate("/");
    }

    if (error) {
      console.log(error, "errornya");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isLogin, error, navigate]);

  return (
    <>
      <div className='min-h-screen bg-gray-800 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <div className=' bg-gray-200 text-black py-2 rounded-md'>
                  Logging In...
                </div>
              ) : (
                <div className=' bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none'>
                  Login
                </div>
              )}
            </button>
          </form>
          <p className='text-gray-600 text-sm mt-4 text-center'>
            Don&apos;t have an account ? Call administrator
          </p>
        </div>
      </div>
    </>
  );
}
