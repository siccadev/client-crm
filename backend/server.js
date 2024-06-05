const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Function to generate a unique token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Use the body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',  // Corrected IP address
  user: 'root',
  password: 'root',
  database: 'pfecrm',
  port: 4306 
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'nounouhannachi2001@gmail.com',
    pass: 'pcar gejo vxro bvqz',
  },
});

// Function to send an email for password reset
const sendEmail = (user, token) => {
  const resetLink = `http://localhost:3001/reset-password?token=${token}`;
  const mailOptions = {
    from: 'nounouhannachi2001@gmail.com',
    to: user.email,
    subject: 'Password Reset Request',
    text: `Please click on the following link to reset your password: ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // First, check if the user exists in the register table
  const query = 'SELECT * FROM register WHERE `username` = ? AND `password` = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      return;
    }

    const userRole = results[0].role;

    
     if (userRole === 'admin') {
      // Check admin's special credentials
      if (username === 'adminsmartsystem' && password === 'adminadmin') {
        res.json({ success: true, role: userRole });
      } else {
        res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
    } else if (userRole === 'client') {
      res.json({ success: true, role: userRole });
    } else {
      res.status(401).json({ message: 'Rôle d\'utilisateur non reconnu.' });
    }
  });
});

app.post('/register', (req, res) => {
  const { username, email, password, role, activite, secteur } = req.body;

  // Set the default role to 'user' if not provided
  const userRole = role || 'user';

  // If the user is a client and the activite or secteur is not provided, return an error
  if (userRole === 'client' && (!activite || !secteur)) {
    return res.status(400).json({ message: 'Veuillez fournir une activité et un secteur.' });
  }

  // Insert user data into MySQL database
  let query;
  let values;
  if (userRole === 'client') {
    query = 'INSERT INTO register (username, email, password, role, activite, secteur) VALUES (?, ?, ?, ?, ?, ?)';
    values = [username, email, password, userRole, activite, secteur];
  } else {
    query = 'INSERT INTO register (username, email, password, role) VALUES (?, ?, ?, ?)';
    values = [username, email, password, userRole];
  }

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de linscription.' });
      return;
    }

    // Redirect user to login page
    res.status(200).json({ message: 'Inscription réussie.', redirect: '/login' });
  });
});
app.post('/demandesfin', (req, res) => {
  const demandeFin = req.body;
  const query = 'INSERT INTO demandes_fin SET ?';

  connection.query(query, demandeFin, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error submitting form data' });
    }

    res.status(200).json({ message: 'Form data submitted successfully', data: results });
  });
});
// Route handler for initiating password reset
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Veuillez fournir une adresse e-mail.' });
  }

  try {
    // Find the user by email
    connection.query('SELECT * FROM register WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de lutilisateur.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail.' });
      }

      const user = results[0];

      // Generate a new token using the generateToken function
      const token = generateToken();

      // Update the user's token in the database
      connection.query('UPDATE register SET token = ? WHERE id = ?', [token, user.id], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du token.' });
        }

        // Send an email with a password reset link
        sendEmail(user, token);
        res.json({ message: 'Un e-mail de réinitialisation du mot de passe a été envoyé.' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la demande de réinitialisation du mot de passe.' });
  }
});

// Route handler for verifying the token and updating the password
app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  // Check if the token and newPassword are provided
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Veuillez fournir un token et un nouveau mot de passe.' });
  }

  try {
    // Find the user by token
    connection.query('SELECT * FROM register WHERE token = ?', [token], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de lutilisateur.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Token invalide.' });
      }

      const user = results[0];

      // Update the user's password and clear the token
      connection.query('UPDATE register SET password = ?, token = NULL WHERE id = ?', [newPassword, user.id], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du mot de passe.' });
        }

        res.json({ message: 'Le mot de passe a été réinitialisé avec succès.' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
