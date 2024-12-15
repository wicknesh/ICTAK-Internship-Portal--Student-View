import React from 'react';
import CustomNavbar from './CustomNavbar';

const Layout = ({ child }) => {
  return (
    <div>
    
      <CustomNavbar />
      
     
        {child}
      
    </div>
  );
};

export default Layout;
