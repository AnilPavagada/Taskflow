
# TaskFlow - Simplify Your Task Management!

Welcome to TaskFlow, a feature-packed task management application designed to bring structure and simplicity to your everyday life. Built using React + Vite and styled with the power of TailwindCSS, TaskFlow takes productivity to the next level.


## 🛠️ Usage Guide
📊 Dashboard Overview
The dashboard is the central hub for managing tasks. It’s organized into three sections:

* To-Do: Tasks you plan to start.
* In-Progress: Tasks you’re currently working on.
* Completed: Tasks you’ve finished.
📝 Features
## Add Task

* Click the + Add Task button to open the Create Task Form.
* Fill in details like task name, description, category, due date, and attach files (if necessary).
* Hit Save to add the task to the appropriate section.
## Task Management

* Each task has:
  * Edit button: Opens the Edit Task Form, allowing you to update task details.
  * Delete button: Permanently removes the task.
* Task status is displayed in a dropdown menu, where you can switch the status between To-Do, In-Progress, and Completed.
## Interactive Checkbox

* Each task has a circle checkbox:
  * Gray checkbox: For tasks in To-Do or In-Progress.
  * Green tick mark: For Completed tasks.
## Batch Actions

* Select tasks using the checkbox.
* A popup appears at the bottom of the screen, allowing you to:
  * Delete multiple tasks.
  * Deselect All to clear the selection.
  * Change the status of selected tasks (e.g., move all to "In-Progress").
## Task Views

* Tasks are displayed in a clean, organized layout, with distinct sections for each status.
* Drag and drop tasks between sections (if enabled in your roadmap).
## Task Forms

* Create Task Form: Opens when adding a task. Includes fields for title, description, due date, category, and attachments.
* Edit Task Form: Opens when editing a task. Pre-filled with the current task details for easy updates.
## 🖌️ Visual Details
* Status Colors:
   * To-Do and In-Progress: Gray checkbox.
   * Completed: Green tick mark.
* Popup Design: Bottom-aligned with a dark background, white text, and action buttons for status updates or deletions.
* Responsive Design: Works seamlessly across devices.
Start managing your tasks with efficiency and style! 🚀



## 🚀 Roadmap
* Phase 1: Foundation
    * Set up the project using Vite and Tailwind CSS.
    * Configure Firebase for authentication and database services.
    * Implement user authentication with Google Sign-In.
* Phase 2: Task Management Basics
    * Allow users to create, edit, and delete tasks.
    * Add task categorization (e.g., work, personal).
    * Implement due dates for tasks.
* Phase 3: Advanced Task Features
    * Add drag-and-drop functionality for task rearrangement.
    * Enable batch actions like deleting multiple tasks or marking them as complete.
    * Allow sorting tasks by due dates.
* Phase 4: Enhancements and Analytics
    * Track task changes and display an activity log.
    * Add file attachments for tasks.
    * Implement filtering by tags, categories, and date range.
* Phase 5: User Interface and Experience
    * Switch between board (Kanban) and list views.
    * Add toast notifications for user feedback (e.g., success, error).
    * Ensure a responsive, accessible, and visually appealing design.
* Phase 6: Final Touches
    * Write a comprehensive README.
    * Test the application thoroughly for bugs and edge cases.
    * Deploy the application and share it with the world!
## 🚀 Challenges Faced and Solutions Implemented
1. Task State Management
Challenge: Efficiently managing task state across To-Do, In-Progress, and Completed statuses.
Solution: Used React state management and React Query for real-time updates, ensuring smooth transitions and instant state updates.

2. Batch Operations
Challenge: Enabling batch actions like bulk delete or status updates without affecting performance.
Solution: Implemented a checkbox-based selection system with a popup for batch actions, ensuring minimal re-renders and an optimized workflow.

3. Responsive Design
Challenge: Creating a responsive, visually appealing UI for both desktop and mobile users.
Solution: Leveraged Tailwind CSS to design a fully responsive layout that adapts to different screen sizes seamlessly.

4. File Attachments
Challenge: Supporting file uploads for tasks while ensuring secure handling.
Solution: Used Firebase for secure file storage and integrated it with the task creation form for a smooth user experience.

5. Drag-and-Drop Functionality
Challenge: Making task rearrangement intuitive.
Solution: Used React Beautiful DnD for implementing drag-and-drop, ensuring tasks can be reordered effortlessly.
## Future Enhancements


* Real-time collaboration for multiple users.

* Push notifications for due tasks.

* Integration with third-party calendar APIs.
## 📬 Contact

For questions or collaboration, feel free to reach out:

Email: anils.pvg1234@gmail.com

GitHub: https://github.com/AnilPavagada
## 🙌 Acknowledgments

* Thanks to Firebase, React, and the Open Source Community for making this project possible.


## 🤝 Contribution

We welcome contributions! Follow these steps:

  * Fork the repository.

  * Create a new branch for your feature.

  * Commit your changes.

  * Submit a pull request.
## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details
## Packages Used
#### Core Packages

* @tanstack/react-query

* firebase

* react-router-dom

* react

* react-dom

* typescript

#### UI and Styling

* tailwindcss

* postcss

* autoprefixer

* styled-components

#### Additional Functionality

* react-toastify

* react-beautiful-dnd

* react-ion-icons

* react-icons

#### Project Setup Tools

* vite
## 📦 Installation & Setup

Follow these steps to run the project locally:

1. Clone the repository:

```bash
  git clone https://github.com/AnilPavagada/Taskflow
```
2. Navigate to the project directory:  
```bash  
cd taskflow
```
3. Install dependencies:
```bash
npm install
```
4. nitialize TailwindCSS:
```bash
npx tailwindcss init

```
5. Start the development server:

```bash
npm run dev

```
6. Open your browser and visit:
```bash
http://localhost:3000
```
## Running the Project


1. Ensure you have Node.js and npm installed.

2. Install all required dependencies.

3. Set up Firebase Authentication and replace the firebaseConfig in the src/firebase folder with your Firebase project credentials.

4. Start the development server:
```bash
npm run dev
```
## 🚀 Features


1. User Authentication

* Seamless login and authentication using Firebase Authentication with Google Sign-In.

* Personalize your experience with customizable user profiles.

2. Task Management

* Create, edit, and delete tasks with ease.

* Categorize tasks (e.g., Work, Personal) and tag them for better organization.

* Set due dates to stay on top of your deadlines.

* Drag-and-drop functionality for effortless task rearrangement.

* Sort tasks by due dates (ascending or descending).

3. Batch Actions

* Perform batch operations such as:

  * Delete multiple tasks at once.

  * Mark multiple tasks as complete with a single click.

4. Task History & Activity Log

* Track task activities such as:

   * Creation, edits, and deletions.

* Access a detailed activity log for each task.

5. File Attachments

* Add files or documents to tasks for additional context.

* File upload feature integrated into the task creation/editing form.

6. Filter Options

* Filter tasks by tags, categories, or date ranges.

* Use the search bar to quickly find tasks by title.

7. Dynamic Views

* Switch between:

  * Board View (Kanban-style).

  * List View for a more traditional task overview.

🎉 Aesthetic Design

* Intuitive and responsive UI built with TailwindCSS.

* Visually appealing icons powered by React Icons.
