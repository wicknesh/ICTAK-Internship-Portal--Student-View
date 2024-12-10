import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography, Link as MuiLink, Box, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const ProjectBoard = () => {
  const topics = [

  
    { title: 'Weekly Submission format and submission links', path: '/weekly-submission' },
    { title: 'Final Project Submission and Format', path: '/final-submission' },
    { title: 'Viva-voce format', path: '/vivavoce' },
    { title: 'Discussion Forum', path: '/discussionforum' },
    
  ];

  const handleLogout = () => {
    // Add your logout functionality here
    console.log('Logged out');
  };

  return (
    <>
     
  
      {/* Project Dashboard Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#00008B', // Blue background
          padding: '10px',
          borderRadius: '5px', // Rounded corners for the header
          marginBottom: '20px',
          justifyContent: 'space-between', // Space between left and right content
        }}
      >
        {/* Title and Image */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/ICT_Academy_Kerala.webp" // Replace with your logo/image URL
            alt="Project Logo"
            style={{
              marginRight: '15px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Project Dashboard
          </Typography>
        </Box>

        {/* Logout Button */}
        <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              marginRight: '10px',
              color: 'white',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Container maxWidth="lg" style={{ marginTop: '20px', backgroundColor: 'white' }}>
{/* Accordion 1 */}
<Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Project Overview document</Typography>
          </AccordionSummary>
          <AccordionDetails>

          </AccordionDetails>
          
          </Accordion>
          {/* Accordion 2  */}
          <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Reference materials</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <List>
      <ListItem>
  
          <MuiLink target="_blank" href= "https://www.youtube.com/watch?v=KJgsSFOSQv0"> introduction to c++ </MuiLink>
         
      </ListItem>
    </List>

          </AccordionDetails>
          
          </Accordion>
      {/* Topics Section */}
      
        {topics.map((topic, index) => (
          <Accordion key={index} sx={{ marginBottom: '10px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{topic.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MuiLink
                component={Link}
                to={topic.path}
                style={{ textDecoration: 'none', color: 'blue' }}
              >
              Click here to Access the {topic.title}
              </MuiLink>
            </AccordionDetails>
          </Accordion>
        ))}
    
     
{/* marks  and comments */}

      
        {/* Accordion 7 */}
        <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Marks and comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Task</TableCell>
                    <TableCell align="center">Marks</TableCell>
                    <TableCell align="center">Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">John Doe</TableCell>
                    <TableCell align="center">85</TableCell>
                    <TableCell align="center">Good Work</TableCell>
                  </TableRow>               
                </TableBody>
              </Table>
           
          </AccordionDetails>
          
        </Accordion>

       
       

      </Container>


      {/* Footer Section - Contact Us */}
      <Box
        sx={{
          backgroundColor: '#00008B', // Blue background
          color: 'white',
          padding: '20px 0',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Contact Us
        </Typography>
        <Typography variant="body1">
          Company Name: ICT Academy Kerala
        </Typography>
        <Typography variant="body1">
          Phone Number: +91 123 456 7890
        </Typography>
        <Typography variant="body1">
          Location: Kerala, India
        </Typography>
      </Box>
    </>
  );
};

export default ProjectBoard;
