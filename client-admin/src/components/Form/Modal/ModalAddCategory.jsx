import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  addCategory,
  editCategory,
} from "../../../store/actions/actionCreator";
import { useEffect, useState } from "react";
export default function ModalAddCategory({
  isOpen,
  closeModal,
  type,
  dataCategoryToEdit,
}) {
  const [isName, setName] = useState("");
  const [isId, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataCategoryToEdit) {
      setName(dataCategoryToEdit.name);
      setId(dataCategoryToEdit.id);
    }
  }, [dataCategoryToEdit]);

  let handleSubmit = (e) => {
    e.preventDefault();
    if (type == "Add") {
      dispatch(addCategory(isName));
    } else if (type == "Update") {
      dispatch(editCategory(isName, isId));
    }
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='fixed inset-0 transition-opacity'>
          <div
            className='absolute inset-0 bg-gray-900 opacity-75'
            onClick={closeModal}></div>
        </div>

        <div className='relative bg-white w-96 p-4 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>{type} Category</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='nameCategory'
                className='mb-1 block text-gray-700'>
                Name Category
              </label>
              <input
                className='w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                onChange={(e) => setName(e.target.value)}
                type='text'
                id='nameCategory'
                placeholder='Category Name'
                value={isName}
              />
            </div>

            <div className='mt-4 text-right flex'>
              <div
                className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 mr-2 rounded'
                onClick={closeModal}>
                Cancel
              </div>

              <div>
                {type === "Add" ? (
                  <>
                    <button
                      type='submit'
                      className='bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded'>
                      Add Category
                    </button>
                  </>
                ) : type === "Update" ? (
                  <>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                      Update Category
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
ModalAddCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  dataCategoryToEdit: PropTypes.object,
};
