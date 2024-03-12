const db = require('../db/db');

// Create (Insert) a Note
const createNote = async (text) => {
    const query = 'INSERT INTO notes (text) VALUES (?)';
    try {
        const result = await db.query(query, [text]);
        return result.insertId; // Return the ID of the newly inserted note
    } catch (error) {
        throw error;
    }
};

// Read (Select) Notes
const getNote = async () => {
    const query = 'SELECT * FROM notes';
    try {
        const result = await db.query(query);
        return result
    } catch (error) {
        throw error;
    }
};

// Update a Note
const updateNote = async (id, text) => {
    const query = 'UPDATE notes SET text = ? WHERE id = ?';
    try {
        const result = await db.query(query, [text, id]);
        return result.changedRows > 0; // Resolve true if the note was updated successfully
    } catch (error) {
        throw error;
    }
};

// Delete a Note
const deleteNote = async (id) => {
    const query = 'DELETE FROM notes WHERE id = ?';
    try {
        const result = await db.query(query, [id]);
        return result.affectedRows > 0; // Resolve true if a note was deleted
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNote,
    getNote,
    updateNote,
    deleteNote
};
