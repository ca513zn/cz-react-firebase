import { Avatar } from '@material-ui/core';
import React from 'react';

const Logo = props => {
  return (
    <Avatar
      style={{ width: 40, height: 40, backgroundColor: '' }}
      alt="Logo"
      src="/static/EP_OBSERVE.png"
      {...props}
    />
  );
};

export default Logo;
