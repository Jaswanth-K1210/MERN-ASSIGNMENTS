import validator from './validator.js';

const tasks = []; //{taskID, title, priority, dueDate, status}

function addTask(title, priority, dueDate) {
    if (validator.validateTitle(title) && validator.validatePriority(priority) && validator.validateDueDate(dueDate)) {
        tasks.push({ taskID: tasks.length + 1, title, priority, dueDate, status: "pending" });
        console.log(`Task "${title}" added successfully.`);
    } else {
        console.log(`Failed to add task "${title}". Invalid data provided.`);
    }
}

function getAllTasks() {
    return tasks;
}

function completeTask(taskId) {
    tasks[taskId - 1].status = "completed";
}

export default { addTask, getAllTasks, completeTask };