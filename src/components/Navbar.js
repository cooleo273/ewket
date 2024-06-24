import React, { useEffect, useState, useParams } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { tokens } from "./theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("")
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
        setUsername(response.data.username);
        setUser(response.data)
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
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-menu-item": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
      
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "0px 0 0px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
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
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          
          {user.role === "admin" &&
          <Item
            title="Classes"
            to="/admin/addclass"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />}
          
          <Item
            title="Attendance"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Setting"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calendar"
            to="/admin/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <div className="button">
            <button onClick={logout}>logout</button>
          </div>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default Navbar;
