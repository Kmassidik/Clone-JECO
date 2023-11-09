import SidebarView from "./components/Sidebar/SidebarView";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className='min-h-screen'>
      <div className='flex'>
        <SidebarView />
        <div className='flex flex-col w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
