import CardDonutView from "../components/CardDonut/CardDonutView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/actions/actionCreator";
import LoaderView from "../components/Loader/LoaderView";

export default function MenuPage() {
  const dispatch = useDispatch();
  const {
    data: dataItem,
    loading,
    error,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) {
    return <LoaderView />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className='container mx-auto'>
        <div className='text-4xl font-bold py-5 text-center text-orange-800 uppercase mt-10 tracking-widest'>
          <span className='border-b-2 border-orange-500'>Our Product</span>
        </div>
        <div className='flex flex-wrap mt-10'>
          {dataItem.map((donut) => (
            <CardDonutView key={donut.id} donut={donut} />
          ))} 
        </div>
      </div>
    </>
  );
}
