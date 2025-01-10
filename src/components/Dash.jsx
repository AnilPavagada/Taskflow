import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Dash = () => {
    const queryClient = useQueryClient();
    const [newTask, setNewTask] = useState({
        name: "",
        status: "todo",
        category: "",
        dueDate: "",
    });

    // Fetch tasks from Firestore
    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, "tasks"));
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    dueDate: data.dueDate?.toDate
                        ? data.dueDate.toDate().toLocaleDateString()
                        : data.dueDate || "No due date",
                };
            });
        },
    });

    // Add new task mutation
    const addTaskMutation = useMutation({
        mutationFn: async (task) => {
            const taskWithDate = {
                ...task,
                dueDate: task.dueDate ? new Date(task.dueDate) : null,
            };
            await addDoc(collection(db, "tasks"), taskWithDate);
        },
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
        onError: (error) => console.error("Error adding task:", error),
    });

    // Update task mutation
    const updateTaskMutation = useMutation({
        mutationFn: async ({ id, updates }) => {
            const taskRef = doc(db, "tasks", id);
            await updateDoc(taskRef, updates);
        },
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
        onError: (error) => console.error("Error updating task:", error),
    });

    // Delete task mutation
    const deleteTaskMutation = useMutation({
        mutationFn: async (id) => {
            const taskRef = doc(db, "tasks", id);
            await deleteDoc(taskRef);
        },
        onSuccess: () => queryClient.invalidateQueries(["tasks"]),
        onError: (error) => console.error("Error deleting task:", error),
    });

    // Handle adding a new task
    const handleAddTask = (e) => {
        e.preventDefault();
        addTaskMutation.mutate(newTask);
        setNewTask({ name: "", status: "todo", category: "", dueDate: "" });
    };

    // Count tasks based on their status
    const taskCount = (status) => tasks.filter((task) => task.status === status).length;

    if (isLoading) return <div>Loading tasks...</div>;
    if (isError) return <div>Error loading tasks. Please try again later.</div>;

    // Define reusable styles for rows
    const rowStyle = {
        width: "500.5px",
        height: "376px",
        marginBottom: "20px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    };
    const rowStyles = {
        width: "1331.5px",
        height: "376px",
        marginBottom: "20px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg" style={{ width: "1331.5px", margin: "20px auto" }}>
            <div className="mb-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-sm font-semibold text-gray-700">
                            <th className="border-b p-2">Task Name</th>
                            <th className="border-b p-2">Due On</th>
                            <th className="border-b p-4">Task Status</th>
                            <th className="border-b p-4">Task Category</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                                <td className="p-4">{task.name || "Untitled"}</td>
                                <td className="p-4">{task.dueDate}</td>
                                <td className="p-4 capitalize">{task.status}</td>
                                <td className="p-4">{task.category || "Uncategorized"}</td>
                            </tr>
                        ))}
                    </tbody>

                    </table>


                    {/* Tasks by Status */}
                    <div className="space-y-6">
                        {[
                            { title: "To-Do", status: "todo", bgColor: "bg-pink-300" },
                            { title: "In-Progress", status: "in-progress", bgColor: "bg-[#85D9F1]" },
                            { title: "Completed", status: "completed", bgColor: "bg-green-500" },
                        ].map(({ title, status, bgColor }) => (
                            <div key={status} style={rowStyles} className="bg-white">
                                <div className={`${bgColor} text-white px-6 py-3 text-xl font-bold`}>{title} ({taskCount(status)})</div>
                                <div className="p-6 overflow-y-auto" style={{ height: "300px" }}>
                                    {tasks.filter((task) => task.status === status).map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
                                        >
                                            <div>
                                                
                                                <h3 className={`font-semibold ${task.status === "completed" ? "line-through" : ""}`}>
                                                    {task.name || "Untitled"}
                                                </h3>
                                                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        updateTaskMutation.mutate({
                                                            id: task.id,
                                                            updates: { status: "completed" },
                                                        })
                                                    }
                                                    className="text-sm text-green-500 hover:underline"
                                                >
                                                    Mark as Completed
                                                </button>
                                                
                                            </div>
                                        </div>

                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>

                
                {/* Add Task Form */}
                <form
                    onSubmit={handleAddTask}
                    className="bg-white shadow-md rounded-lg p-6 mb-8"
                    style={{ width: "1331.5px", margin: "0 auto" }}
                >
                    <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                            required
                            className="border p-2 rounded w-full"
                        />
                        <select
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                            className="border p-2 rounded w-full"
                        >
                            <option value="todo">To-Do</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Category"
                            value={newTask.category}
                            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                            required
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                            required
                            className="border p-2 rounded w-full"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Dash;
