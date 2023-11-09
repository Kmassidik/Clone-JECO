import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, handleErrorAddAdmin } from "../../store/actions/actionCreator";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

export default function AddAdmin() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);
  const message = useSelector((state) => state.login.message);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (message) {
      Toast.fire({
        icon: "success",
        title: `${message.email} has been add`,
      });
      dispatch(handleErrorAddAdmin())
    }
  }, [dispatch,message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    dispatch(addAdmin(formData));
  };

  if (loading) {
    return (
      <div className='container mx-auto w-full flex flex-col items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500'></div>
        <p className='mt-4 text-gray-600'>Loading...</p>
      </div>
    );
  }

  if (error) {
    Toast.fire({
      icon: "error",
      title: `${error}`,
    });
    dispatch(handleErrorAddAdmin())
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6'>Add Admin</h2>
        <form onSubmit={handleAddAdmin}>
          {/* username */}
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-bold mb-2'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-black'
              placeholder='Enter your username'
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-bold mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-black'
              placeholder='Enter your email'
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-black'
              placeholder='Enter your password'
              onChange={handleChange}
            />
          </div>
          {/* Phone Number */}
          <div className='mb-4'>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-bold mb-2'>
              Phone Number
            </label>
            <input
              type='number'
              id='phoneNumber'
              name='phoneNumber'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-black'
              placeholder='Enter your phone number'
              onChange={handleChange}
            />
          </div>
          {/* address */}
          <div className='mb-4'>
            <label
              htmlFor='address'
              className='block text-sm font-bold mb-2'>
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-black'
              placeholder='Enter your address'
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            className='w-full font-bold bg-orange-600 text-white py-2 rounded-md hover:bg-orange-900 mt-4 focus:outline-none'>
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
}
