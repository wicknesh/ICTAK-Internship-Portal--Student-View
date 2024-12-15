const express = require("express");
const app = new express();
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 4000;

// Database connection
const connection = require("./db/connection");

// Middleware
app.use(cors());

// Routes
const marksRoutes = require("./routes/marksroutes");
const projectRoutes=require("./routes/projectroutes");
app.use("/student", marksRoutes);
app.use('/project',projectRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
