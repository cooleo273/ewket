import React, { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Navbar from "../../../components/Navbar";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { BlueButton } from "../../../components/buttonStyles"
import styled from "styled-components";
import Classroom from "../../../assets/classroom.jpg"
import "../styles.css"



const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const token = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:5001/users/current", {
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
  const address = "Sclass";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    sclassName,
    adminID,
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      // Make the API request using Axios
      const response = await axios.post("http://localhost:5001/users/SclassCreate", fields);

      console.log("Registration successful:", response.data);
      navigate("/admin/class/" + response.data._id);
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Network Error");
      setShowPopup(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className='register-body'>
      <Navbar/>
      <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Create a class"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                            />
                            <div className="view-create-button">
                            <BlueButton
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
                            </BlueButton>
                            <BlueButton variant="outlined" onClick={() => navigate("/admin/classes")}>View Classes</BlueButton>
                            <BlueButton variant="outlined" onClick={() => navigate(-1)}>
                                Go Back
                            </BlueButton>
                            </div>

                            
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
      </div>
    </>
  );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
