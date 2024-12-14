const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Optional for session/token management
const studentModel = require("../model/studentData"); // Student model
const examModel = require("../model/studentMark"); // Exam score model

// Route to add exam scores
router.post('/examscores', async (req, res) => {
  const { name, email, mark } = req.body;

  try {
    // Check if the email already exists in the database
    const existingRecord = await examModel.findOne({ email });
    if (existingRecord) {
      return res.status(400).json({ message: "Email ID is already registered." });
    }

    // Create a new exam record
    const newExamRecord = new examModel({
      name, // Include the 'name' field
      email,
      mark
    });

    // Save the record to the database
    await newExamRecord.save();

    res.status(201).json({ message: "Exam score added successfully!", data: newExamRecord });
  } catch (error) {
    console.error("Error adding exam score:", error);
    res.status(500).json({ message: "Error adding exam score." });
  }
});



// Register route for student
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if exam record exists for the student
    const examRecord = await examModel.findOne({ email: email });

    if (!examRecord) {
      return res.status(404).json({ message: "Exam record not found. You cannot register." });
    }

    // Check if the exam mark is greater than 50
    if (examRecord.mark <= 50) {
      return res.status(400).json({ message: "Your exam score is too low. Registration failed." });
    }

    // Check if student is already registered
    const existingStudent = await studentModel.findOne({ email: email });
    if (existingStudent) {
      return res.status(400).json({ message: "This email is already registered." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Proceed with creating a new student record
    const newStudent = new studentModel({
      name,
      email,
      password: hashedPassword,
      phoneNo: phone,
    });

    await newStudent.save();
    res.status(201).json({ message: "Registration successful! You can now log in." });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Error registering student." });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT (optional)
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token, // Send the token if using one
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

module.exports = router;
