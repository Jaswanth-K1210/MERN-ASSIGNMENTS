let totalAmount=0;

totalAmount+=500; // Add first transaction amount
totalAmount+=1200; // Add second transaction amount
totalAmount-=200; // Subtract refund amount
totalAmount+= totalAmount * 0.18; // Add eighteen percent tax
console.log("Total Amount after transactions and tax: " + totalAmount);