import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailItem } from "../store/actions/actionCreator";
import CardIngredientView from "../components/CardIngredient/CardIngredientView";
import LoaderView from "../components/Loader/LoaderView";
import { Link } from "react-router-dom";

import gsap from "gsap";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.itemDetail);

  useEffect(() => {
    console.log(id);
    dispatch(fetchDetailItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".container", {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/"); // Navigate back to the home page
    }
  }, [error, navigate]);

  if (loading) {
    return <LoaderView />;
  }

  if (error) {
    return <>err</>;
  }

  if (data && data.id) {
    return (
      <>
        {" "}
        <div className='container mx-auto mt-6 p-4'>
          <div className='flex flex-wrap items-start'>
            <div className='w-full md:w-1/2 pr-4'>
              <div className='max-w-full'>
                <img
                  src={data.imgUrl}
                  alt={data.name}
                  className='mt-4 max-w-full rounded-lg shadow-md'
                />
              </div>
              <h2 className='mt-3 text-lg font-semibold'>Ingredients:</h2>
              <div className='flex flex-wrap mt-2'>
                {data && data.Ingredients && data.Ingredients.length > 0 ? (
                  data.Ingredients.map((ingredient) => (
                    <CardIngredientView
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  ))
                ) : (
                  <p>No ingredients listed.</p>
                )}
              </div>
            </div>
            <div className='w-full md:w-1/2 mt-4 flex flex-col p-4 rounded-lg'>
              <h1 className='text-6xl font-bold underline text-orange-800 text-center tracking-widest'>
                {data.name}
              </h1>
              <div className='bg-white p-4 rounded-lg mt-10 border'>
                <div className='flex items-center mb-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 mr-1'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                  Author : {data.User.username}
                </div>
              </div>
              <div className='bg-white p-4 rounded-lg mt-4 border'>
                <p className='text-gray-700 mb-2 flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 mr-1'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                    />
                  </svg>
                  Description : {data.description}
                </p>
              </div>
              <div className='bg-white p-4 rounded-lg mt-4 border flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 mr-1'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 6h.008v.008H6V6z'
                  />
                </svg>
                Category: {data.Category.name}
              </div>
              <div className='bg-white p-4 rounded-lg mt-4 border flex'>
                <p className='text-xl font-semibold text-orange-800'>
                  Rp.{data.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className='container mx-auto mt-6 p-4 text-center min-h-screen flex flex-col justify-center'>
        <h1 className='text-4xl text-red-500 font-semibold mb-4'>
          404 - Not Found
        </h1>
        <p className='text-xl text-gray-600 mb-4'>
          The page youre looking for does not exist.
        </p>
        <Link to='/'>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Back to Menu</button>
        </Link>
      </div>
    );
  }
}
