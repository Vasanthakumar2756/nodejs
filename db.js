import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Divya@2756',
    database: 'school'
});

connection.connect((err) => {
    if (err) {
        console.log("DB connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

export default connection;
