// HANDS-ON 1: Smart Login Status Engine
let isLoggedIn= false;
let isProfileComplete= false;

if(!isLoggedIn){ // Check if user is not logged in
    message="Please log in."; // Set login required message
}
else if(isLoggedIn && !isProfileComplete){ // Check if profile incomplete
    message="Complete your profile." // Set profile warning message
} 
else{ // User is fully logged in
    message="Welcome back!" // Set welcome message
}

console.log(message);

//HANDS-ON 2: Course Price Tag Labeler
let price=1299;
let label="";

if(price<500) // Check if price is budget
    label="Budget Course"; // Assign budget label
else if(price>=500 && price<=1000) // Check if standard price
    label="Standard Course"; // Assign standard label
else // Otherwise premium category
    label="Premium Course"; // Assign premium label

console.log("Label: " + label);

//HANDS-ON 3: Enrollment Eligibility Checker
let hasPaid= true;
let hasCompletedBasics= false;

let enrollMessage = (hasPaid && hasCompletedBasics) ? "Enroll Now" : "Complete Requirements"; // Check enrollment eligibility

console.log(enrollMessage);