/* ============================================
   Assignment 1: User Profile Manager
   ============================================
   Scenario: You are managing a logged-in user's profile in a web application.
   This assignment covers basic object property operations (CRUD operations)
   ============================================ */

// Test data:
const user = {
  id: 101,
  name: "Ravi",
  email: "ravi@gmail.com",
  role: "student",
  isActive: true
};

// Tasks:
// 1. Read and print the user's name and email (accessing object properties)
// 2. Add a new property lastLogin: "2026-01-01" (property addition)
// 3. Update role from "student" to "admin" (property update)
// 4. Delete the isActive property (property deletion)
// 5. Use Object.keys() to list all remaining fields (object introspection)


// 1. Read and print the user's name and email
console.log("Name:", user.name);
console.log("Email:", user.email);

// 2. Add a new property lastLogin: "2026-01-01"
user.lastLogin = "2026-01-01";          
// 3. Update role from "student" to "admin"
user.role = "admin";                    
// 4. Delete the isActive property
delete user.isActive;                   
// 5. Use Object.keys() to list all remaining fields
console.log("Remaining Fields:", Object.keys(user));






/* ============================================
   Assignment 2: Exam Result Summary
   ============================================
   Scenario: Marks are stored subject-wise for a student.
   This assignment covers object value manipulation and mathematical operations
   ============================================ */

// Test data:
const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};

// Tasks:
// 1. Calculate total marks (sum of all object values)
// 2. Calculate average marks (arithmetic mean)
// 3. Find the highest scoring subject (finding max value and its key)
// 4. Add a new subject computer: 90 (dynamic property addition)

// 1. Calculate total marks
let totalMarks = Object.values(marks).reduce((acc, curr) => acc + curr, 0);
console.log("Total Marks:", totalMarks);

// 2. Calculate average marks
let avgMarks = totalMarks / Object.values(marks).length;
console.log("Average Marks:", avgMarks);

// 3. Find the highest scoring subject
let highestSubject = Object.keys(marks).reduce((maxSubj, currSubj) => 
  marks[currSubj] > marks[maxSubj] ? currSubj : maxSubj, Object.keys(marks)[0]);
console.log("Highest Scoring Subject:", highestSubject, "with marks", marks[highestSubject]);

// 4. Add a new subject computer: 90
marks.computer = 90;
console.log("Updated Marks with Computer:", marks); 












/* ============================================
   Assignment 3: Application Settings Controller
   ============================================
   Scenario: A web app stores user preferences as settings.
   This assignment covers conditional updates and object immutability
   ============================================ */

// Test data:
const settings = {
  theme: "light",
  notifications: true,
  autoSave: false,
  language: "en"
};


// Tasks:
// 1. Toggle theme between "light" and "dark" (conditional property update)
// 2. Turn autoSave to true (boolean property update)
// 3. Remove the notifications setting (property deletion)
// 4. Freeze the settings object so it cannot be modified (Object.freeze())

// 1. Toggle theme between "light" and "dark"
settings.theme = settings.theme === "light" ? "dark" : "light";
console.log("Toggled Theme:", settings.theme);          
// 2. Turn autoSave to true
settings.autoSave = true;                               
console.log("AutoSave Enabled:", settings.autoSave);    
// 3. Remove the notifications setting
delete settings.notifications;                        
console.log("Notifications Setting Removed:", settings); 
// 4. Freeze the settings object so it cannot be modified
Object.freeze(settings);                                 
console.log("Settings Object Frozen:", settings);