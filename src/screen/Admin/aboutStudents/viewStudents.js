import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import axios from 'axios';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';

const ViewStudent = () => {
    // State variables
    const [showTab, setShowTab] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('table');
    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    // Hooks
    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const studentID = params.id;
    const address = "Student";
    
    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/users/Student/${studentID}`);
            setUserDetails(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch subject list based on class ID
    const fetchSubjectList = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/users/ClassSubjects/${userDetails.sclassName._id}`);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching subject list:", error);
        }
    };
    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    // useEffect to fetch user details on component mount
    useEffect(() => {
        fetchUserDetails();
    }, []);

    // useEffect to fetch subject list when userDetails or its dependencies change
    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            fetchSubjectList(userDetails.sclassName._id);
        }
    }, [userDetails]);

    // Function to handle opening/closing of accordion
    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    // Function to handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to handle section change between table and chart
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    // Function to handle form submission for updating user details
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const fields = {
                fullName: userDetails.fullName,
                rollNum: userDetails.rollNum,
                password: password // Assuming password is fetched in userDetails
            };
            await axios.put(`http://localhost:5001/users/Student/${studentID}`, fields);
            await fetchUserDetails(); // Refresh user details after update
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Function to handle deletion of user
    const deleteHandler = () => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
        // You can implement the delete functionality with axios here if required
    };

    // Function to remove subject attendance
    const removeSubAttendance = async (subId) => {
        try {
            await axios.put(`/api/removeStudentSubAtten/${studentID}/RemoveStudentSubAtten`, { subId });
            await fetchUserDetails(); // Refresh user details after update
        } catch (error) {
            console.error("Error removing subject attendance:", error);
        }
    };

    // Function to remove all attendance records for the student
    const removeHandler = async () => {
        try {
            await axios.put(`/api/removeStuff/${studentID}/${address}`);
            await fetchUserDetails(); // Refresh user details after update
        } catch (error) {
            console.error("Error removing student:", error);
        }
    };
    
    // Error handling
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if userDetails or attendance is null before accessing
    if (!userDetails || !userDetails.attendance) {
        return <div>No attendance data available</div>;
    }
    // Calculate overall attendance percentage and overall absent percentage
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    

    // Prepare data for charts
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    // Prepare subject data for rendering
    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    // Component for rendering student attendance section
    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            if (typeof overallAttendancePercentage !== 'number') {
                console.error('Overall attendance percentage is not a number.', overallAttendancePercentage);
                return null; // or handle error condition
            }
            const formattedPercentage = overallAttendancePercentage.toFixed(2);
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
                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                            
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            return (
                                <TableBody key={index}>
                                    <StyledTableRow>
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
                                            <Button variant="contained" sx={styles.attendanceButton}
                                                onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
                                                Change
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Attendance Details
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Date</StyledTableCell>
                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        }
                        )}
                    </Table>
                    <div>
                        Overall Attendance Percentage: {formattedPercentage}
                    </div>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
                    <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
                        Add Attendance
                    </Button>
                </>
            )
        }
        const renderChartSection = () => {
            return (
                <>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </>
            )
        }
        return (
            <>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
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
                    <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
                        Add Attendance
                    </Button>
                }
            </>
        )
    }

    // Component for rendering student marks section
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
                            {subjectMarks.map((result, index) => {
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
                    <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
                        Add Marks
                    </Button>
                </>
            )
        }
        const renderChartSection = () => {
            return (
                <>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </>
            )
        }
        return (
            <>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
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
                    <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
                        Add Marks
                    </Button>
                }
            </>
        )
    }

    // Component for rendering student details section
    const StudentDetailsSection = () => {
        return (
            <div>
                Name: {userDetails.fullName}
                <br />
                Roll Number: {userDetails.rollNum}
                <br />
                Class: {userDetails.sclassName.sclassName}
                <br />
                School: {studentSchool.schoolName}
                {
                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                        <CustomPieChart data={chartData} />
                    )
                }
                <Button variant="contained" sx={styles.styledButton} onClick={deleteHandler}>
                    Delete
                </Button>
                <br />
                <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
                    {
                        showTab
                            ? <KeyboardArrowUp />
                            : <KeyboardArrowDown />
                    }
                    Edit Student
                </Button>
                <Collapse in={showTab} timeout="auto" unmountOnExit>
                    <div className="register">
                        <form className="registerForm" onSubmit={submitHandler}>
                            <span className="registerTitle">Edit Details</span>
                            <label>Name</label>
                            <input className="registerInput" type="text" placeholder="Enter user's name..."
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="name" required />

                            <label>Roll Number</label>
                            <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
                                value={rollNum}
                                onChange={(event) => setRollNum(event.target.value.toString())}
                                required />

                            <label>Password</label>
                            <input className="registerInput" type="password" placeholder="Enter user's password..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password" />

                            <button className="registerButton" type="submit" >Update</button>
                        </form>
                    </div>
                </Collapse> 
            </div>
        )
    }
    

    // Render the main component UI
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                <Tab label="Details" value="1" />
                                <Tab label="Attendance" value="2" />
                                <Tab label="Marks" value="3" />
                            </TabList>
                        </Box>
                        <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                            <TabPanel value="1">
                                <StudentDetailsSection />
                            </TabPanel>
                            <TabPanel value="2">
                                <StudentAttendanceSection />
                            </TabPanel>
                            <TabPanel value="3">
                                <StudentMarksSection />
                            </TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
            
        </>
    );
};

export default ViewStudent;

const styles = {
    attendanceButton: {
        marginLeft: "20px",
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    },
    styledButton: {
        margin: "20px",
        backgroundColor: "#02250b",
        "&:hover": {
            backgroundColor: "#106312",
        }
    }
}