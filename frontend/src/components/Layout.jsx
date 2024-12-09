import React from 'react';
import CustomNavbar from './CustomNavbar';

const Layout = ({ children }) => {
  return (
    <div>
    
      <CustomNavbar />
      
     
        {children}
      
    </div>
  );
};

export default Layout;
