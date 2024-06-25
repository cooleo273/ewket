import React, { useEffect, useState, useParams } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/Tabletemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';


const ShowSubjects = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [subjectsList, setSubjectsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState("");
    const params = useParams();
    const adminID = params.id;

    

    useEffect(() => {
        const fetchSubjects = async () => {
            
            try {
                const response = await axios.get(`http://localhost:5001/users/AllSubjects/${adminID}`);
                setSubjectsList(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [adminID]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true);

        // Uncomment and modify if you need to re-enable the delete functionality
        // axios.delete(`/api/${address}/${deleteID}`)
        //     .then(() => {
        //         fetchSubjects(); // Re-fetch the subjects list
        //     })
        //     .catch(err => console.log(err));
    };

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(adminID, "Subjects")
        }
    ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {subjectsList.length === 0 ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            
        </>
    );
};

export default ShowSubjects;
