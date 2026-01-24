// ==========================================================
// Assignment 1: Date Creation & Extraction (Beginner)
// ==========================================================

/*
Tasks:
       1. Create a Date object for current date & time.
       2. Extract and display:
                    * Year
                    * Month (human readable)
                    * Date
                    * Day of week
                    * Hours, minutes, seconds

      3. Display the date in this format:
                    DD-MM-YYYY HH:mm:ss
*/

// TODO: Write code for Assignment 1 here
// const now = new Date();

//1. Create a Date object for current date & time.
const now = new Date();

//2. Extract and display:
const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-based
const date = now.getDate();
const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

console.log(year); // Year
console.log(month); // Month (human readable)
console.log(date); // Date
console.log(dayOfWeek); // Day of week
console.log(hours, minutes, seconds); // Hours, minutes, seconds

//3. Display the date in this format: DD-MM-YYYY HH:mm:ss
const formattedDate = `${String(date).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
console.log(formattedDate);



// ==========================================================
// Assignment 2: Date Comparison & Validation (Beginner → Intermediate)
// ==========================================================

/*
 Given:
      let enrollmentDeadline = new Date("2026-01-20");

Tasks:
  1. Check if:
      * Today is before deadline → "Enrollment Open"
      * Today is after deadline → "Enrollment Closed"

  2. Validate user input date:
      * Input: "2026-02-30"
      * Detect whether the date is valid or invalid
*/

// Given:
let enrollmentDeadline = new Date("2026-01-20");

// TODO: Write code for Assignment 2 here
//1. Check if today is before or after deadline
const today = new Date();
if (today < enrollmentDeadline) {
    console.log("Enrollment Open")
} else {
    console.log("Enrollment Closed")
}

//2. Validate user input date
let userInput = "2026-02-30"
let dateParts = userInput.split("-")
let yearInput = parseInt(dateParts[0], 10)
let monthInput = parseInt(dateParts[1], 10) - 1
let dayInput = parseInt(dateParts[2], 10)



// ==========================================================
// Assignment 3: Age Calculator (Intermediate)
// ==========================================================

/*
Input:
    let dob = "2000-05-15";

Tasks:
        1. Calculate exact age in years
*/

// Input:
let dob = "2000-05-15";

// TODO: Write code for Assignment 3 here

let birthDate = new Date(dob)
let age = today.getFullYear() - birthDate.getFullYear()
let monthDiff = today.getMonth() - birthDate.getMonth()
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}
console.log(`Age: ${age} years`)
let testDate = new Date(yearInput, monthInput, dayInput)
if (testDate.getFullYear() === yearInput && testDate.getMonth() === monthInput && testDate.getDate() === dayInput) {
    console.log("Valid date")
} else {
    console.log("Invalid date")
}   