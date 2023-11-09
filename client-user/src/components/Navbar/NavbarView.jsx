import "./navbar.css";
import imageJco from "../../assets/jco.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function NavbarView() {
  const [hamburger, setHamburger] = useState(false);

  let navbarToggle = (e) => {
    e.preventDefault();
    setHamburger(!hamburger);
  };
  return (
    <>
      <nav style={{ height: "15vh" }} className='bg-white bg-opacity-80 py-5'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='flex-shrink-0'>
            <img className='w-16 h-16' src={imageJco} alt='jco logo' />
          </div>
          <div className='hidden lg:flex space-x-7'>
            <NavLink
              to='/home'
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 font-bold text-orange-800 uppercase tracking-widest  text-jco"
                  : "font-bold text-orange-800 uppercase tracking-widest text-jco"
              }>
              HOME
            </NavLink>
            <NavLink
              to='/menu'
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 font-bold text-orange-800 uppercase tracking-widest  text-jco"
                  : "font-bold text-orange-800 uppercase tracking-widest text-jco"
              }>
              MENU
            </NavLink>
          </div>

          <div className='lg:hidden'>
            <button
              onClick={navbarToggle}
              className='text-jco text-black hover:text-black focus:outline-none'>
              ☰
            </button>
          </div>
        </div>
      </nav>
      {hamburger && (
        <div className='w-full absolute py-2  z-10 lg:hidden bg-zinc-700 text-white'>
          <ul className='container mx-auto space-y-2 px-2'>
            <li>
              <NavLink
                to='/home'
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8  uppercase tracking-widest  text-jco"
                    : " uppercase tracking-widest text-jco"
                }>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/menu'
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8  uppercase tracking-widest  text-jco"
                    : " uppercase tracking-widest text-jco"
                }>
                MENU
              </NavLink>
            </li>
          </ul>
          <div className='border-t border-gray-400 mx-10 mt-8'></div>
        </div>
      )}
    </>
  );
}
