import express from 'express';
import connection from './db.js';

const router = express.Router();

export const getAllStudents = (req, res) => {
    connection.query('SELECT * FROM students', (error, result) => {
        if (error) {
            console.log(error);
            res.json({ message: 'error in getting information' })
        } else res.json(result)
    });
}

export const getStudentById = (req, res) => {
    let { id } = req.params;
    let sql = 'SELECT * FROM students WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            res.json({ message: 'error in getting information' })
        } else {
            if (results.length === 0)
                res.status(404).json({ message: 'no data found' })
            else
                res.json(results[0])
        }
    });
}

export const addStudent = (req, res) => {
    const { name, age, email } = req.body;
    let sql = 'INSERT INTO students (name, age, email) VALUES (?, ?, ?)';
    connection.query(sql, [name, age, email], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'error in adding student' })
        } else {
            res.status(201).json({ message: 'student added', id: result.insertId })
        }
    });
}

export const updateStudent = (req, res) => {
    const { name, age, email } = req.body;
    let { id } = req.params;
    let sql = 'UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?';
    connection.query(sql, [name, age, email, id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'error in updating student' })
        } else {
            if (result.affectedRows === 0)
                res.status(404).json({ message: 'no data found' })
            else
                res.json({ message: 'student updated' })
        }
    });
}

export const deleteStudent = (req, res) => {
    let { id } = req.params;
    let sql = 'DELETE FROM students WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ message: 'error in deleting student' })
        } else {
            if (result.affectedRows === 0)
                res.status(404).json({ message: 'no data found' })
            else
                res.json({ message: 'student deleted' })
        }
    });
}

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;