require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Use MONGO_URI env var for production (MongoDB Atlas), fallback to localhost for local dev
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/suusri_websites';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection error:', err));

const contactSchema = new mongoose.Schema({
  industry: String,
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP credentials on startup
transporter.verify()
  .then(() => console.log('SMTP transporter verified — ready to send emails'))
  .catch((err) => console.error('SMTP verification failed:', err.message));

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

app.post('/api/contact', async (req, res) => {
  try {
    const { industry, name, email, message } = req.body;

    if (!industry || !name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
      return res.status(400).json({ success: false, message: 'Name must be between 2 and 50 characters.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (message.trim().length < 10 || message.trim().length > 500) {
      return res.status(400).json({ success: false, message: 'Message must be between 10 and 500 characters.' });
    }

    // Save to database first — this must succeed
    const newContact = new Contact({ industry, name, email, message });
    await newContact.save();

    // Send email notification — don't let email failure lose the submission
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL,
        subject: `New Enquiry from ${industry} website`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (emailErr) {
      console.error('Email sending failed (submission saved to DB):', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Thank you! We will contact you soon.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  guests: Number,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/api/reservation', async (req, res) => {
  try {
    const { name, email, phone, guests, date, time } = req.body;

    if (!name || !email || !phone || !guests || !date || !time) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    // Save to database first — this must succeed
    const newReservation = new Reservation({ name, email, phone, guests, date, time });
    await newReservation.save();

    // Send email notification — don't let email failure lose the reservation
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL,
        subject: `New Table Reservation Request`,
        html: `
          <h3>New Restaurant Reservation</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Guests:</strong> ${guests}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        `
      });
    } catch (emailErr) {
      console.error('Email sending failed (reservation saved to DB):', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Your table has been reserved! A confirmation email has been sent.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching data.' });
  }
});

// For local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export for Vercel serverless
module.exports = app;