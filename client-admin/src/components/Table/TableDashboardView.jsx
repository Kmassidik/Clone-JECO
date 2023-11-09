import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItem from "../Form/Modal/ModalAddItem";
import { deleteItem } from "../../store/actions/actionCreator";

export default function TableDashboardView({ items }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const dataCategory = useSelector((state) => state.category.data);
  const dispatch = useDispatch();

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className='overflow-auto lg:overflow-visible'>
      <table className='table text-sm w-full rounded-lg rounded'>
        <thead className="bg-gray-800 text-white">
          <tr>
            <th></th>
            <th className='p-3 text-center'>Name</th>
            <th className='p-3 text-center'>Description</th>
            <th className='p-3 text-center'>Price</th>
            <th className='p-3 text-center'>Category</th>
            <th className='p-3 text-center'>Ingredient</th>
            <th className='p-3 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='p-3 flex justify-center items-center'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src={item.imgUrl}
                  alt={item.name}
                />
              </td>
              <td className='p-3 text-center'>{item.name}</td>
              <td className='p-3 text-center'>
                {item.description.length > 20
                  ? item.description.slice(0, 20) + "..."
                  : item.description}
              </td>
              <td className='p-3 text-center'>Rp.{item.price}</td>
              <td className='p-3 text-center'>{item.Category.name}</td>
              <td className='p-3 text-center'>{item.ingredientsLength}</td>
              <td className='p-3 text-center'>
                <button
                  onClick={() => openEditModal(item)}
                  className='material-icons-outlined text-base text-blue-500 mx-2'>
                  edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='material-icons-round text-base text-red-500 mx-2'>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAddItem
        type='Update'
        isOpen={isModalOpen}
        closeModal={closeEditModal}
        dataItemToEdit={editingItem}
        dataCategory={dataCategory}
      />
    </div>
  );
}
TableDashboardView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      imgUrl: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
      Ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          imageUrl: PropTypes.string,
          itemId: PropTypes.number,
        })
      ),
    })
  ).isRequired,
};
