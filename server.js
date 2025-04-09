const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const app = express();
const secretKey = 'default_secret_key'; // Replace with your own secret key for JWT

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'app')));
app.use("/uploads", express.static("uploads"));  // Serve uploaded files

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// User schema and model
const userSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    email: { type: String, unique: true },
    password: String,
    country: String,
    avatar: { type: String, default: 'image/user.jpg' }, // Default avatar
});
const User = mongoose.model('User', userSchema);

// Feedback schema and model
const feedbackSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    rating: { type: Number, required: true },
    feedbackType: { type: String, enum: ['suggestion', 'complaint', 'compliment', 'other'], required: true },
    message: { type: String, required: true },
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ✅ Message Schema
const MessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
}, { versionKey: false });
const Message = mongoose.model("Message", MessageSchema);

// Register route
app.post('/register', async (req, res) => {
    const { fullName, userName, email, password, country } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, userName, email, password: hashedPassword, country });
        await user.save();

        // Send welcome email after registration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'forexvittavidya@gmail.com', // Your Gmail email address
                pass: 'beaq yzmr woro qgwe',   // Your Gmail app-specific password
            },
        });

        const mailOptions = {
            from: 'forexvittavidya@gmail.com',
            to: email,
            subject: 'Welcome to Vittavidya',
            text: `Hello ${fullName},\n\nWelcome to Vittavidya! We're excited to have you on board. If you have any questions or need support, feel free to reach out to us.\n\nBest regards,\nVittavidya Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending welcome email:', error);
            } else {
                console.log('Welcome email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, fullName: user.fullName, userName: user.userName, country: user.country, avatar: user.avatar },
            secretKey,
            { expiresIn: '7d' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ✅ Multer: File Upload Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Profile route
app.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User Profile',
            data: {
                fullName: user.fullName,
                email: user.email,
                userName: user.userName,
                country: user.country,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});
// Update avatar route
app.post('/update-avatar', authenticateJWT, async (req, res) => {
    const { avatar } = req.body;
    const userId = req.user.id;

    if (!avatar) {
        return res.status(400).json({ message: 'No avatar URL provided' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's avatar
        user.avatar = avatar;
        await user.save();

        res.json({ message: 'Avatar updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating avatar', error });
    }
});

// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User with that email not found.' });
        }

        // Create a password reset token (e.g., a JWT token for demonstration)
        const resetToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

        // Generate the reset link
        const resetLink = `http://localhost:3000/app/reset-email.html?token=${resetToken}`;

        // Send the reset link via email (using nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'forexvittavidya@gmail.com', // Your Gmail email address
                pass: 'beaq yzmr woro qgwe',   // Your Gmail app-specific password
            },
        });

        const mailOptions = {
            from: 'forexvittavidya@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Hello ${user.fullName},\n\nWe received a request to reset your password. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send reset email.' });
            }
            res.status(200).json({ message: 'Password reset link sent to your email.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Reset Password Route
app.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Ensure the new password is at least 8 characters long
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.email;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password.", error });
    }
});

// Feedback submission route
app.post('/submit-feedback', async (req, res) => {
    const { name, email, rating, feedbackType, message } = req.body;

    try {
        // Ensure all fields are provided
        if (!name || !email || feedbackType === '0' || !message) {
            return res.status(400).json({ message: "Please fill in all required fields!" });
        }

        // Save feedback to MongoDB
        const feedback = new Feedback({ name, email, rating, feedbackType, message });
        await feedback.save();

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'forexvittavidya@gmail.com', // Replace with your admin email
                pass: 'beaq yzmr woro qgwe' // Use environment variables instead for security
            }
        });

        // Admin Email content
        const mailOptionsAdmin = {
            from: email, // User's email
            to: 'forexvittavidya@gmail.com', // Admin's email
            subject: `New Feedback from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Rating: ${rating}/5
                Type: ${feedbackType}
                Message: ${message}
            `
        };

        // Convert feedbackType to lowercase to ensure consistency
        const feedbackTypeLower = feedbackType.toLowerCase();

        // Determine user email message based on feedback type
        let userMessage;
        if (feedbackTypeLower === 'compliment') {
            userMessage = `🌟 Hey ${name}! OMG, you just made our day! 💖 We’re feeling totally blessed to have your support. Your kind words mean the world to us, and we’re super grateful you took the time to share them. Keep being awesome! 😎`;
        } else if (feedbackTypeLower === 'complaint') {
            userMessage = `😬 Hey ${name}, first off, big sorry for the bad vibes! We totally get how frustrating this must be, and we’re on it like ASAP. Your feedback is gold to us, and we promise to make things right. Hang tight, and we’ll keep you updated! 🙏`;
        } else if (feedbackTypeLower === 'suggestion') {
            userMessage = `💡 Yo ${name}! You just dropped some serious wisdom on us! 👏 Your suggestion is straight-up fire, and we’re totally taking notes. We’re always looking to level up, and your input is exactly what we needed. Appreciate you big time! 💪`;
        } else if (feedbackTypeLower === 'question') {
            userMessage = `❓ Hey ${name}! Thanks for sliding into our inbox with your question. We’re on it and will hit you back with an answer faster than you can say "Forex vibes." Stay tuned! 💬`;
        } else {
            userMessage = `😎 Hey ${name}, thanks for reaching out! Your feedback just made our inbox way cooler. We’re on it and appreciate you sharing your thoughts. You rock! 💯`;
        }

        // User Email content
        const mailOptionsUser = {
            from: 'forexvittavidya@gmail.com',
            to: email,
            subject: `Yo ${name}, We Got Your Feedback! 🙌`,
            text: userMessage
        };

        // Send emails to admin and user
        await transporter.sendMail(mailOptionsAdmin);
        await transporter.sendMail(mailOptionsUser);

        res.status(200).json({ message: "Feedback submitted successfully! Admin and user have been notified." });

    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ message: "Error submitting feedback", error });
    }
});


app.get("/getUser", async (req, res) => {
    // Assuming you store user data in JWT or session
    const user = req.user; // Modify this based on your auth setup
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    res.json({ username: user.name });
});

//chat
app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

app.post("/messages", async (req, res) => {
    const { username, message } = req.body;
    const newMessage = new Message({ username, message });
    await newMessage.save();
    res.json({ success: true });
});

app.delete("/messages/:id", authenticateJWT, async (req, res) => {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    if (message.username !== req.user.userName) return res.status(403).json({ error: "Not authorized" });
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'homepage.html'));
});

app.get('/app/reset-email.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'reset-email.html'), (err) => {
      if (err) {
        console.log('Error serving the file:', err);
        res.status(500).send('Error loading reset page');
      }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
