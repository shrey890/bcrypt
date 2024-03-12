const db = require('./db/db');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10; 
    try {
        const existingEmail = await db.query('SELECT * FROM emails WHERE email = ?', [email]);
        if (existingEmail.length > 0) {
            return res.status(400).send('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.query('INSERT INTO emails (email, password_hash) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).send('Email submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});
app.listen(port, () => console.log('Listening on port 3001'));
