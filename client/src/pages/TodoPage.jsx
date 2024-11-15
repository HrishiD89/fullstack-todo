import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useAuth } from "../AuthContext";
import './pages_style.css';

const TodoPage = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [alert, setAlert] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState({});
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const categories = [
    {
      name: "School/Education",
      backgroundColor: "#F0F2F5",
    },
    {
      name: "Work",
      backgroundColor: "#E6F0FF",
    },
    {
      name: "Shopping",
      backgroundColor: "#F8F9FA",
    },
    {
      name: "Productivity",
      backgroundColor: "#FFF0F5",
    },
    {
      name: "Health",
      backgroundColor: "#DFF0D8",
    },
    {
      name: "Social",
      backgroundColor: "#F0FFF0",
    },
    {
      name: "Personal",
      backgroundColor: "#FFE4E1",
    },
    {
      name: "Finances",
      backgroundColor: "#F0E68C",
    },
    {
      name: "Learning and Development",
      backgroundColor: "#E0FFFF",
    },
    {
      name: "Others",
      backgroundColor: "#D3D3D3",
    }
  ];
  



  const getTodos = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos", {
        headers: {
          Authorization: token,
        },
      });
      setTodos(response.data.titles);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setAlert({ message: "Error fetching todos", severity: "error" });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getTodos();
    }
  }, [token, getTodos]);

  useEffect(() => {
    // Auto-hide alert after 3 seconds
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;

    try {
      await axios.post(
        "http://localhost:3000/todo", 
        { title, category },
        { headers: { Authorization: token } }
      );
      await getTodos();
      e.target.reset();
      setAlert({ 
        message: "Todo created successfully", 
        severity: "success",
        icon: <CheckIcon fontSize="inherit" />
      });
    } catch (error) {
      console.error("Error creating Todo:", error);
      setAlert({ message: "Error creating todo", severity: "error" });
    }
  };

  const handleClick = async (todoId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    
    // Update the editingTodo state to reflect the new done value
    setEditingTodo({
      ...todo,
      done: !todo.done,
    });
  };
  
  // useEffect to trigger the confirmEdit function after editingTodo is updated
  useEffect(() => {
    if (editingTodo && editingTodo.id) {
      confirmEdit(editingTodo.id);
    }
  }, [editingTodo]);  // This effect runs whenever editingTodo changes

  const handleEdit = (todo) => {
    setCurrentTodoId(todo.id);
    setEditingTodo({ title: todo.title, category: todo.category ,done : todo.done });
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete("http://localhost:3000/todo", {
        headers: { Authorization: token, todoid: todoId }
      });
      await getTodos();
      setAlert({ 
        message: response.data.message, 
        severity: "success",
        icon: <CheckIcon fontSize="inherit" />
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      setAlert({ message: "Error deleting todo", severity: "error" });
    }
  };

  const confirmEdit = async (todoId) => {
    console.log("Editing todo:", editingTodo);
    try {
      const response = await axios.put(
        "http://localhost:3000/todo",
        editingTodo,
        { headers: { Authorization: token, todoid: todoId } }
      );
      await getTodos();
      setCurrentTodoId(null);
      setAlert({ 
        message: response.data.message, 
        severity: "success",
        icon: <CheckIcon fontSize="inherit" />
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      setAlert({ message: "Error updating todo", severity: "error" });
    }
  };

  

  const handleCancel = () => {
    setCurrentTodoId(null);
    setEditingTodo({});
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleLogout}
        className="red-button "
      >
        Logout
      </button>
      
      {alert && (
        <Alert 
          severity={alert.severity}
          icon={alert.icon}
          sx={{ 
            mb: 2,
            fontFamily: "monospace",
            '& .MuiAlert-icon': {
              alignItems: 'center'
            }
          }}
        >
          {alert.message}
        </Alert>
      )}

      <AddTodoForm onSubmitHandler={onSubmitHandler} categories={categories} />

      <TodoList
        todos={todos}
        currentTodoId={currentTodoId}
        editingTodo={editingTodo}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        confirmEdit={confirmEdit}
        setEditingTodo={setEditingTodo}
        handleCancel={handleCancel}
        handleClick={handleClick}
        categories={categories}
      />
    </div>
  );
};

export default TodoPage;