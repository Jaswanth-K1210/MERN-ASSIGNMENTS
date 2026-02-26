import TaskItem from "./taskItem.jsx";
import React from "react";

function TaskList(props) {
    // state 
    let tasks = props.tasks;
    let onToggle = props.onToggle;
    let onDelete = props.onDelete;

    // return a react element
    return(
        <div className="text-2xl p-4 m-4 rounded-b-lg">
            {
                tasks.length === 0 
                ? <p className="text-center text-gray-400 text-lg mt-6">No tasks yet. Add one above!</p>
                : tasks.map((task, index) => <TaskItem key={index} task={task} onToggle={onToggle} onDelete={onDelete} />)
            }
        </div>
    )
}

export default TaskList;
