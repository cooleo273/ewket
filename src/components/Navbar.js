import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SchoolIcon from '@mui/icons-material/School';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { tokens } from "./theme";
import { BrownButton } from "./buttonStyles";
import img from "../assets/7124045_logout_icon.png";
import Item from './Item'; // Make sure to import the Item component

// Function to capitalize the first letter
const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Handle case for empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/"); // Redirect to login page if token is not found
    }
    axios
      .get(`http://localhost:5001/users/current`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setUsername(capitalizeFirstLetter(response.data.username)); // Capitalize username
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [accessToken, navigate]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          color: "#00ff9c",
          marginTop: "1rem",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <Box
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              color: colors.grey[900],
            }}
          >
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Hello, {username}
                </Typography>
              </Box>
            </Box>
          )}

          <Item
            title="Dashboard"
            to="/admin"
            icon={<DashboardIcon  />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed} // Pass isCollapsed
          />
          
          {user.role === "admin" &&
            <Item
              title="Classes"
              to="/admin/addclass"
              icon={<SchoolIcon     />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed} // Pass isCollapsed
            />}
          
          <Item
            title="Attendance"
            to="/"
            icon={<CheckCircleOutlineIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed} // Pass isCollapsed
          />
          <Item
            title="Setting"
            to="/"
            icon={<SettingsIcon  />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed} // Pass isCollapsed
          />
          <Item
            title="Calendar"
            to="/admin/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed} // Pass isCollapsed
          />
          <div className="button-two">
            <img src={img} alt="logout"/>
            <a style={{
              cursor: "pointer"
            }} onClick={logout}>Logout</a>
          </div>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default Navbar;
