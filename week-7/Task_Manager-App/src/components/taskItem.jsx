import React from "react";

function TaskItem(props) {
    // state 
    let { id, title, priority, completed } = props.task;

    // handeler
    function handleComplete() {
        props.onToggle(id);
    }

    function handleDelete() {
        props.onDelete(id);
    }

    // return a react element
    return(
        <div className={`text-lg border-2 rounded-lg p-4 m-3 ${completed ? "border-green-400 bg-green-50" : "border-gray-300 bg-white"}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className={`font-black text-xl ${completed ? "line-through text-gray-400" : ""}`}>{title}</h2>
                    <p className={`font-bold text-sm mt-1 ${
                        priority === "High" ? "text-red-500" : 
                        priority === "Medium" ? "text-amber-500" : 
                        "text-green-500"
                    }`}>Priority: {priority}</p>
                    <p className={`text-sm mt-1 ${completed ? "text-green-600" : "text-red-500"}`}>
                        {completed ? "Completed" : "Pending"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleComplete} 
                        className={`px-3 py-1 rounded text-white text-sm cursor-pointer ${completed ? "bg-amber-500" : "bg-green-500"}`}
                    >
                        {completed ? "Undo" : "Complete"}
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="px-3 py-1 rounded bg-red-500 text-white text-sm cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;
