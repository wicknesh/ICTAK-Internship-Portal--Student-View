import React, { useState } from 'react';
import "./Appp.css";

const Vivavoce = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [vivaOpened, setVivaOpened] = useState(false);
    const [file, setFile] = useState(null);
    const [link, setLink] = useState("");
    const [comments, setComments] = useState("");
    const [vivaFile, setVivaFile] = useState(null);
    const [vivaLink, setVivaLink] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (file || link) {
            console.log("Submitting report:", { file, link, comments });
            setTimeout(() => {
                setIsSubmitted(true);
            }, 1000);
        } else {
            alert("Please upload a file or provide a link to your report.");
        }
    };

    const handleVivaFileChange = (e) => {
        setVivaFile(e.target.files[0]);
    };

    const handleVivaLinkChange = (e) => {
        setVivaLink(e.target.value);
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
        <div className="container">
            <h1>Final Project Report Submission</h1>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="submission-form">
                    <p>Upload your project report and link below.</p>

                    <label>
                        <strong>Upload File:</strong>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.docx,.zip"
                        />
                    </label>

                    <div>
                        <label>
                            <strong>Submit your Github link:</strong>
                        </label>
                        <input
                            type="url"
                            value={link}
                            onChange={handleLinkChange}
                            placeholder="Paste your link here"
                        />
                    </div>

                    <div>
                        <label>
                            <strong>Comments (Optional):</strong>
                        </label>
                        <textarea
                            value={comments}
                            onChange={handleCommentsChange}
                            placeholder="Add any notes or comments about your submission."
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div className="confirmation">
                    <h3>Your project report has been successfully submitted.</h3>

                    <div className="viva-voce-section">
                        <h3>Viva Voce Details</h3>

                        <p><strong>Topics:</strong> Based on your project report and additional queries on related subjects.</p>

                        {!vivaOpened ? (
                            <button onClick={() => setVivaOpened(true)} className="viva-link">
                                Open Viva Voce Submission Form
                            </button>
                        ) : (
                            <form onSubmit={handleVivaSubmit} className="viva-form">
                                <label>
                                    <strong>Upload Viva File:</strong>
                                    <input
                                        type="file"
                                        onChange={handleVivaFileChange}
                                        accept=".pdf,.docx,.zip"
                                    />
                                </label>
                                <div>
                                    <label>
                                        <strong>Submit Viva Link:</strong>
                                    </label>
                                    <input
                                        type="url"
                                        value={vivaLink}
                                        onChange={handleVivaLinkChange}
                                        placeholder="Paste your link here"
                                    />
                                </div>
                                <button type="submit">Submit Viva Voce</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vivavoce;
