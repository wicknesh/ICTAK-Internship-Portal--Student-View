import React, { useState, useEffect } from 'react';

const WeeklySubmission = () => {
  const [textInput, setTextInput] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set submission to open at the end of each week (you can adjust the date condition as per your requirement)
  useEffect(() => {
    const currentDate = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay())); // Adjust to the next Sunday

    if (currentDate >= endOfWeek) {
      setIsSubmissionOpen(true);
    }
  }, []);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleGithubLinkChange = (e) => {
    setGithubLink(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Project Progress:', textInput);
    console.log('GitHub Repository Link:', githubLink);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Weekly Project Submission</h2>
      {!isSubmissionOpen ? (
        <p>Submission link will be available at the end of the week.</p>
      ) : (
        <div>
          <div>
            <label>
              Project Progress:
              <textarea
                rows="5"
                cols="50"
                value={textInput}
                onChange={handleTextChange}
                placeholder="Describe your progress this week..."
              />
            </label>
          </div>
          <div>
            <label>
              GitHub Repository Link:
              <input
                type="url"
                value={githubLink}
                onChange={handleGithubLinkChange}
                placeholder="Enter GitHub repo URL"
              />
            </label>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              disabled={!textInput || !githubLink || isSubmitted}
            >
              {isSubmitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySubmission;
