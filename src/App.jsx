import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './pages/Home';
import List from './pages/List';
import Board from './pages/Board';
import TaskForm from './components/TaskForm';
import { ToastContainer } from 'react-toastify';
import EditForm from './components/EditForm';


// Import React Query components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todo from './components/Todo';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    // Wrap your app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/board" element={<Board />} />
          <Route path="/Todo" element={<Todo/>} />
          <Route path="/edit" element={<EditForm/>}/>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
