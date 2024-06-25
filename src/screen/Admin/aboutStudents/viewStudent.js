import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography,
    Tab, Paper, BottomNavigation, BottomNavigationAction, Container
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import {
    calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage,
    groupAttendanceBySubject
} from '../../../components/attendanceCalculator';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [selectedSection, setSelectedSection] = useState('table');
    const [openStates, setOpenStates] = useState({});
    const [value, setValue] = useState('1');

    const studentID = params.id;
    const address = "Student";

    // Axios instance setup (optional)
    const axiosInstance = Axios.create({
        baseURL: 'http://localhost:5001/users', // Replace with your API base URL
        timeout: 5000, // Timeout in milliseconds
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
    });

    useEffect(() => {
        axiosInstance.get(`/Student/${studentID}`)
            .then(response => {
                setUserDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [axiosInstance, studentID]);

    const updateUserDetails = (fields) => {
        axiosInstance.put(`/Student/${studentID}`, fields)
            .then(response => {
                getUserDetails(); // Refresh user details after update
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    };

    const deleteUser = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        
    };

    const removeHandler = (id, deladdress) => {
        axiosInstance.delete(`/removeStuff/${id}/${deladdress}`)
            .then(response => {
                getUserDetails(); // Refresh user details after removal
            })
            .catch(error => {
                console.error('Error removing stuff:', error);
            });
    };

    const getUserDetails = () => {
        axiosInstance.get(`/userDetails/${studentID}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    };

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const removeSubAttendance = (subId) => {
        axiosInstance.delete(`/removeStudentSubAtten/${studentID}/${subId}`)
            .then(response => {
                getUserDetails(); // Refresh user details after removal
            })
            .catch(error => {
                console.error('Error removing subject attendance:', error);
            });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const { name, rollNum, password } = event.target.elements;

        const fields = password.value === ""
            ? { name: name.value, rollNum: rollNum.value }
            : { name: name.value, rollNum: rollNum.value, password: password.value };

        updateUserDetails(fields);
    };

    const overallAttendancePercentage = userDetails ? calculateOverallAttendancePercentage(userDetails.attendance) : 0;
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = userDetails ? Object.entries(groupAttendanceBySubject(userDetails.attendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    }) : [];

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <>
                    <h3>Attendance:</h3>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Total Sessions</StyledTableCell>
                                <StyledTableCell>Attendance Percentage</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {userDetails && Object.entries(groupAttendanceBySubject(userDetails.attendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell>{present}</StyledTableCell>
                                        <StyledTableCell>{sessions}</StyledTableCell>
                                        <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained"
                                                onClick={() => handleOpen(subId)}>
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
                                            </Button>
                                            <IconButton onClick={() => removeSubAttendance(subId)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                            <Button variant="contained"
                                                onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
                                                Change
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <div>
                        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                    </div>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                        onClick={() => removeHandler(studentID, "RemoveStudentAtten ")}>Delete All</Button>
                    <Button variant="contained" onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}>
                        Add Attendance
                    </Button>
                </>
            );
        };

        const renderChartSection = () => {
            return (
                <>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </>
            );
        };

        return (
            <>
                {userDetails && userDetails.attendance && userDetails.attendance.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    <Button variant="contained" onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}>
                        Add Attendance
                    </Button>
                }
            </>
        );
    };

    const StudentMarksSection = () => {
        const renderTableSection = () => {
            return (
                <>
                    <h3>Subject Marks:</h3>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Marks</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {userDetails && userDetails.examResult && userDetails.examResult.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </>
            );
        };

        const renderChartSection = () => {
            return (
                <>
                    <CustomPieChart chartData={userDetails.examResult} dataKey="marksObtained" />
                </>
            );
        };

        return (
            <>
                {userDetails && userDetails.examResult && userDetails.examResult.length > 0
                    ?
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                    :
                    <Typography variant="body2">No marks available.</Typography>
                }
            </>
        );
    };

    return (
        <Container>
            <h1>{userDetails ? `${userDetails.name}'s Details` : 'Loading...'}</h1>
            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">Error: {error.message}</Typography>}
            {userDetails &&
                <>
                    <Box>
                        <form onSubmit={submitHandler}>
                            <Typography variant="h6">Edit Details:</Typography>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" defaultValue={userDetails.name} required />
                            </div>
                            <div>
                                <label htmlFor="rollNum">Roll Number:</label>
                                <input type="text" id="rollNum" defaultValue={userDetails.rollNum} required />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" placeholder="Leave blank to keep unchanged" />
                            </div>
                            <Button variant="contained" type="submit">Update</Button>
                        </form>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                            onClick={deleteUser}>Delete</Button>
                    </Box>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Attendance" value="1" />
                                <Tab label="Marks" value="2" />
                                <Tab label="More..." value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><StudentAttendanceSection /></TabPanel>
                        <TabPanel value="2"><StudentMarksSection /></TabPanel>
                        <TabPanel value="3">To be implemented...</TabPanel>
                    </TabContext>
                </>
            }
        </Container>
    );
};

export default ViewStudent;
