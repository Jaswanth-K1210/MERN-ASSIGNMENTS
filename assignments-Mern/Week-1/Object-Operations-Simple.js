//Assignment 1: User Profile Manager
const user = {
    id: 101,
    name:"Ravi",
    email: "ravi@gmail.com",
    role: "student",
    isActive: true
}

console.log(user.name );
console.log(user['email']);

user.lastLogin = "2026-01-01"; // Add last login timestamp property

user.role="admin"; // Update user role to admin

delete user.isActive; // Remove active status property

console.log(Object.keys(user));


//Assignment 2: Exam Result Summary
const marks= {
    maths:78,
    physics:65,
    chemistry:82,
    english:55,
    gettotal: function(){ // Function to sum all marks
        return this.maths + this.physics + this.chemistry + this.english; // Return total sum
        
    },
    maximum: function(){ // Function to find maximum mark
        return Math.max(this.maths, this.physics, this.chemistry, this.english); // Return highest mark
    }
};
marks.gettotal() // Call total calculation method
console.log("Total Marks: " + marks.gettotal());
console.log("Average Marks: " + (marks.gettotal() / 4));

console.log("Highest Marks Subject: " + marks.maximum());

marks.computer = 90; // Add new computer science subject

console.log(marks);


//Assignment 3: Application Settings Controller
const settings = {
  theme: "light",
  notifications: true,
  autoSave: false,
  language: "en"
};


settings.theme= "dark"; // Change theme to dark mode
settings.autoSave = true; // Enable automatic save feature
delete settings.notifications; // Remove notifications setting
Object.freeze(settings); // Freeze object to prevent modifications