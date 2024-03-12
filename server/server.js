const db = require('./db/db');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const crud = require('./crud/crud.js'); // Importing the CRUD module correctly
const { getNote, createNote, deleteNote, updateNote } = crud; // Destructuring the methods from the CRUD module
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/notes', async (req, res) => {
    db.query('SELECT * FROM notes', (err, result) => {
        if (err) throw err
        res.json(result)
    });
    // try {
    //     const notes = await getNote();
    //     res.json(notes);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});
// Create a note
app.post('/notes', async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'text is required' })
    }
  db.query('INSERT INTO notes (text) VALUES (?)', [text], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'an error occurred while inserting notes' })
        }
        res.send('note added successfully')
    })
});
// Update a note
app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedNote = await updateNote(id, text);
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Delete a note
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteNote(id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
