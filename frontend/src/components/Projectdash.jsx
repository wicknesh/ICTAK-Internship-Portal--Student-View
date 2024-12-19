import { useState, useEffect, useContext } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography, Link as MuiLink, Box, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { StudentContext } from './StudentProvider';
import DiscussionForum from './Discussionform';

const ProjectBoard = () => {
  // const pid = 201;
  // const [marksData, setMarksData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);
  // const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  // const [documentError, setDocumentError] = useState(null);
  // const { student } = useContext (StudentContext); //student context

  // const topics = [
  //   { title: 'Weekly Submission format and submission links', path: '/weekly-submission' },
  //   { title: 'Final Project Submission and Format', path: '/final-submission' },
  //   { title: 'Viva-voce format', path: '/vivavoce' },
  //   { title: 'Discussion Forum', path: '/discussionforum' },
  // ];

  // const handleLogout = () => {
  //   console.log('Logged out');
  // };

  // const fetchMarks = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get('http://localhost:4000/student/marks');
  //     setMarksData(response.data);
  //   } catch (err) {
  //     setError('Failed to fetch marks. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const fetchProjectDocument = async () => {
  //   setIsDocumentLoading(true);
  //   setDocumentError(null);
  //   try {
  //     const response = await axios.get('http://localhost:3000/project/all');
  //     setProjectData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     setDocumentError('Error fetching project data');
  //     console.error('Error fetching project data:', error);
  //   } finally {
  //     setIsDocumentLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchInitialProjectData = async () => {
      try {
        // const id = student?.selectedProject;
        const id = "p001";
        const response = await axios.get(`http://localhost:3000/project/${id}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data on load:', error);
      }
    };

    fetchInitialProjectData();
  }, []);
  // }, [student?.selectedProject]);

  return (
    <>
      {/* Project Dashboard Header Section
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#00008B',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/ICT_Academy_Kerala.webp"
            alt="Project Logo"
            style={{ marginRight: '15px', borderRadius: '50%', width: '40px', height: '40px' }}
          />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              Project Dashboard
            </Typography>
        </Box>
        <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              marginRight: '10px',
              color: 'white',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '' },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box> */}

      {/* Project Name Section */}
      <Box
        sx={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '20px' }}
      >
        {/* {projectData ? (
          projectData.find((project) => project.ProjectId === pid) ? (
            <Typography variant="h4">
              <strong>Project Name: {projectData.find((project) => project.ProjectId === pid).ProjectName}</strong>
            </Typography>
          ) : (
            <Typography>No project data available for ProjectId {pid}</Typography>
          )
        ) : (
          <Typography>Loading project data...</Typography>
        )} */}
        <Typography variant='h4'>
          <strong>Project Name: {projectData?.p_name}</strong>
        </Typography>
      </Box>
      <Container maxWidth="lg" style={{ marginTop: '20px', backgroundColor: 'white' }}></Container>
      <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="project-overview-content"
            id="project-overview-header"
          >
            <Typography variant="h6">Project Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Typography variant="body1">
                {projectData?.p_det}
              </Typography>
        </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reference-material-content"
            id="reference-material-header"
          >
            <Typography variant="h6">Reference materials</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <strong>Project Reference:</strong>{' '}
                    {projectData?.p_dur}
            </Typography>
          </AccordionDetails>
        </Accordion> 
<Accordion    sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}>
 <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reference-material-content"
            id="reference-material-header"
          >
            <Typography variant="h6">Discussion Form</Typography>
          </AccordionSummary>


        <AccordionDetails>
            <Typography variant="body1">
              <DiscussionForum/>
            </Typography>
          </AccordionDetails>
          </Accordion>
      
    </>
  );
};

export default ProjectBoard;