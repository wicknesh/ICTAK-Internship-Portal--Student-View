import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography, Link as MuiLink, Box, Button, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectBoard = () => {
  const pid=201;
  const [marksData, setMarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState(null);

  const topics = [
    { title: 'Weekly Submission format and submission links', path: '/weekly-submission' },
    { title: 'Final Project Submission and Format', path: '/final-submission' },
    { title: 'Viva-voce format', path: '/vivavoce' },
    { title: 'Discussion Forum', path: '/discussionforum' },
  ];

  const handleLogout = () => {
    console.log('Logged out');
  };

  const fetchMarks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4000/student/marks');
      setMarksData(response.data);
    } catch (err) {
      setError('Failed to fetch marks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectDocument = async () => {
    setIsDocumentLoading(true);
    setDocumentError(null);
    try {
      const response = await axios.get('http://localhost:4000/project/projectdata');
      console.log(response)
      setProjectData(response.data);
    } catch (error) {
      setDocumentError('Error fetching project data');
      console.error('Error fetching project data:', error);
    } finally {
      setIsDocumentLoading(false);
    }
  };

  return (
    <>
      {/* Project Dashboard Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#00008B', padding: '10px', borderRadius: '5px', marginBottom: '20px', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/ICT_Academy_Kerala.webp" alt="Project Logo" style={{ marginRight: '15px', borderRadius: '50%', width: '40px', height: '40px' }} />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
            Project Dashboard
          </Typography>
        </Box>
        <Box>
          <Button component={Link} to="/" sx={{ marginRight: '10px', color: 'white', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '' } }}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Project Name Section */}
      <Box sx={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '20px' }}>
        {isDocumentLoading ? (
          <Typography>Loading project data...</Typography>
        ) : documentError ? (
          <Typography color="error">{documentError}</Typography>
        ) : (
          // Directly find the project inside the Box
          projectData ? (
            projectData.find(project => project.ProjectId === pid) ? (
              <Typography variant="body1">
                <strong>Project Name:</strong> {projectData.find(project => project.ProjectId === pid).ProjectName}
              </Typography>
            ) : (
              <Typography>No project data available for ProjectId {pid}</Typography>
            )
          ) : (
            <Typography>No project data available</Typography>
          )
        )}
      </Box>

      <Container maxWidth="lg" style={{ marginTop: '20px', backgroundColor: 'white' }}>
        {/* Accordion: Project Overview */}
        <Accordion sx={{ marginBottom: '10px' }} onChange={(e, isExpanded) => isExpanded && fetchProjectDocument()}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="project-overview-content" id="project-overview-header">
    <Typography variant="h6">Project Overview document</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {isDocumentLoading ? (
      <Typography>Loading project data...</Typography>
    ) : documentError ? (
      <Typography color="error">{documentError}</Typography>
    ) : projectData ? (
      <div>
        {/* Find the project with ProjectId equal to pid */}
        {projectData.find(project => project.ProjectId === pid) ? (
          <Typography variant="body1">
            <strong>Project Document:</strong> {projectData.find(project => project.ProjectId === pid).ProjectDocument}
          </Typography>
        ) : (
          <Typography>No project data available for ProjectId {pid}</Typography>
        )}
      </div>
    ) : (
      <Typography>No project data available</Typography>
    )}
  </AccordionDetails>
</Accordion>

        {/* Accordion: Reference Materials */}
        <Accordion sx={{ marginBottom: '10px' }}onChange={(e, isExpanded) => isExpanded && fetchProjectDocument()}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="reference-material-content" id="reference-material-header">
            <Typography variant="h6">Reference materials</Typography>
          </AccordionSummary>
          <AccordionDetails>
    {isDocumentLoading ? (
      <Typography>Loading project data...</Typography>
    ) : documentError ? (
      <Typography color="error">{documentError}</Typography>
    ) : projectData ? (
      <div>
        {/* Find the project with ProjectId equal to pid */}
        {projectData.find(project => project.ProjectId === pid) ? (
          <Typography variant="body1">
            <strong>Project Reference:</strong> {projectData.find(project => project.ProjectId === pid).ProjectReference}
          </Typography>
        ) : (
          <Typography>No project data available for ProjectId {pid}</Typography>
        )}
      </div>
    ) : (
      <Typography>No project data available</Typography>
    )}

           
          </AccordionDetails>
        </Accordion>

        {/* Accordion: Topics Section */}
        {topics.map((topic, index) => (
          <Accordion key={index} sx={{ marginBottom: '10px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
              <Typography variant="h6">{topic.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MuiLink component={Link} to={topic.path} style={{ textDecoration: 'none', color: 'blue' }}>
                Click here to Access the {topic.title}
              </MuiLink>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Accordion: Marks and Comments */}
        <Accordion sx={{ marginBottom: '10px' }} onChange={(e, isExpanded) => isExpanded && fetchMarks()}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="marks-panel-content" id="marks-panel-header">
            <Typography variant="h6">Marks and comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : marksData.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Assignment</TableCell>
                    <TableCell align="center">Project ID</TableCell>
                    <TableCell align="center">Student ID</TableCell>
                    <TableCell align="center">Marks</TableCell>
                    <TableCell align="center">Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marksData.map((mark, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{mark.assignment}</TableCell>
                      <TableCell align="center">{mark.projectId}</TableCell>
                      <TableCell align="center">{mark.studentId}</TableCell>
                      <TableCell align="center">{mark.marks}</TableCell>
                      <TableCell align="center">{mark.comment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No data available</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Container>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#00008B', color: 'white', padding: '20px 0', marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Contact Us
        </Typography>
        <Typography variant="body1">Company Name: ICT Academy Kerala</Typography>
        <Typography variant="body1">Phone Number: +91 123 456 7890</Typography>
        <Typography variant="body1">Location: Kerala, India</Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Date: {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </>
  );
};

export default ProjectBoard;
