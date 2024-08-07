import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/Tabletemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { classID, subjectID } = params;
  const [subloading, setSubloading] = useState(true);
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [sclassStudents, setSclassStudents] = useState([]);
  const [getresponse, setGetResponse] = useState(true); // Assuming initial state
  const [error, setError] = useState(null);

  const [value, setValue] = useState('1');
  const [selectedSection, setSelectedSection] = useState('attendance');

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/Subject/${subjectID}`); // Adjust endpoint as per your API structure
        setSubjectDetails(response.data);
        setSubloading(false);
      } catch (error) {
        setError(error.message);
        setSubloading(false);
      }
    };

    const fetchClassStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/Sclass/Students/${classID}`); // Adjust endpoint as per your API structure
        setSclassStudents(response.data);
        if (response.data.length > 0) {
            setGetResponse(false)
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSubjectDetails();
    fetchClassStudents();
  }, [classID, subjectID]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Admin/students/student/${row.id}`)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}
        >
          Take Attendance
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Admin/students/student/${row.id}`)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        >
          Provide Marks
        </PurpleButton>
      </>
    );
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.fullName,
    id: student._id,
  }));

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton
                variant="contained"
                onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
              >
                Add Students
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Students List:
            </Typography>

            {selectedSection === 'attendance' && (
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            )}
            {selectedSection === 'marks' && (
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            )}

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </>
    );
  };

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Name : {subjectDetails && subjectDetails.subName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Sessions : {subjectDetails && subjectDetails.sessions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Number of Students: {numberOfStudents}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Class Name : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
        </Typography>
        {subjectDetails && subjectDetails.teacher ? (
          <Typography variant="h6" gutterBottom>
            Teacher Name : {subjectDetails.teacher.name}
          </Typography>
        ) : (
          <GreenButton variant="contained" onClick={() => navigate(`/Admin/teachers/addteacher/${subjectDetails._id}`)}>
            Add Subject Teacher
          </GreenButton>
        )}
      </>
    );
  };

  return (
    <>
      {subloading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                <Tab label="Details" value="1" />
                <Tab label="Students" value="2" />
              </TabList>
            </Box>
            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
              <TabPanel value="1">
                <SubjectDetailsSection />
              </TabPanel>
              <TabPanel value="2">
                <SubjectStudentsSection />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default ViewSubject;
