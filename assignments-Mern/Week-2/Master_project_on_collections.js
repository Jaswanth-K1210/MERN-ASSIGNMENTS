//Project Story: “We are building the data engine of an online learning platform(like Udemy / Coursera / company LMS).Frontend and backend will later consume THIS logic.”

const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false },
];

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true },
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 },
];

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"],
};

//Module-1: USER PROCESSING ENGINE

// Get names of all active users and extract names of active users
let activeUsersNames = users.filter(user => user.active).map(user => user.name);
console.log("\nActive Users: ", activeUsersNames);

// Check if there is an admin user
let adminUser= users.find(user => user.role === "admin");
console.log(adminUser ? "\nAdmin User Exists" : "\nNo Admin User Found");

// Find user by Id
let findUserById= users.find(user=> user.id === 2);
console.log("\nUser with ID 2: ", findUserById);

//Deactivate a user immutably
let copiedUsers= [...users];
copiedUsers[0].active= false;
console.log("\nDeactivating a User Immutably:", copiedUsers);

console.log("--------------------------------------------------");

//Module-2: COURSE CATALOG ENGINE

// Get published courses
let publishedCourses=courses.filter(course=> course.published);
console.log("\nPublished Courses: ", publishedCourses);

// Sort courses by price (high → low)
let sortedCourses= courses.sort((a,b) => b.price - a.price);
console.log("\nCourses sorted by Price: ", sortedCourses);

// Extract { title, price } only
let courseTitles= courses.map(course=> ({title: course.title, price: course.price}));
console.log("\nCourse Titles and Prices: ", courseTitles);

// Calculate total value of all published courses
let totalValue= publishedCourses.reduce((acc, course) => acc + course.price,0);
console.log("\nTotal Course Value: " + totalValue);
// Add a new course immutably
let copiedCourses= [...courses];
copiedCourses.push({id:104, title:"Express", price:999, published:true});
console.log("\nAdded a Course Immutably: ", copiedCourses);

console.log("--------------------------------------------------");

//Module-3: SHOPPING CART ENGINE

// Merge cart with courses to get full course info
let mergedCart= cart.map(item =>{
    let course= courses.find(c => c.id === item.courseId);
    return {
        title: course.title,
        price: course.price,
        qty: item.qty,
        totalPrice: course.price * item.qty
    };  
})
console.log("\nMerged Cart: ", mergedCart);

// Calculate total cart amount
let totalCartValue= mergedCart.reduce((acc,course) =>acc+course.totalPrice,0);
console.log("\nTotal Cart Amount: " + totalCartValue);

// Increase quantity of a course (immutably
let copiedCart= [...cart];
cart[0].qty=4;
console.log("\nUpdated Quantity Immutably: ", copiedCart);
// Remove a course from cart 
let updatedCart= mergedCart.filter(item => item.id!=101);
console.log("\nCart after removing a course: ", updatedCart);

// Check if all cart items are paid courses
let allPaid= mergedCart.every(item => item.totalPrice > 0);
console.log(allPaid ? "\nAll courses are paid" : "\nSome courses are free");

console.log("--------------------------------------------------");

//Module-4: ROLE & PERMISSION ENGINE

// Get all roles names
console.log("\nRoles:",Object.keys(roles));

// Check if student can delete
console.log(roles.student.includes("delete") ? "\nStudent can delete" : "\nStudent cannot delete");

// Get a flat list of all unique permissions
let allPermissions=(Object.values(roles).flat());
allPermissions=[...new Set(allPermissions)];
console.log("\nAll Permissions: ", allPermissions);

// Add a new role moderator immutably
let copiedRoles= {...roles};
copiedRoles.moderator = ["view", "update"];
console.log("\nCopied Roles: ", copiedRoles);

console.log("--------------------------------------------------");