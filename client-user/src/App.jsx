// import { useState } from 'react'
import "./App.css";
import FooterView from "./components/Footer/FooterView";
import NavbarView from "./components/Navbar/NavbarView";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <NavbarView />
      <Outlet />
      <FooterView />
    </>
  );
}

export default App;
