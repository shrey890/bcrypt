const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newsletter'
})
db.connect((err) => {
    if (err) throw err
    console.log('connected to db')

})
module.exports = db