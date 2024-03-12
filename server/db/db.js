const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'x-notes'
})
db.connect((err) => {
    if (err) throw err
    console.log('connected to x-notes db')

})
module.exports = db
