const temperatures = [32, 35, 28, 40, 38, 30, 42];

let temp = temperatures.filter(t => t > 35); // Filter temperatures above 35
console.log("Temperatures > 35: " + temp);

let Faren= temperatures.map(t => (t * 9/5) + 32); // Convert to Fahrenheit
console.log("Temperatures in Faren: " + Faren);

let avg = temperatures.reduce((acc,t) => acc+t,0) / temperatures.length; // Calculate average temperature
console.log("Average Temperature: " + avg);

let first = temperatures.find(t => t> 40); // Find first temperature above value
console.log("First temp above 40: " + first);

let index = temperatures.findIndex(t => t === 28); // Find index of specific temperature
console.log("Index of temperature 28: " + index);


const courses = ["javascript", "react", "node", "mongodb", "express"];

let ll= courses.filter(c=> c.length > 5) // Filter courses with longer names
console.log("Courses length > 5: " + ll);

let up= courses.map(c => c.toUpperCase()); // Convert all course names to uppercase
console.log("Uppercase: " + up);

let single= courses.reduce((acc, c) => acc + " " + c, ""); // Combine courses into single string
console.log("Single string: " + single);

let reac= courses.find(c => c=== "react"); // Find react course in array
console.log("Finding course react: " + reac);

let ind = courses.findIndex(c => c === "node"); // Find index of node course
console.log("Index of course node: " + ind);


const marks = [78, 92, 35, 88, 40, 67];

let pass = marks.filter(m => m>=40   ); // Filter marks equal or above minimum
console.log("Passing marks: " + pass);

let grace= marks.map(m => m+5); // Add grace marks to every mark
console.log("Marks after grace: " + grace);

let highest =  marks.reduce((acc,m) => (m > acc ? m : acc), marks[0]); // Find highest mark value
console.log("Highest marks: " + highest);

let bel = marks.find(m => m < 40); // Find first failing mark
console.log("First mark below 40: " + bel);

let indmarks = marks.findIndex(m => m === 92); // Find index of specific mark
console.log("Index of mark 92: " + indmarks);