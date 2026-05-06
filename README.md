# Student Management System

A simple web app to manage student records.

## Features
- Add new students
- View all students in a table
- Search students by name, roll, class, or section
- Edit student details
- Delete students

## How to Use
### Local Development (with server)
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open `http://localhost:3000` in your browser.
4. Navigate to "Add Student" to enter new student info.
5. Go to "View Students" to see, search, edit, or delete records.

### Static Hosting (e.g., GitHub Pages)
The app works offline using localStorage in the browser. No server required.
1. Open `index.html` in your browser.
2. Data is stored locally and persists in your browser.

## Data Storage
- **Server mode**: Data stored in `data.json` on the backend.
- **Static mode**: Data stored in browser's localStorage (per browser/device).

## Deployment
- **GitHub Pages**: Push to main branch; the site deploys automatically.
- **Local server**: Use Node.js server for shared data.
- **Static**: Open HTML files directly for offline use.