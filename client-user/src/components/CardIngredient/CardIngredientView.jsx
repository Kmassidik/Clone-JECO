import PropTypes from "prop-types";
export default function CardIngredientView({ ingredient: { name, imageUrl } }) {
  return (
    <div className='w-1/4 mx-auto'>
      <div className='bg-white rounded-lg py-4'>
        <div className='relative'>
          <img src={imageUrl} alt='Donut' className='w-full h-auto rounded-lg' />
        </div>
        <h3 className='mt-1 text-xl text-center font-semibold'>
          {name}
        </h3>
      </div>
    </div>
  );
}

CardIngredientView.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
