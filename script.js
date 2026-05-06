const STORAGE_KEY = "students";
// Updated for static GitHub Pages deployment and localStorage fallback

function getStudents() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

const studentForm = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const refreshButton = document.getElementById("refreshButton");
const editSection = document.getElementById("editSection");
const editForm = document.getElementById("editForm");

if (studentForm) {
    studentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const student = {
            name: document.getElementById("name").value.trim(),
            roll: document.getElementById("roll").value.trim(),
            class: document.getElementById("studentClass").value.trim(),
            section: document.getElementById("section").value.trim(),
            marks: Number(document.getElementById("marks").value)
        };

        const students = getStudents();
        student.id = Date.now();
        students.push(student);
        saveStudents(students);
        alert("Student added successfully.");
        studentForm.reset();
    });
}

if (tableBody) {
    loadStudents();
}

if (searchInput) {
    searchInput.addEventListener("input", () => loadStudents(searchInput.value.trim()));
}

if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        searchInput.value = "";
        loadStudents();
    });
}

if (editForm) {
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const id = Number(document.getElementById("editId").value);
        const updatedStudent = {
            name: document.getElementById("editName").value.trim(),
            roll: document.getElementById("editRoll").value.trim(),
            class: document.getElementById("editClass").value.trim(),
            section: document.getElementById("editSectionInput").value.trim(),
            marks: Number(document.getElementById("editMarks").value)
        };

        const students = getStudents();
        const index = students.findIndex((student) => student.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedStudent };
            saveStudents(students);
            hideEditPanel();
            loadStudents(searchInput ? searchInput.value.trim() : "");
        } else {
            alert("Student not found.");
        }
    });
}

const cancelEditButton = document.getElementById("cancelEditButton");
if (cancelEditButton) {
    cancelEditButton.addEventListener("click", hideEditPanel);
}

function showEditPanel(student) {
    if (!editSection) return;

    document.getElementById("editId").value = student.id;
    document.getElementById("editName").value = student.name;
    document.getElementById("editRoll").value = student.roll;
    document.getElementById("editClass").value = student.class;
    document.getElementById("editSectionInput").value = student.section;
    document.getElementById("editMarks").value = student.marks;

    editSection.classList.remove("hidden");
    editSection.scrollIntoView({ behavior: "smooth" });
}

function hideEditPanel() {
    if (!editSection) return;
    editSection.classList.add("hidden");
    editForm.reset();
}

function loadStudents(query = "") {
    let students = getStudents();

    if (query) {
        const q = query.toLowerCase();
        students = students.filter((student) => {
            return [student.name, student.roll, student.class, student.section]
                .some((value) => value.toString().toLowerCase().includes(q));
        });
    }

    tableBody.innerHTML = "";

    if (students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">No students found.</td></tr>`;
        return;
    }

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.class}</td>
            <td>${student.section}</td>
            <td>${student.marks}</td>
            <td class="actions"></td>
        `;

        const actionsCell = row.querySelector(".actions");
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "secondary";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => showEditPanel(student));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteStudent(student.id));

        actionsCell.append(editButton, deleteButton);
        tableBody.appendChild(row);
    });
}

function deleteStudent(id) {
    const confirmed = confirm("Delete this student permanently?");
    if (!confirmed) {
        return;
    }

    const students = getStudents();
    const filtered = students.filter((student) => student.id !== id);
    saveStudents(filtered);
    loadStudents(searchInput ? searchInput.value.trim() : "");
}

