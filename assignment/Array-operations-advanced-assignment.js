/*
ASSIGNMENT 1:
-------------
You are building a shopping cart summary for an e-commerce website.

Test Data : 
*/
const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

// 1. filter() inStock products
let stock = cart.filter(product => product.inStock)
console.log("In Staock Products:", stock)

// 2. map() to create new array with name and totalPrice
let prod = cart.map(product => ({
    name: product.name,
    totalPrice: (product.price * product.quantity)
}))
console.log("Products with Total Price:", prod)
// 3. reduce() to calculate grand total cart value
let gTot = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)
console.log("Grand Total Cart Value:", gTot)

// 4. find() details of "Mouse"
let mouse = cart.find(product => product.name.toLowerCase() == 'mouse')
console.log("Details of mouse:", mouse)

// 5. findIndex() position of "Keyboard"
let Keyboardin = cart.findIndex(product => product.name.toLowerCase() == 'keyboard')
console.log("Index of Keyboard:", Keyboardin)




/*
ASSIGNMENT 2:
-------------
Student Performance Dashboard

You are working on a college result analysis system.

Test Data:
*/
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

/*
Tasks:
    1. filter() students who passed (marks ≥ 40)
    2. map() to add a grade field
              ≥90 → A
              ≥75 → B
              ≥60 → C
              else → D

   3. reduce() to calculate average marks
   4. find() the student who scored 92
   5. findIndex() of student "Kiran"
*/
// 1. filter() students who passed (marks ≥ 40)
let pass = students.filter(student => student.marks >= 40)
console.log("Passed Students:", pass)

// 2. map() to add a grade field
let grade = students.map(student => ({
    student,
    grade: student.marks >= 90 ? 'A' :
           student.marks >= 75 ? 'B' :
           student.marks >= 60 ? 'C' : 'D'
}))
console.log("Students with Grades:", grade)

// 3. reduce() to calculate average marks
let totalMarks = students.reduce((acc, student) => acc + student.marks, 0)
let avgMarks = totalMarks / students.length
console.log("Average Marks:", avgMarks)

//





/*
ASSIGNMENT 3:
-------------
Employee Payroll Processor

You are building a salary processing module in a company HR app.

Test data:
*/
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

/*
Tasks:
    1. filter() employees from IT department
    2. map() to add:
            netSalary = salary + 10% bonus

    3. reduce() to calculate total salary payout
    4. find() employee with salary 30000
    5. findIndex() of employee "Neha"
*/
// 1. filter() employees from IT department
let itEmployees = employees.filter(employee => employee.department.toLowerCase() === 'it')
console.log("IT Department Employees:", itEmployees)

// 2. map() to add netSalary = salary + 10% bonus
let withBonus = employees.map(employee => ({
    ...employee,
    netSalary: employee.salary + (0.1 * employee.salary)
}))
console.log("Employees with Net Salary:", withBonus)

// 3. reduce() to calculate total salary payout
let totalPayout = employees.reduce((acc, employee) => acc + employee.salary, 0)
console.log("Total Salary Payout:", totalPayout)

// 4. find() employee with salary 30000
let emp30000 = employees.find(employee => employee.salary === 30000)
console.log("Employee with Salary 30000:", emp30000)

// 5. findIndex() of employee "Neha"
let indexNeha = employees.findIndex(employee => employee.name.toLowerCase() === 'neha')
console.log("Index of Employee Neha:", indexNeha) 









/*
ASSIGNMENT 4: 
------------
Movie Streaming Platform

You are working on a movie recommendation system.

Test data:
*/
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

/*
Tasks:
    1. filter() only "Sci-Fi" movies
    2. map() to return:
            "Inception (8.8)"

    3. reduce() to find average movie rating
    4. find() movie "Joker"
    5. findIndex() of "Avengers"
*/

// 1. filter() only "Sci-Fi" movies
let sciFiMovies = movies.filter(movie => movie.genre.toLowerCase() === 'sci-fi')
console.log("Sci-Fi Movies:", sciFiMovies)

// 2. map() to return: "Inception (8.8)"
let movieTitles = movies.map(movie => `${movie.title} (${movie.rating})`)
console.log("Movie Titles with Ratings:", movieTitles)      
// 3. reduce() to find average movie rating
let totalRating = movies.reduce((acc, movie) => acc + movie.rating, 0)
let avgRating = totalRating / movies.length
console.log("Average Movie Rating:", avgRating)

// 4. find() movie "Joker"
let jokerMovie = movies.find(movie => movie.title.toLowerCase() === 'joker')
console.log("Details of Movie 'Joker':", jokerMovie)

// 5. findIndex() of "Avengers"
let indexAvengers = movies.findIndex(movie => movie.title.toLowerCase() === 'avengers')
console.log("Index of Movie 'Avengers':", indexAvengers)    







/*
ASSIGNMENT 5: 
-------------
Bank Transaction Analyzer

You are building a bank statement summary.

Test data:
*/
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

/*
Tasks:
    1. filter() all credit transactions
    2. map() to extract only transaction amounts
    3. reduce() to calculate final account balance
    4. find() the first debit transaction
    5. findIndex() of transaction with amount 10000
*/
// 1. filter() all credit transactions
let creditTransactions = transactions.filter(transaction => transaction.type.toLowerCase() === 'credit')
console.log("Credit Transactions:", creditTransactions)

// 2. map() to extract only transaction amounts
let transactionAmounts = transactions.map(transaction => transaction.amount)
console.log("Transaction Amounts:", transactionAmounts)

// 3. reduce() to calculate final account balance
let finalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type.toLowerCase() === 'credit' ? acc + transaction.amount : acc - transaction.amount
}, 0)
console.log("Final Account Balance:", finalBalance)

// 4. find() the first debit transaction
let firstDebit = transactions.find(transaction => transaction.type.toLowerCase() === 'debit')
console.log("First Debit Transaction:", firstDebit)

// 5. findIndex() of transaction with amount 10000
let index10000 = transactions.findIndex(transaction => transaction.amount === 10000)
console.log("Index of Transaction with Amount 10000:", index10000)  