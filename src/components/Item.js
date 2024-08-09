import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Box
      component={Link}
      to={to}
      onClick={() => setSelected(title)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: selected ? '#white' : 'transparent', // Blue background when selected
        color: selected ? '#black' : '#000000', // White text color when selected
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#534ea6 !important', // Blue background on hover
          color: '#ffffff !important', // White text color on hover
        },
        transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition
      }}
    >
      {icon && (
        <Box sx={{ marginRight: '10px', color: 'black' }}>
          {icon}
        </Box>
      )}
      <Typography sx={{ color: 'black' }}>{title}</Typography>
    </Box>
  );
};

export default Item;
