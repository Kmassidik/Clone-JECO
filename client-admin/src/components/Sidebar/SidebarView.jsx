import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarView() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <div className='w-56 bg-gray-800 text-white px-10'>
        <aside className='min-h-screen flex flex-col justify-center'>
          <ul className='list-none'>
            <li className='py-3'>
              <NavLink
                to='/dashboard'
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8 text-orange-500 font-bold"
                    : "text-white"
                }>
                <div className='flex'>
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
                      d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                    />
                  </svg>
                  <div className='ml-2'>Dashboard</div>
                </div>
              </NavLink>
            </li>
            <li className='py-3'>
              <NavLink
                to='/category'
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8 text-orange-500 font-bold"
                    : "text-white"
                }>
                <div className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
                    />
                  </svg>
                  <div className='ml-2'>Category</div>
                </div>
              </NavLink>
            </li>
            <li className='py-3'>
              <NavLink
                to='/add-admin'
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8 text-orange-500 font-bold"
                    : "text-white"
                }>
                <div className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <div className='ml-2'>New Admin</div>
                </div>
              </NavLink>
            </li>
            <li className='py-3'>
              <div className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                  />
                </svg>
                <div className='ml-2'>
                  <button onClick={logout}>Sign Out</button>
                </div>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
