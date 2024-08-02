import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#4B0082' }}>
      <Toolbar>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Natwest
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
