import TableDashboardView from "../components/Table/TableDashboardView";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  fetchCategories,
  handleErrorItems,
} from "../store/actions/actionCreator";
import ModalAddItem from "../components/Form/Modal/ModalAddItem";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

export default function DashboardPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.items.data);
  const loading = useSelector((state) => state.items.loading);
  const error = useSelector((state) => state.items.error);
  const detailItem = useSelector((state) => state.items.detailItem);
  const messageItem = useSelector((state) => state.items.message);

  const dataCategory = useSelector((state) => state.category.data);

  const [isModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
    if (detailItem.message) {
      Toast.fire({
        icon: "success",
        title: `${detailItem.message}`,
      });
      dispatch(handleErrorItems());
    }

    if (detailItem.newItem) {
      Toast.fire({
        icon: "success",
        title: `${detailItem.newItem.name} has been add!`,
      });
      dispatch(handleErrorItems());
    }

    if (messageItem) {
      Toast.fire({
        icon: "success",
        title: `${messageItem}`,
      });
      dispatch(handleErrorItems());
    }
  }, [dispatch, detailItem, messageItem]);

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
    dispatch(handleErrorItems());
  }
  return (
    <>
      <div className='py-10 px-10'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
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
            <div className="ml-1">Menu</div>
          </button>
        </div>
      </div>
      <div className='mx-10 bg-white shadow-md rounded-lg rounded'>
        <TableDashboardView items={data} />
      </div>
      <ModalAddItem
        type={"Add"}
        isOpen={isModal}
        closeModal={closeModal}
        dataCategory={dataCategory}
      />
    </>
  );
}
