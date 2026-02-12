class Book { // Define book class
    title; // Book title property
    author; // Author name property
    pages; // Number of pages property
    isAvailable=true; // Book availability status

    constructor(title, author, pages) { // Initialize book constructor
        this.title = title; // Set book title
        this.author = author; // Set author name
        this.pages = pages; // Set page count
    }

    borrow() { // Method to borrow book
        this.isAvailable = false; // Mark book as unavailable
    }

    returnBook() { // Method to return book
        this.isAvailable = true; // Mark book as available
    }

    getInfo() { // Method to get book information
        return `${this.title} by ${this.author} (${this.pages} pages)`; // Return formatted string
    }

    isLongBook() { // Check if book is long
        return this.pages > 300; // Return true if more than pages
    }
}

let book1= new Book("Reverend Insanity", "Gu Zhen Ren", 350); // Create first book
let book2= new Book("Lord of the Mysteries", "Cuttlefish That Loves Diving", 400); // Create second book
let book3= new Book("Regressor's Tale of Cultivation", "Moonlight Blade", 280); // Create third book
let book4= new Book("Harry Potter", "J.K. Rowling", 500); // Create fourth book
let book5= new Book("Atomic Habits", "James Clear", 320); // Create fifth book

//Display info of all books
console.log(book1.getInfo());
console.log(book2.getInfo());
console.log(book3.getInfo());
console.log(book4.getInfo());
console.log(book5.getInfo());

//Borrow 2 books and show their availability status
book1.borrow(); // Borrow first book
book2.borrow(); // Borrow second book

console.log(`\nIs "${book1.title}" available? ${book1.isAvailable ? 'Yes' : 'No'}`);
console.log(`Is "${book2.title}" available? ${book2.isAvailable ? 'Yes' : 'No'}`);

//Return 1 book and show updated status
book2.returnBook(); // Return second book
console.log(`\nIs "${book2.title}" available? ${book2.isAvailable ? 'Yes' : 'No'}`);

//Count how many books are "long books" (more than 300 pages)
console.log(`\nNo. of long books: ${
    [book1, book2, book3, book4, book5].filter(book => book.isLongBook()).length // Count long books
}`);

//List all available books
console.log(`\nList of all available books:\n${
    [book1, book2, book3, book4, book5].filter(book => book.isAvailable).map(book => book.getInfo()).join("\n") // Get available book details
}`);