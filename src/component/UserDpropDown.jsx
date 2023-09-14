import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
// import '../styles/userDropDown.scss';

function UserDpropDown({ isOpen, onClose }) {
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("user");
    console.log("here is the cookie ", cookie.user);
  };

  const handleManageUser = () => {
    // Handle manage user logic here
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);  

  return (
    <div className={`user-dropdown ${isOpen ? "open" : ""}`}>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleManageUser}>Manage User</button>
    </div>
  );
}

export default UserDpropDown;
