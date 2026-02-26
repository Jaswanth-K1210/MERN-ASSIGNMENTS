import React from "react";
import { useState } from "react";
import AddTaskForm from "./addTaskForm.jsx";
import TaskList from "./taskList.jsx";

function TaskManager() {
    // state 
    let [tasks, setTasks] = useState([]);

    // handeler
    function handleAddTask(newTask) {
        let task = {
            id: Date.now(),
            title: newTask.title,
            priority: newTask.priority,
            completed: false
        };
        setTasks([...tasks, task]);
    }

    function handleToggle(id) {
        let updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function handleDelete(id) {
        let updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    }

    // counts
    let totalTasks = tasks.length;
    let completedTasks = tasks.filter((task) => task.completed).length;

    // return a react element
    return(
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center border-2 border-gray-300 rounded-lg p-4 m-4 bg-blue-50">
                <p className="font-bold text-sm">Total Tasks: <span className="text-blue-600">{totalTasks}</span></p>
                <p className="font-bold text-sm">Completed: <span className="text-green-600">{completedTasks}</span></p>
            </div>

            <AddTaskForm onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
    )
}

export default TaskManager;
