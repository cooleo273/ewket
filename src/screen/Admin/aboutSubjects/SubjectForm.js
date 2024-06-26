import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css'

import axios from 'axios';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const sclassName = params.id;
    const adminID = "666406a897e1aa6950c5c73c"; // Replace with your actual admin ID

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const fields = {
            sclassName,
            subjects: subjects.map((subject) => ({
                subName: subject.subName,
                subCode: subject.subCode,
                sessions: subject.sessions,
            })),
            adminID,
        };

        try {
            const response = await axios.post('http://localhost:5001/users/SubjectCreate', fields);
            setLoading(false);
            if (response.status === 200) {
                navigate("/Admin/subjects");
            } else {
                setMessage("Failed to add subjects. Please try again later.");
                setShowPopup(true);
            }
        } catch (error) {
            setLoading(false);
            setMessage("Network error. Please try again later.");
            setShowPopup(true);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Box mb={2}>
                <Typography variant="h6">Add Subjects</Typography>
            </Box>
            <Grid container spacing={2}>
                {subjects.map((subject, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Subject Name"
                                variant="outlined"
                                value={subject.subName}
                                onChange={handleSubjectNameChange(index)}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Subject Code"
                                variant="outlined"
                                value={subject.subCode}
                                onChange={handleSubjectCodeChange(index)}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Sessions"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={subject.sessions}
                                onChange={handleSessionsChange(index)}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end">
                                {index === 0 ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddSubject}
                                    >
                                        Add Subject
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveSubject(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Box>
                </Grid>
                
            </Grid>
        </form>
    );
}

export default SubjectForm;
