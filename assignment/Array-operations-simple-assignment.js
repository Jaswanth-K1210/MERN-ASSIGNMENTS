// git assignment test file 
/*
Assignment 1: Daily Temperature Analyzer
*/

const temperatures = [32, 35, 28, 40, 38, 30, 42];

// filter temperatures above 35
let res = temperatures.filter((temp)=> temp > 35)
console.log("Filtered Temperatures above 35:", res)

// map to convert Celsius to Fahrenheit
let Fahrenheittem = temperatures.map((temp)=> (temp * 9/5) + 32)
console.log("Temperatures in Fahrenheit:", Fahrenheittem)

// reduce to calculate average temperature
let tot = temperatures.reduce((acc, curr)=> acc + curr, 0)
console.log("Average Temperature:", tot / temperatures.length)

// find first temperature above 40
let above40 = temperatures.find((temp)=> temp > 40)
console.log("First Temperature above 40:", above40)

// findIndex of temperature 28
let index28 = temperatures.findIndex((temp)=> temp === 28)
console.log("Index of Temperature 28:", index28)









/*
Assignment 2: Online Course Name Processor
*/

const courses = ["javascript", "react", "node", "mongodb", "express"];


// 1. filter() courses with name length > 5
let filteredCourses = courses.filter(course => course.length > 5);
console.log("Filtered Courses (length > 5):", filteredCourses);

// 2. map() to convert course names to uppercase
let upperCaseCourses = courses.map(course => course.toUpperCase());
console.log("Courses in Uppercase:", upperCaseCourses);

// 3. reduce() to generate a single string:
let courseString = courses.reduce((acc, curr) => acc + " | " + curr.toUpperCase());
console.log("Course String:", courseString);

// 4. find() the course "react"
let foundCourse = courses.find(course => course.toLowerCase() === "react");
console.log("Found Course 'react':", foundCourse); 

// 5. findIndex() of "node"
let indexOfNode = courses.findIndex(course => course.toLowerCase() === "node");
console.log("Index of 'node':", indexOfNode);








/*
Assignment 3: Student Marks List
*/

const marks = [78, 92, 35, 88, 40, 67];

// 1. filter() marks ≥ 40 (pass marks)
let pass = marks.filter(mark=> mark >=40)
console.log('Pass Marks:',pass)

// 2. map() to add 5 grace marks to each student
let graceMarks = marks.map(mark=> mark + 5)
console.log('Marks after Grace:',graceMarks)

// 3. reduce() to find highest mark
let highest = marks.reduce((max, curr)=> (curr > max ? curr : max), marks[0])
console.log('Highest Mark:',highest)

// 4. find() first mark below 40
let first = marks.find(mark => mark < 40)
console.log('First Mark below 40:',first)

// 5. findIndex() of mark 92    
let in92 = marks.findIndex(mark => mark === 92  )
console.log('Index of Mark 92:',in92)