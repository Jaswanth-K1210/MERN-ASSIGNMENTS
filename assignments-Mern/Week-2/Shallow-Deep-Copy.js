//Task-1: Shallow Copy
const user = {
  id: 101,
  name: "Ravi",
  preferences: {
    theme: "dark",
    language: "en",
  },
};

//shallow copy of user
const shallow = { ...user }; // Create shallow copy

//change name and theme of copied object
shallow.name = "Vira"; // Update name property
shallow.preferences.theme = "light"; // Update nested property

console.log(user);
console.log(shallow);

//Task 2: Deep Copy
const order = {
  orderId: "ORD1001",
  customer: {
    name: "Anita",
    address: {
      city: "Hyderabad",
      pincode: 500085,
    },
  },
  items: [{ product: "Laptop", price: 70000 }],
};

//deep copy of order
const deep = structuredClone(order); // Create deep copy

//change city and items[0]
deep.customer.address.city = "Chennai"; // Update nested property
deep.items[0].price = 65000; // Update array element

console.log(order);
console.log(deep);