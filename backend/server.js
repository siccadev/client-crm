const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'pfecrm',
  port: 4306,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nounouhannachi2001@gmail.com',
    pass: 'pcar gejo vxro bvqz',
  },
});

const sendEmail = async (email, message) => {
  const mailOptions = {
    from: 'nounouhannachi2001@gmail.com',
    to: email,
    subject: 'Notification',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error); // Log full error
    throw new Error('Failed to send email notification');
  }
};

app.post('/send-email-notification', async (req, res) => {
  const { email, message } = req.body;

  try {
    await sendEmail(email, message);
    res.status(200).send({ message: 'Email notification sent successfully!' });
  } catch (error) {
    console.error('Error in /send-email-notification route:', error.message);
    res.status(500).send({ message: 'Failed to send email notification', error: error.message });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM register WHERE `username` = ? AND `password` = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    const userRole = results[0].role;

    if (userRole === 'admin') {
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

app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  const query = 'SELECT * FROM register WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

const paymentStats = [
  { month: 'January', latePayments: 5 },
  { month: 'February', latePayments: 3 },
  { month: 'March', latePayments: 8 },
];

app.get('/api/payment-stats', (req, res) => {
  res.json(paymentStats);
});

app.post('/register', (req, res) => {
  const { username, email, password, role, activite, secteur } = req.body;
  const userRole = role || 'user';

  if (userRole === 'client' && (!activite || !secteur)) {
    return res.status(400).json({ message: 'Veuillez fournir une activité et un secteur.' });
  }

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
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
    }

    res.status(200).json({ message: 'Inscription réussie.', redirect: '/login' });
  });
});

app.get('/demandesfin', (req, res) => {
  const query = 'SELECT * FROM demandes_fin';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching data' });
    }

    res.status(200).json({ message: 'Data fetched successfully', data: results });
  });
});

app.post('/demandesfin', (req, res) => {
  const demandeFin = { ...req.body, state: 1, approvalStatus: 'not approved' };
  const query = 'INSERT INTO demandes_fin SET ?';

  connection.query(query, demandeFin, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error submitting form data' });
    }
    const newDemandeId = results.insertId;
    const stateQuery = 'SELECT state FROM demandes_fin WHERE IDDemandes_Fin = ?';

    connection.query(stateQuery, [newDemandeId], (stateErr, stateResults) => {
      if (stateErr) {
        console.error(stateErr);
        return res.status(500).json({ message: 'Error fetching state' });
      }

      const state = stateResults[0].state;
      res.status(200).json({ message: 'Form data submitted successfully', state });
    });
  });
});

app.put('/demandesfin/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE demandes_fin SET approvalStatus = ?, state = ? WHERE IDDemandes_Fin = ?';
  const stateValue = status === 'Approved' ? 2 : 0;
  connection.query(query, [status, stateValue, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating status in the database' });
    }

    res.status(200).json({ message: 'Status updated successfully', data: results });
  });
});

app.delete('/demandesfin/:IDDemandes_Fin', (req, res) => {
  const id = req.params.IDDemandes_Fin;
  const sql = 'DELETE FROM demandes_fin WHERE IDDemandes_Fin = ?';
  connection.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting data' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: results });
  });
});

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const sendPasswordResetEmail = (user, token) => {
  const mailOptions = {
    from: 'nounouhannachi2001@gmail.com',
    to: user.email,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://localhost:3000/reset-password/${token}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error('Error sending password reset email:', err);
    } else {
      console.log('Password reset email sent successfully');
    }
  });
};

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







app.get('/contracts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM contracts WHERE contract_id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching contract data' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract fetched successfully', data: results[0] });
  });
});


app.delete('/contracts/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM contracts WHERE contract_id = ?';
  connection.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting data' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: results });
  });
});


app.get('/demandesfin/user/:UserID', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT * FROM demandes_fin WHERE UserID = ?';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching demandes' });
    }

    res.status(200).json({ message: 'Demandes fetched successfully', data: results });
  });
});

// Count route for all demandes for a specific UserID
app.get('/demandesfin/user/:UserID/count', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT COUNT(*) AS count FROM demandes_fin WHERE UserID = ?';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error counting demandes' });
    }

    res.status(200).json({ message: 'Demandes count fetched successfully', data: results[0].count });
  });
});

