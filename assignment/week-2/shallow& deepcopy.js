// ==========================================================
// Hands-On 1: Shallow Copy (Controlled Mutation Use Case)
// ==========================================================

/*
🧪 Given Data:
    const user = {
        id: 101,
        name: "Ravi",
        preferences: {
            theme: "dark",
            language: "en"
        }
    };

🎯 Task
    1. Create a shallow copy of user
    2. Change:
          i. name in the copied object
          ii. preferences.theme in the copied object
          iii. Log both original and copied objects
          iv. Observe what changes and what doesn’t
*/

const user = {
    id: 101,
    name: "Ravi",
    preferences: {
        theme: "dark",
        language: "en"
    }
};

// TODO: Solution for Hands-On 1
console.log("--- Shallow Copy ---");
// Your code here...
// Create a shallow copy of user
const shallowCopyUser = { ...user };

// Modify the name in the copied object
shallowCopyUser.name = "Amit";

// Modify the preferences.theme in the copied object
shallowCopyUser.preferences.theme = "light";

// Log both original and copied objects
console.log("Original User:", user);
console.log("Shallow Copied User:", shallowCopyUser); 


// ==========================================================
// Hands-On 2: Deep Copy (Isolation & Safety Use Case)
// ==========================================================

/*
🧪 Given Data:
    const order = {
        orderId: "ORD1001",
        customer: {
            name: "Anita",
            address: {
                city: "Hyderabad",
                pincode: 500085
            }
        },
        items: [
            { product: "Laptop", price: 70000 }
        ]
    };

🎯 Task:
    1. Create a deep copy of order
    2. Modify in copied object:
        i. customer.address.city
        ii. items[0].price
        iii. Verify original object remains unchanged
*/

const order = {
    orderId: "ORD1001",
    customer: {
        name: "Anita",
        address: {
            city: "Hyderabad",
            pincode: 500085
        }
    },
    items: [
        { product: "Laptop", price: 70000 }
    ]
};

// TODO: Solution for Hands-On 2
console.log("\n--- Deep Copy ---");
// Your code here...
const deepCopyOrder = JSON.parse(JSON.stringify(order));

// Modify the customer.address.city in the copied object
deepCopyOrder.customer.address.city = "Bangalore";

// Modify the items[0].price in the copied object
deepCopyOrder.items[0].price = 75000;

// Log both original and copied objects
console.log("Original Order:", order);
console.log("Deep Copied Order:", deepCopyOrder);