/*
=============================================================================
PROJECT STORY
=============================================================================
“We are building the data engine of an online learning platform 
(like Udemy / Coursera / company LMS). 
Frontend and backend will later consume THIS logic.”
*/

// ==========================================================================
// DATA SETUP
// ==========================================================================

const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};


// ==========================================================================
// TASKS
// ==========================================================================

/* 
-----------------------------------------------------------------------------
MODULE-1 : USER PROCESSING ENGINE
-----------------------------------------------------------------------------
  -> Get only active users
  -> Extract names of active users
  -> Check if any admin exists
  -> Find user by id
  -> Deactivate a user immutably
*/

// TODO: Write code for Module 1 here

// Example: Get only active users
const activeUsers = users.filter(user => user.active);
console.log("Active Users:", activeUsers)
// B. Extract names of active users
const activeUserNames = activeUsers.map(user => user.name);
console.log("Active User Names:", activeUserNames)
// C. Check if any admin exists
const hasAdmin = users.some(user => user.role === "admin"); 
//D. Find user by id
const userIdToFind = 2;
const foundUser = users.find(user => user.id === userIdToFind);
console.log("Found User:", foundUser)
// E. Deactivate a user immutably
const userIdToDeactivate = 3;
const updatedUsers = users.map(user => 
    user.id === userIdToDeactivate ? { ...user, active: false } : user
);
console.log("Updated Users after Deactivation:", updatedUsers)


/* 
-----------------------------------------------------------------------------
MODULE 2: COURSE CATALOG ENGINE
-----------------------------------------------------------------------------
  -> Get published courses
  -> Sort courses by price (high → low)
  -> Extract { title, price } only
  -> Calculate total value of published courses
  -> Add a new course immutably
*/

// TODO: Write code for Module 2 here

// A. Get published courses
const publishedCourses = courses.filter(course => course.published);

// B. Sort courses by price (high → low)
// Note: We use [...publishedCourses] to create a copy so we don't mutate the original array
const sortedCourses = [...publishedCourses].sort((a, b) => b.price - a.price);

// C. Extract { title, price } only
const courseLabels = courses.map(({ title, price }) => ({ title, price }));

// D. Calculate total value of published courses
const totalValue = publishedCourses.reduce((acc, course) => acc + course.price, 0);

// E. Add a new course immutably
const newCourse = { id: 104, title: "Vue.js", price: 1100, published: true };
const updatedCourseList = [...courses, newCourse];

console.log("Module 2 Output:", { sortedCourses, totalValue });

/* 
-----------------------------------------------------------------------------
MODULE 3: SHOPPING CART ENGINE 
-----------------------------------------------------------------------------
  -> Merge cart with courses to get full course info
  -> Calculate total cart amount
  -> Increase quantity of a course (immutably)
  -> Remove a course from cart
  -> Check if all cart items are paid courses
*/

// TODO: Write code for Module 3 here



/* 
-----------------------------------------------------------------------------
MODULE 4: ROLE & PERMISSION ENGINE
-----------------------------------------------------------------------------
  -> Get all role names
  -> Check if student can delete
  -> Create a flat list of all unique permissions
  -> Add new role moderator immutably
*/

// TODO: Write code for Module 4 here
// A. Get all role names
const roleNames = Object.keys(roles);

// B. Check if student can delete
const canStudentDelete = roles.student.includes("delete");

// C. Create a flat list of all unique permissions
// Object.values gives array of arrays [[perms], [perms]]. .flat() flattens it. new Set removes duplicates.
const uniquePermissions = [...new Set(Object.values(roles).flat())];

// D. Add new role moderator immutably
const updatedRoles = {
    ...roles,
    moderator: ["view", "create", "update"]
};

console.log("Module 4 Output:", { roleNames, canStudentDelete, uniquePermissions, updatedRoles });