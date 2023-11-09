import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addNewItem, editNewItem } from "../../../store/actions/actionCreator";
import { useDispatch } from "react-redux";

export default function ModalAddItem({
  type,
  isOpen,
  closeModal,
  dataCategory,
  dataItemToEdit,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    description: "",
    price: "",
    category: "",
    ingredients: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", imageUrl: "" }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == "Add") {
      dispatch(addNewItem(formData));
    } else if (type == "Update") {
      dispatch(editNewItem(formData, dataItemToEdit.id));
    }
    closeModal();
  };

  useEffect(() => {
    if (dataItemToEdit) {
      setFormData({
        name: dataItemToEdit.name ? dataItemToEdit.name : "",
        imgUrl: dataItemToEdit.imgUrl ? dataItemToEdit.imgUrl : "",
        description: dataItemToEdit.description
          ? dataItemToEdit.description
          : "",
        price: dataItemToEdit.price ? dataItemToEdit.price : "",
        category: dataItemToEdit.categoryId ? dataItemToEdit.categoryId : "",
        ingredients: dataItemToEdit.Ingredients
          ? dataItemToEdit.Ingredients
          : [],
      });
    }
  }, [dataItemToEdit]);

  return (
    <div
      className={`fixed  inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}>
      <div className='flex  items-center justify-center min-h-screen'>
        <div className='fixed inset-0 transition-opacity'>
          <div
            className='absolute inset-0 bg-gray-900 opacity-75'
            onClick={closeModal}></div>
        </div>

        <div className='relative bg-gray-800 text-white px-14 py-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>{type} Item</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-sm font-semibold mb-2'
                htmlFor='name'>
                Name
              </label>
              <input
                className='text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-sm font-semibold mb-2'
                htmlFor='imgUrl'>
                Image URL
              </label>
              <input
                className='text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Image URL'
                name='imgUrl'
                value={formData.imgUrl}
                onChange={handleChange}
              />
            </div>
            <div className='mb-2'>
              <label
                className='block text-sm font-semibold mb-2'
                htmlFor='description'>
                Description
              </label>
              <textarea
                className='text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-sm font-semibold mb-2'
                htmlFor='price'>
                Price
              </label>
              <input
                className='text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                placeholder='Price'
                name='price'
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-sm font-semibold mb-2'
                htmlFor='category'>
                Category
              </label>
              <select
                className='text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                name='category'
                value={formData.category}
                onChange={handleChange}>
                <option value=''>Select Category</option>
                {dataCategory.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2'>
                Ingredients
              </label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className='flex mb-2'>
                  <input
                    className='shadow text-black appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-2'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(e, index)}
                  />
                  <input
                    className='shadow text-black appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-2'
                    type='text'
                    placeholder='image URL'
                    name='imageUrl'
                    value={ingredient.imageUrl ? ingredient.imageUrl : ""}
                    onChange={(e) => handleIngredientChange(e, index)}
                  />

                  {type === "Add" ? (
                    <>
                      <button
                        type='button'
                        className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                        onClick={() => handleRemoveIngredient(index)}>
                        Remove
                      </button>
                    </>
                  ) : null}
                </div>
              ))}

              {type === "Add" ? (
                <>
                  <button
                    type='button'
                    className='px-2 py-1 text-white rounded bg-purple-500 hover:bg-purple-600'
                    onClick={handleAddIngredient}>
                    Add Ingredient
                  </button>
                </>
              ) : null}
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

ModalAddItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  dataCategory: PropTypes.array.isRequired,
  dataItemToEdit: PropTypes.object,
};
