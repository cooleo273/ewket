import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';


const StudentAttendance = ({ situation }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subjectsList, setSubjectsList] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    
    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const params = useParams();

    useEffect(() => {
        console.log(situation);
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id;
            axios.get(`http://localhost:5001/users/Student/${stdID}`) // Adjust the API endpoint according to your backend structure
                .then(response => {
                    setUserDetails(response.data);
                    console.log(response.data);
                    setLoading(false);
                })  
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setLoading(false);
                });
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            axios.get(`http://localhost:5001/users/Student/${studentID}`) // Adjust the API endpoint according to your backend structure
                .then(response => {
                    setUserDetails(response.data);
                    setLoading(false);
                    setChosenSubName(subjectID);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setLoading(false);
                });
        }
    }, [situation, params]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            axios.get(`http://localhost:5001/users/ClassSubjects/${userDetails.sclassName._id}`) // Adjust the API endpoint according to your backend structure
                .then(response => {
                    setSubjectsList(response.data);
                })
                .catch(error => {
                    console.error('Error fetching subjects list:', error);
                });
        }
    }, [situation, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(subject => subject.subName === event.target.value);
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        axios.put(`http://localhost:5001/users/StudentAttendance/${studentID}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        }) // Adjust the API endpoint according to your backend structure
            .then(response => {
                setLoader(false);
                setResponse(response.data);
                setShowPopup(true);
                setMessage(response.data);
            })
            .catch(error => {
                setLoader(false);
                setError(error);
                setShowPopup(true);
                setMessage("Error submitting attendance");
            });
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box
                    sx={{
                        flex: '1 1 auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 550,
                            px: 3,
                            py: '100px',
                            width: '100%'
                        }}
                    >
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">
                                Student Name: {userDetails.fullName}
                            </Typography>
                            {currentUser && currentUser.teachSubject && (
                                <Typography variant="h4">
                                    Subject Name: {currentUser.teachSubject?.subName}
                                </Typography>
                            )}
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                {situation === "Student" && (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={subjectName}
                                            label="Choose an option"
                                            onChange={changeHandler}
                                            required
                                        >
                                            {subjectsList.length > 0 ? (
                                                subjectsList.map((subject, index) => (
                                                    <MenuItem key={index} value={subject.subName}>
                                                        {subject.subName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="Select Subject">
                                                    Add Subjects For Attendance
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Attendance Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Choose an option"
                                        onChange={(event) => setStatus(event.target.value)}
                                        required
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Absent">Absent</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Select Date"
                                        type="date"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Stack>
                            <PurpleButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </PurpleButton>
                        </form>
                    </Box>
                </Box>
            )}
            
        </>
    );
}

export default StudentAttendance;
