import React from 'react';

interface Header {
  courseName: string;
}

const Header: React.FC<Header> = ({ courseName }) => {
  return (
    <div>{courseName}</div>
  );
};

export default Header;