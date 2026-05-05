# Student Management System

A simple web app to manage student records.

## Features
- Add new students
- View all students in a table
- Search students by name, roll, class, or section
- Edit student details
- Delete students

## How to Use
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open `http://localhost:3000` in your browser.
4. Navigate to "Add Student" to enter new student info.
5. Go to "View Students" to see, search, edit, or delete records.

## Data Storage
Student data is stored on the backend server in `data.json`. It persists across sessions and is shared if multiple users access the same server.

## Deployment
For local use, run the server as above. For static hosting like GitHub Pages, the app falls back to localStorage in the browser.