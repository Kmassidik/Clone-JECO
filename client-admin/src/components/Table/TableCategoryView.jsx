import { useState } from "react";
import PropTypes from "prop-types";
import ModalAddCategory from "../Form/Modal/ModalAddCategory";
import { deleteCategory } from "../../store/actions/actionCreator";
import { useDispatch } from "react-redux";

export default function TableCategoryView({ data }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const dispatch = useDispatch();

  const openEditModal = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingCategory(null);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className='overflow-auto lg:overflow-visible'>
      <table className='table text-sm w-full rounded-lg rounded'>
        <thead className="bg-gray-800 text-white">
          <tr>
            <th></th>
            <th className='p-3 text-center'>Name</th>
            <th className='p-3 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category, index) => (
            <tr key={category.id}>
              <td className='p-3 text-center'>{index + 1}</td>
              <td className='p-3 text-center'>{category.name}</td>
              <td className='p-3 text-center'>
                <button
                  className='material-icons-outlined text-base text-blue-500 mx-2'
                  onClick={() => openEditModal(category)} 
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className='material-icons-round text-base text-red-500 mx-2'>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAddCategory
        isOpen={isModalOpen}
        closeModal={closeEditModal}
        type='Update'
        dataCategoryToEdit={editingCategory}
      />
    </div>
  );
}

TableCategoryView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
