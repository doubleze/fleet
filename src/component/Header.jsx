import React, { useState } from 'react';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import UserDpropDown from './userDpropDown';

function Header({ OpenSidebar }) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleUserIconClick = () => {
    console.log('User icon clicked'); 
    
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" onClick={handleUserIconClick} />
        {/* Render the UserDpropDown component if isUserDropdownOpen is true */}
        {isUserDropdownOpen && (
          <UserDpropDown
            isOpen={isUserDropdownOpen}
            onClose={() => setIsUserDropdownOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
