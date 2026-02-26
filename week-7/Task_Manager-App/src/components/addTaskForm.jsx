import React from "react";
import { useState } from "react";

function AddTaskForm(props) {
    // state 
    let [title, setTitle] = useState("");
    let [priority, setPriority] = useState("Low");
    let [errors, setErrors] = useState({});

    // handeler
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handlePriorityChange(e) {
        setPriority(e.target.value);
    }

    function validate() {
        let newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Title is required";
        } else if (title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            props.onAddTask({ title: title.trim(), priority });
            setTitle("");
            setPriority("Low");
            setErrors({});
        }
    }

    // return a react element
    return(
        <form onSubmit={handleSubmit} className="border-2 border-gray-300 rounded-lg p-6 m-4 bg-white">
            <h2 className="text-xl font-black mb-4">Add New Task</h2>

            <div className="mb-4">
                <label className="block font-bold mb-1 text-sm">Task Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={handleTitleChange} 
                    placeholder="Enter task title..." 
                    className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-bold mb-1 text-sm">Priority</label>
                <select 
                    value={priority} 
                    onChange={handlePriorityChange} 
                    className="w-full border-2 border-gray-300 rounded p-2 text-sm"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm cursor-pointer">
                Add Task
            </button>
        </form>
    )
}

export default AddTaskForm;
