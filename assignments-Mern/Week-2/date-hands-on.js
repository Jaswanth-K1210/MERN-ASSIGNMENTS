//Task-1
let date= new Date(); // Create new date object

//display year
console.log("Year:", date.getFullYear());

//display month (human readable format)
console.log("Month:", date.getMonth()+1); // Get month number

//display date
console.log("Date:", date.getDate());

//display day
console.log("Day:", date.getDay()+1); // Get day of week

//display hours, minutes, seconds
console.log("Hours:Minutes:Seconds" , date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()); // Format time

//display in DD-MM-YYYY HH:MM:SS format
console.log("DD-MM-YYYY HH:MM:SS\n",date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()); // Complete datetime format

console.log("-----------------------------------------------");

//Task-2
let enrollmentDeadline = new Date("2026-01-20"); // Create deadline date

//check if enrollment is open or closed
console.log(enrollmentDeadline>new Date()?"Enrollment Open":"Enrollment Closed"); // Compare dates

//check if input is a valid date
let input = "2026-02-30"; // Invalid date input
console.log(new Date(input)?"Valid Date":"Invalid Date"); // Validate date format

console.log("-----------------------------------------------");

//Task-3
let dob = "2002-05-15"; // Set date of birth
let birthDate = new Date(dob); // Convert to date
let currentDate = new Date(); // Get current date

//calculate age
if (currentDate.getMonth() < birthDate.getMonth() || // Check month before
  (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) { // And check day
  console.log("Age:", currentDate.getFullYear() - birthDate.getFullYear() - 1); // Subtract if not reached
}   
else { // Birthday already passed
  console.log("Age:", currentDate.getFullYear() - birthDate.getFullYear()); // Calculate age
}
console.log("-----------------------------------------------");