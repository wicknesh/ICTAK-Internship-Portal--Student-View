import { Box, Button, Card, CardActions, CardContent, Fab, Modal, Paper, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { red } from "@mui/material/colors";
import NavBar from "./NavBar";
import { StudentContext } from "./StudentProvider";

const StudentDashboard = () => {
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ projects, setProjects ] = useState(null);
    const [ overlay, setOverlay ] = useState(null);
    const [ confirmModal, setConfirmModal ] = useState(false);
    // const [ student, setStudent ] = useState (null);
    const { student } = useContext (StudentContext);

      const handleCardClick = (index) => {
        setSelectedCard(prevSelected => prevSelected === index ? null : index);
      }

      const handleLearnMoreClick = (project) => {
        setOverlay(project);
      }

      const handleCloseOverlay = () => {
        setOverlay(null);
      }

      useEffect(() => {
        async function fetchProject () {
            const res = await axios.get(`http://localhost:3000/project/all`);
            try {
                setProjects(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProject();
      }, []);

      const handleSubmit = () => {
        setConfirmModal(true);
      }

      async function handleConfirmSubmit () {
        try {
            const selectedProjectId = projects[selectedCard].p_id;
            const studentId = student?.s_id;
            const res = await axios.put(`http://localhost:3000/student/selectProject`, {
                s_id: studentId,
                p_id: selectedProjectId
            });
            console.log(res.data.message);
            setConfirmModal(false);
            } catch (error) {
                console.error(`Error selecting project: ${error}`);
            }
        }

      const handleCancelSubmit = () => {
        setConfirmModal(false);
      }

  return (
    <>
        <NavBar />
        <Box sx={{
            backgroundColor: '#121212',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2
        }}>
            <Paper
                elevation={6}
                sx={{
                    paddingX: 10,
                    paddingY: 5,
                    backgroundColor: '#1e1e1e',
                    position: 'relative'
                }}
            >
                <Box>
                    <Typography sx={{fontSize: 30, mb: 2, color: '#ececec', fontWeight: '500' }}>Projects</Typography>
                </Box>
                <Box sx={{maxWidth: '50rem'}}>
                    {projects && projects.map((project, index) => (
                        <Card
                            key={index}
                            variant='outlined'
                            sx={{
                                backgroundColor: selectedCard === index ? '#2e2e2e' : '#1c1c1c',
                                borderWidth: 1,
                                borderRadius: '1rem',
                                borderColor: selectedCard === index ? 'green' : '#ececec',
                                pointerEvents: selectedCard !== null && selectedCard !== index ? 'none' : 'auto',
                                marginBottom: 2,
                                transition: 'all 0.3s',
                                opacity: selectedCard !== null && selectedCard !== index ? '0.2': '1',
                                cursor: selectedCard !== null && selectedCard !== index ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => handleCardClick(index)}
                        >
                            <React.Fragment>
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'grey', fontSize: 14, userSelect: 'none' }}>
                                        {project.p_type}
                                    </Typography>
                                    <Typography variant="h5" component="div" sx={{ color: '#ececec', userSelect: 'none' }}>
                                        {project.p_name}
                                    </Typography>
                                    <Typography sx={{ color: 'grey', mb: 1.5, userSelect: 'none' }}>
                                    {project.p_dur}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#ececec', userSelect: 'none' }}>
                                        {project.p_desc}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLearnMoreClick(project)
                                        }}
                                        sx={{ userSelect: 'none', color: '#0099cc'}}
                                    >Learn More</Button>
                                </CardActions>
                            </React.Fragment>
                        </Card>
                    ))}
                </Box>
                <Fab
                    variant="extended"
                    onClick={handleSubmit}
                    disabled={selectedCard === null}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: '#ececec',
                        backgroundColor: red[500],
                        '&:hover': { backgroundColor: 'red' }
                    }}
                >
                    Confirm Project
                </Fab>
                <Modal
                    open={confirmModal}
                    onClose={handleCancelSubmit}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#1e1e1e',
                            color: '#ececec',
                            padding: 4,
                            borderRadius: '8px',
                            maxWidth: '400px',
                            boxShadow: 24,
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ mb: 3 }}
                        >
                            Confirm Project
                        </Typography>
                        <Typography
                            sx={{
                                mb: 3,
                            }}
                        >
                            Are you sure you want to select this project? This action cannot be undone.
                        </Typography>
                        <Typography
                            sx={{
                                mb: 3,
                                fontSize: 20
                            }}
                        >
                            <strong>{selectedCard !== null ? projects[selectedCard].p_name: ""}</strong>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                onClick={handleCancelSubmit}
                                sx={{
                                    color: '#ff6666'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmSubmit}
                                sx={{
                                    color: '#66c66'
                                }}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Paper>
            <Modal
                open={!!overlay}
                onClose={handleCloseOverlay}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    padding: 4
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1e1e1e',
                        color: '#ececec',
                        padding: 4,
                        borderRadius: '8px',
                        maxWidth: '600px',
                        boxShadow: 24,
                        outline: 'none'
                    }}
                >
                    {overlay && (
                        <React.Fragment>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: 2, fontWeight: 'bold'}}
                            >
                                {overlay.p_name}
                            </Typography>
                            <Typography
                                sx={{ marginBottom: 2}}
                            >
                                <strong>Type:</strong> {overlay.p_type}
                            </Typography>
                            <Typography
                                sx={{ marginBottom: 2}}
                            >
                                <strong>Duration:</strong> {overlay.p_dur}
                            </Typography>
                            <Typography>
                                <strong>Details:</strong> {overlay.p_det}
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: 3,
                                    textAlign: "right"
                                }}>
                                    <Button
                                        onClick={handleCloseOverlay}
                                        sx={{ color: '#0099cc' }}
                                    >
                                        Close
                                    </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Modal>
        </Box>
    </>
  )
}
export default StudentDashboard