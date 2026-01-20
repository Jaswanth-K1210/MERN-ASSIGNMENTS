//Assignment 1: User Profile Manager
//----------------------------------
//Scenario : You are managing a logged-in user’s profile in a web application.

//Tasks:
//    1. Read and print the user’s name and email
  //  2. Add a new property lastLogin: "2026-01-01"
  //  3. Update role from "student" to "admin"
  //  4. Delete the isActive property
  //  5. Use Object.keys() to list all remaining fields


const user = {
  id: 101,
  name: "Ravi",
  email: "ravi@gmail.com",
  role: "student",
  isActive: true
};

// 1. Read and print the user’s name and email
console.log('name:',user.name)
console.log('email:',user.email)

// 2. Add a new property lastLogin: "2026-01-01"
user.lastLogin = "2026-01-01";

// 3. Update role from "student" to "admin"
user.role = "admin";

// 4. Delete the isActive property
delete user.isActive;

// 5. Use Object.keys() to list all remaining fields
console.log(Object.keys(user));

// assignment -2 
//Assignment 2: Exam Result Summary
//Scenario : Marks are stored subject-wise for a student.


///Tasks:
   /// 1. Calculate total marks
    //2. Calculate average marks
    //3. Find the highest scoring subject
    //4. Add a new subject computer: 90

const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55,
  gettotal: function(){
    let total=0;
    for(let val of Object.values(this)){
        total=total+val
    }
    return total/Object.values(this).length 

  },
  getavg: function(){
    return this.gettotal()/Object.values(this).length
  }
};

// 1. Calculate total marks

console.log('Total Marks:', marks.gettotal())

// 2. Calculate average marks
console.log('Average Marks:', marks.getavg())

// 3. Find the highest scoring subject
let highestSubject = '';
let highestMarks = 0;
for (let subject in marks) {
  if (marks[subject] > highestMarks) {
    highestMarks = marks[subject];
    highestSubject = subject;
  }
}
console.log('Highest Scoring Subject:', highestSubject)

// 4. Add a new subject computer: 90
marks.computer = 90;
console.log('Updated Marks:', marks);


// writte a function that extracts marks greater than 70 and packthem in to a array and return the array
let ms=[78,65,82,55,90,45,23,89,67]
let res = ms.filter(function(element){
    return element > 70
})
console.log('Marks greater than 70:',res)
// simplified using arrow function
let res1 = ms.filter(element => element > 70)
console.log('Marks greater than 70 (arrow function):',res1)


// find all marks between 30 and 90
let res2 = ms.filter(element => element >=30 && element <=90)
console.log('Marks between 30 and 90 :',res2)



// students
let students = [
    {sno:101, name:'Alice', age:22},
    {sno:102, name:'Bob', age:23},
    {sno:103, name:'Charlie', age:21},
    {sno:104, name:'David', age:24}
]

//find studensts with age less than 20
let res8 = students.filter((stu)=> stu.age < 22)
console.log('Students with age less than 22:', res8)    

// add or increment age by 2 years for  bob
let res9 = students.map((stu)=>{
    if(stu.name === 'Bob'){
        stu.age += 2
    }
    return stu
})
console.log('Updated students:', res9)


// find the sum of ages of al the students 

let tot = students.reduce((acc,stu) => acc+stu.age,0)
console.log('Sum of ages of all students:', tot)

