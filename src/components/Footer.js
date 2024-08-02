import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
  return (
    <AppBar position="static" style={{ top: 'auto', bottom: 0, backgroundColor: '#4B0082' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit" style={{ flexGrow: 1, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Natwest. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
