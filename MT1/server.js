const express = require('express');
const app = express();

app.use(express.json());

let students = [];
app.post('/api/students', (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (id == null || !name || !email || !course || age == null) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const exists = students.find(s => s.id === id);

    if (exists) {
        return res.status(409).json({
            message: 'Student ID already exists'
        });
    }

    const student = { id, name, email, course, age };
    students.push(student);

    res.status(201).json({
        message: 'Student added successfully',
        student
    });
});
app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});
app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    res.status(200).json(student);
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});