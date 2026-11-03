const express = require('express');
const app = express();

app.use(express.json());

let students = [];
app.post('/api/students', (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = students.find(s => s.id == id);

    if (exists) {
        return res.status(409).json({ message: 'Student ID already exists' });
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
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
});
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: 'Student updated successfully',
        student
    });
});
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    students.splice(index, 1);

    res.status(200).json({ message: 'Student deleted successfully' });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});