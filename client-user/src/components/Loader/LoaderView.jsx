export default function LoaderView() {
  return (
      <div className='container mx-auto w-full flex flex-col items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500'></div>
        <p className='mt-4 text-gray-600'>Loading...</p>
      </div>
  );
}
