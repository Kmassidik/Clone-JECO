import TableCategoryView from "../components/Table/TableCategoryView";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  handleErrorCategory,
} from "../store/actions/actionCreator";
import ModalAddCategory from "../components/Form/Modal/ModalAddCategory";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

export default function CategoryPage() {
  let dispatch = useDispatch();

  let data = useSelector((state) => state.category.data);
  let loading = useSelector((state) => state.category.loading);
  let error = useSelector((state) => state.category.error);
  let detailCategory = useSelector((state) => state.category.detailCategory);
  let messageCategory = useSelector((state) => state.category.message);

  const [isModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    if (detailCategory.id) {
      Toast.fire({
        icon: "success",
        title: `${detailCategory.name} has been added!`,
      });
      dispatch(handleErrorCategory());
    }

    if (messageCategory) {
      Toast.fire({
        icon: "success",
        title: `${messageCategory}`,
      });
      dispatch(handleErrorCategory());
    }
  }, [dispatch, detailCategory, messageCategory]);

  if (error) {
    Toast.fire({
      icon: "error",
      title: `${error}`,
    });
    dispatch(handleErrorCategory());
  }

  if (loading) {
    return (
      <div className='container mx-auto w-full flex flex-col items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500'></div>
        <p className='mt-4 text-gray-600'>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className='py-10 px-10'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Category</h1>
          <button
            onClick={openModal}
            className='flex font-bold bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500 mt-4 focus:outline-none px-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <div className="ml-1">Category</div>
          </button>
        </div>
      </div>
      <div className='mx-10 bg-white shadow-md rounded-lg rounded'>
        <TableCategoryView data={data} />
      </div>

      <ModalAddCategory type={"Add"} isOpen={isModal} closeModal={closeModal} />
    </>
  );
}
