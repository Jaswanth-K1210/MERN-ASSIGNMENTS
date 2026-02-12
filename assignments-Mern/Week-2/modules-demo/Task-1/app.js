import tasks from './task.js';

tasks.addTask("Finish project report", "High", "2026-10-15");
tasks.addTask("Grocery shopping", "Medium", "2026-10-10");
tasks.addTask("Book dentist appointment", "Low", "2024-09-30");
    
console.log(tasks.getAllTasks());

tasks.completeTask(1);
console.log("\nAfter completing task 1:\n");
console.log(tasks.getAllTasks());