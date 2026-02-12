//HANDS-ON 1
const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: false },
  { id: 3, name: "Suman", role: "student", active: true }
];

//Get only active users
let activeUsers = users.filter(user => user.active); // Filter active users
console.log("Active Users:", activeUsers);

//Extract only names of active users
console.log("\nNames of Active Users:", activeUsers.map(usr=> usr.name)); // Map user names

//Check if any admin exists
console.log("\nAdmin Exists:", users.find(usr=> usr.role === "admin") ? "Yes" : "No"); // Check admin exists

//Find user with id=2
console.log("\nUser with ID 2:", users.find(usr=> usr.id === 2)); // Find specific user

//Create a new array where Ravi becomes inactive (do NOT mutate)
let copiedUsers = [...users]; // Copy users array
copiedUsers[0].active = false; // Update first user status
console.log("\nDeactivating a User Immutably:", copiedUsers);

console.log("--------------------------------------------------");

//HANDS-ON 2
const cart = [
  { id: 101, product: "Laptop", price: 50000, qty: 1 },
  { id: 102, product: "Mouse", price: 500, qty: 2 }
];

//Calculate total cart value
console.log("\nTotal Cart Value:",cart.reduce((acc,item) => acc+ item.price *item.qty,0)); // Sum cart value

//Increase quantity of Mouse by 3 (immutably)
let copiedCart= [...cart]; // Copy cart array
let Mouse= copiedCart.findIndex(item=> item.product === "Mouse"); // Find mouse index
copiedCart[Mouse].qty += 3; // Increase quantity
console.log("\nIncreasing Mouse Quantity Immutably:", copiedCart);

//Remove Laptop from cart
let Laptop= cart.findIndex(item=> item.product === "Laptop"); // Find laptop index
cart.splice(Laptop,1); // Remove laptop item
console.log("\nRemoving Laptop from Cart:", cart);

//Extract only { product, totalPrice } per item
console.log("\nProduct and Total Price per Item:", cart.map(item=> ({ product: item.product, totalPrice: item.price * item.qty }))); // Map product info

//Check if all item costs more than 300
console.log("\nAll items cost more than 300? ", cart.filter(item=> item.price * item.qty > 300).length > 0 ? "Yes" : "No"); // Check price threshold
console.log("--------------------------------------------------");

//HANDS-ON 3

const students = [
  { name: "Asha", marks: [80, 75, 90] },
  { name: "Kiran", marks: [60, 55, 70] },
  { name: "Meena", marks: [95, 92, 88] }
];

//Calculate average marks per student
let averageMarks= students.map(student=> { // Map student average
    let total = student.marks.reduce((acc, mark) => acc + mark, 0); // Sum marks
    return { name: student.name, average: (total / student.marks.length).toFixed(2) }; // Return average
}
);
console.log("\nAverage Marks of Students:", averageMarks.map(student=> student.average));

//Create a new array with {name,average}
console.log("\nStudents with Average Marks:", averageMarks);

//Find students with average > 80
console.log("\nStudents with average > 80:",averageMarks.filter(student => student.average > 80)); // Filter high performers
//Check if any student has failed {average < 40}
let failedStudents= averageMarks.filter(student=> student.average < 40) // Filter failed students
console.log("\nFailed Students:", failedStudents.length > 0 ? failedStudents : "No Student Failed");

//Extract only student names who passed
console.log("\nPassed Students:",averageMarks.filter(student=> student.average >= 40).map(student=> student.name)); // Get passing students

console.log("--------------------------------------------------");

//HANDS-ON 4

const roles = {
  admin: ["create", "update", "delete", "view"],
  editor: ["update", "view"],
  viewer: ["view"]
};

//Get all role names
console.log("\nAll roles:", Object.keys(roles)); // Get all role keys

//Check if editor can delete
console.log("\nCan Editor Delete?", roles.editor.find(del=> del=="delete") ? "Yes" : "No"); // Check permission exists
    
//Create a flat array of all unique permissions
let uniquePermissions = [...new Set(Object.values(roles).flat())]; // Get unique permissions
console.log("\nUnique Permissions:", uniquePermissions);

//Add a new role moderator with permissions (immutably)
let copiedRoles= {...roles}; // Copy roles object
copiedRoles.moderator = ["view", "update"]; // Add new role
console.log("\nAdding New Role Immutably:", copiedRoles);

//Convert roles object into array of { role, permissionsCount }
let rolesArray= Object.keys(roles).map(role => { // Map role data
    return {role: role, permissionsCount: roles[role].length}; // Return role info
})
console.log("\nRoles with Permission Count:", rolesArray);

console.log("--------------------------------------------------");

//HANDS-ON 5

const apiResponse = {
  status: "success",
  data: [
    { id: 1, title: "JS Basics", price: 999, published: true },
    { id: 2, title: "React", price: 1499, published: false },
    { id: 3, title: "Node", price: 1299, published: true }
  ]
};

//Extract only data array
let courses= apiResponse.data; // Get data array
console.log("\nCourses Data:", courses);

//Get only published courses
console.log("\nPublished Courses:", courses.filter(course=> course.published)); // Filter published only

//Sort courses by price (high → low)
courses.sort((a,b) => b.price - a.price); // Sort descending price
console.log("\nCourses sorted by Price:", courses);

//Create a list of course titles
let coursesTitles= courses.map(course=> course.title); // Extract course names
console.log("\nCourse Titles:", coursesTitles);

//Calculate total price of published courses
console.log("\nPublished Courses:", courses.filter(course=> course.published).map(course=> course.price).reduce((acc,price) => acc+price,0)); // Sum published prices
