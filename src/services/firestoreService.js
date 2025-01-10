import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Collection name
const tasksCollection = collection(db, "tasks");

// Fetch all tasks
export const fetchTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new task
export const addTask = async (task) => {
  await addDoc(tasksCollection, task);
};

// Update an existing task
export const updateTask = async (id, updatedTask) => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, updatedTask);
};

// Delete a task
export const deleteTask = async (id) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
