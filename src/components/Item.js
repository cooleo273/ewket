import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = ({ title, to, icon, selected, setSelected, isCollapsed, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Handle custom click action (e.g., logout)
    } else {
      setSelected(title);
    }
  };

  return (
    <Box
      component={to ? Link : 'div'}
      to={to}
      onClick={handleClick}
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
          width: isCollapsed ? '4rem' : '8rem', // Adjust width on hover based on collapsed state
        },
        transition: 'background-color 0.3s ease, color 0.3s ease, width 0.3s ease', // Smooth transition
      }}
    >
      {icon && (
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
      )}
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
