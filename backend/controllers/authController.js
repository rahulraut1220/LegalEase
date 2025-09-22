const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Register new user
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "lawyer" && !specialization) {
      return res.status(400).json({ message: "Specialization is required for lawyers" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Creating user with or without specialization
    const userData = { name, email, password, role };
    if (role === "lawyer") userData.specialization = specialization;

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc Authenticate user & get token
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    if (!email || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (user && isMatch) {
      const token = generateToken(user._id);
      console.log('Token generated successfully');
      
      // Return user data without sensitive information
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      
      res.json({
        ...userResponse,
        token: token,
      });
    } else {
      console.log('Invalid password');
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Logout user
// @route POST /api/auth/logout
const logoutUser = async (req, res) => {
  res.json({ message: "Logout successful" });
};

// @desc Get user profile
// @route GET /api/auth/profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const getUserDetailsById = async (req, res) => {
  const { id } = req.params;  
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {  
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, getUserDetailsById };
