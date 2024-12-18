import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const TextEditor = () => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    console.log("Submitted Content:", value);
    // Send the 'value' to your Node.js backend
  };

  return (
    <div>
      <h3>Main Project Submission</h3>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <button onClick={handleSave}>Save changes</button>
    </div>
  );
};

export default TextEditor;
