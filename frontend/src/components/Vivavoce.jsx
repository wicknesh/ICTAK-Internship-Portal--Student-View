import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";

const Vivavoce = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [vivaOpened, setVivaOpened] = useState(false);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [comments, setComments] = useState("");
  const [vivaFile, setVivaFile] = useState(null);
  const [vivaLink, setVivaLink] = useState("");
  const vivaQuestions = [
    "What inspired your project idea?",
    "Explain the technologies used in your project.",
    "What challenges did you face during development?",
    "How does your project address real-world problems?",
    "What improvements would you make in the future?"
  ];

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handleCommentsChange = (e) => setComments(e.target.value);
  const handleVivaFileChange = (e) => setVivaFile(e.target.files[0]);
  const handleVivaLinkChange = (e) => setVivaLink(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file || link) {
      console.log("Submitting report:", { file, link, comments });
      setTimeout(() => setIsSubmitted(true), 1000);
    } else {
      alert("Please upload a file or provide a link to your report.");
    }
  };

  const handleVivaSubmit = (e) => {
    e.preventDefault();
    if (vivaFile || vivaLink) {
      console.log("Submitting viva voce details:", { vivaFile, vivaLink });
      alert("Viva Voce submission successful!");
    } else {
      alert("Please upload a file or provide a link for Viva Voce.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Final Project Report Submission
      </Typography>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" gutterBottom>
            Upload your project report and link below.
          </Typography>

          <Box mb={3}>
            <Typography variant="subtitle1">Upload File:</Typography>
            <TextField
              type="file"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1">Submit your GitHub link:</Typography>
            <TextField
              type="url"
              value={link}
              onChange={handleLinkChange}
              fullWidth
              placeholder="Paste your link here"
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1">Comments (Optional):</Typography>
            <TextField
              value={comments}
              onChange={handleCommentsChange}
              fullWidth
              multiline
              rows={4}
              placeholder="Add any notes or comments about your submission."
            />
          </Box>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Your project report has been successfully submitted.
          </Typography>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Viva Voce Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              Answer the following viva voce questions. Provide supporting files or a GitHub link if required.
            </Typography>

            {!vivaOpened ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setVivaOpened(true)}
              >
                Open Viva Voce Submission Form
              </Button>
            ) : (
              <form onSubmit={handleVivaSubmit}>
                <Box mt={3}>
                  {vivaQuestions.map((question, index) => (
                    <Box mb={3} key={index}>
                      <Typography variant="subtitle1">
                        {index + 1}. {question}
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder={`Your answer for question ${index + 1}`}
                        required
                      />
                    </Box>
                  ))}
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle1">Upload Viva File (if any):</Typography>
                  <TextField
                    type="file"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleVivaFileChange}
                  />
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle1">Submit Viva GitHub Link (if any):</Typography>
                  <TextField
                    type="url"
                    value={vivaLink}
                    onChange={handleVivaLinkChange}
                    fullWidth
                    placeholder="Paste your GitHub repository link here"
                  />
                </Box>

                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit Viva Voce
                </Button>
              </form>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Vivavoce;
