import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { Outlet } from 'react-router-dom'; // Import Outlet

const Layout = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <main className="content">
        <Outlet /> {/* Add Outlet here to render nested content */}
      </main>
    </div>
  );
};

export default Layout;
