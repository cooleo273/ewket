import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  return (
    <Box
      component={Link}
      to={to}
      onClick={() => setSelected(title)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: selected ? '#ffffff' : 'transparent', // White background when selected
        color: selected ? '#000000' : '#000000', // Black text color when selected
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '4px',
        width: isCollapsed ? '4rem' : '8rem', // Adjust width based on collapsed state
        marginLeft: '1rem',
        '&:hover': {
          backgroundColor: '#534ea6 !important', // Blue background on hover
          color: '#ffffff !important', // White text color on hover
        },
        transition: 'background-color 0.3s ease, color 0.3s ease, width 0.3s ease', // Smooth transition
      }}
    >
      <Box
        sx={{
          marginRight: '10px',
          color: 'inherit', // Inherit color from parent
          '&:hover': {
            color: '#ffffff !important', // White color for icon on hover
          },
        }}
      >
        {icon}
      </Box>
      {!isCollapsed && (
        <Typography
          sx={{
            color: 'inherit', // Inherit color from parent
            '&:hover': {
              color: '#ffffff !important', // White color for text on hover
            },
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default Item;
