import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';

import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/Tabletemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import axios from 'axios'; // Import Axios


import Classroom from '../../../assets/classroom.jpg';

const ShowClasses = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [sclassesList, setSclassesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState("");
 
  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:5002/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/");
        }
      });
  }, [token, navigate]);

  const adminID = userData._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5002/users/SclassList`);
        setSclassesList(response.data);
      } catch (err) {
        setError(err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [adminID]);

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage('Sorry, the delete function has been disabled for now.');
    setShowPopup(true);
    // You can make an Axios DELETE request here if needed
    // Example: await axios.delete(`http://localhost:5002/users/${deleteID}/${address}`);
  };

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate(`/Admin/addsubject/${row.id}`) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate(`/Admin/class/addstudents/${row.id}`) },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, 'Sclass')} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton variant="contained" onClick={() => navigate(`/Admin/class/${row.id}`)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper, // Make sure to define this style object
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList.map((sclass) => ({
    name: sclass.sclassName,
    id: sclass._id,
  }));

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: 'Add New Class',
      action: () => navigate('/Admin/addclass'),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Classes',
      action: () => deleteHandler(adminID, 'Sclasses'),
    },
  ];

 return (
     <div>
       {loading ?
        <div>Loading...</div>
        :
        <>
          
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
              <SpeedDialTemplate actions={actions} />
              
        </>
        }
     </div>
   );
  }


export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;