// Route to get all demandes with the UserID and state 0 (not approved)
app.get('/demandesfin/user/:UserID/not-approved', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT * FROM demandes_fin WHERE UserID = ? AND state = 0';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching not approved demandes' });
    }

    res.status(200).json({ message: 'Not approved demandes fetched successfully', data: results });
  });
});

// Count route for demandes with the UserID and state 0 (not approved)
app.get('/demandesfin/user/:UserID/not-approved/count', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT COUNT(*) AS count FROM demandes_fin WHERE UserID = ? AND state = 0';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error counting not approved demandes' });
    }

    res.status(200).json({ message: 'Not approved demandes count fetched successfully', data: results[0].count });
  });
});

// Route to get all demandes with the UserID and state 1 (still processing)
app.get('/demandesfin/user/:UserID/still-processing', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT * FROM demandes_fin WHERE UserID = ? AND state = 1';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching still processing demandes' });
    }

    res.status(200).json({ message: 'Still processing demandes fetched successfully', data: results });
  });
});

// Count route for demandes with the UserID and state 1 (still processing)
app.get('/demandesfin/user/:UserID/still-processing/count', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT COUNT(*) AS count FROM demandes_fin WHERE UserID = ? AND state = 1';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error counting still processing demandes' });
    }

    res.status(200).json({ message: 'Still processing demandes count fetched successfully', data: results[0].count });
  });
});

// Route to get all demandes with the UserID and state 2 (approved)
app.get('/demandesfin/user/:UserID/approved', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT * FROM demandes_fin WHERE UserID = ? AND state = 2';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching approved demandes' });
    }

    res.status(200).json({ message: 'Approved demandes fetched successfully', data: results });
  });
});

// Count route for demandes with the UserID and state 2 (approved)
app.get('/demandesfin/user/:UserID/approved/count', (req, res) => {
  const { UserID } = req.params;
  const query = 'SELECT COUNT(*) AS count FROM demandes_fin WHERE UserID = ? AND state = 2';

  connection.query(query, [UserID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error counting approved demandes' });
    }

    res.status(200).json({ message: 'Approved demandes count fetched successfully', data: results[0].count });
  });
});

// POST endpoint to save feedback in the database
app.post('/feedback', (req, res) => {
  const { username, feedback } = req.body;

  // Check if username and feedback are provided
  if (!username || !feedback) {
    return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un commentaire.' });
  }

  // Insert feedback data into MySQL database
  const query = 'INSERT INTO feedback (username, feedback) VALUES (?, ?)';
  const values = [username, feedback];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la soumission du commentaire.' });
    }

    res.status(200).json({ message: 'Commentaire soumis avec succès.' });
  });
});


app.get('/late-payments', (req, res) => {

  const query = `
    SELECT c.*, p.payment_date, p.amount_paid
    FROM contracts c
    JOIN payments p ON c.contract_id = p.contract_id
    WHERE p.payment_status = 'late'
  `;


  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching late payments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }


    res.json(results);
  });
});

app.post('/add-payment', (req, res) => {
  const { contract_id, payment_date, amount_paid, payment_status } = req.body;

  if (!contract_id || !payment_date || !amount_paid || !payment_status) {
    return res.status(400).json({ error: 'All fields are required: contract_id, payment_date, amount_paid, payment_status' });
  }
  const query = `
    INSERT INTO payments (contract_id, payment_date, amount_paid, payment_status)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(query, [contract_id, payment_date, amount_paid, payment_status], (err, results) => {
    if (err) {
      console.error('Error adding payment:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Payment added successfully' });
  });
});




app.post('/feedback', (req, res) => {
  const { username, feedback } = req.body;
  if (!username || !feedback) {
    return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un commentaire.' });
  }
  const query = 'INSERT INTO feedback (username, feedback) VALUES (?, ?)';
  const values = [username, feedback];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la soumission du commentaire.' });
    }
    res.status(200).json({ message: 'Commentaire soumis avec succès.' });
  });
});

app.get('/feedback', (req, res) => {
  const query = 'SELECT * FROM feedback';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching approved demandes' });
    }

    res.status(200).json({ message: 'Approved demandes fetched successfully', data: results });
  });
});
app.delete('/feedback/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM feedback WHERE id = ?';
  connection.query(sql, id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting data' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', data: results });
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
