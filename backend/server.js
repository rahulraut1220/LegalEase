// server.js (Main Entry Point)
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initSocketServer } = require("./sockets/webrtcSocketServer");

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const contractRoutes = require("./routes/contractRoutes");

// Seed utility
const seedContractTypes = require("./utils/SeedContractTypes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
const server = http.createServer(app); // Use http server for Socket.io

// Socket server init
initSocketServer(server);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // safer with recursive:true
  console.log('Uploads directory created:', uploadsDir);
} else {
  console.log('Uploads directory exists:', uploadsDir);
}

// Serve uploads folder statically at /uploads URL path
app.use('/uploads', express.static(uploadsDir));

// Serve public folder statically
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/contracts", contractRoutes);

// Seed route
app.get('/api/seed', async (req, res) => {
  try {
    const seededTypes = await seedContractTypes();
    res.status(200).json({
      success: true,
      message: 'Contract types seeded successfully',
      count: seededTypes.length
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding contract types'
    });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: err.stack
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
