const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, "[]", "utf8");
    }

    const raw = fs.readFileSync(DATA_FILE, "utf8");
    try {
        return JSON.parse(raw || "[]");
    } catch (error) {
        return [];
    }
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

app.get("/students", (req, res) => {
    let students = readData();
    const q = req.query.q ? req.query.q.toString().toLowerCase() : "";

    if (q) {
        students = students.filter((student) => {
            return [student.name, student.roll, student.class, student.section]
                .some((value) => value.toString().toLowerCase().includes(q));
        });
    }

    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const students = readData();
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const students = readData();
    const newStudent = {
        id: Date.now(),
        name: req.body.name || "",
        roll: req.body.roll || "",
        class: req.body.class || "",
        section: req.body.section || "",
        marks: Number(req.body.marks) || 0
    };

    students.push(newStudent);
    writeData(students);
    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const students = readData();
    const id = Number(req.params.id);
    let updated = false;

    const changed = students.map((student) => {
        if (student.id === id) {
            updated = true;
            return {
                ...student,
                name: req.body.name || student.name,
                roll: req.body.roll || student.roll,
                class: req.body.class || student.class,
                section: req.body.section || student.section,
                marks: Number(req.body.marks) || student.marks
            };
        }
        return student;
    });

    if (!updated) {
        return res.status(404).json({ error: "Student not found" });
    }

    writeData(changed);
    res.json({ message: "Student updated successfully" });
});

app.delete("/students/:id", (req, res) => {
    const students = readData();
    const id = Number(req.params.id);
    const filtered = students.filter((student) => student.id !== id);

    if (filtered.length === students.length) {
        return res.status(404).json({ error: "Student not found" });
    }

    writeData(filtered);
    res.json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});