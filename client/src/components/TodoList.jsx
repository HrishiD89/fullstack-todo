/* eslint-disable react/prop-types */

import TodoItem from "./TodoItem";
import { Card, CardContent } from '@mui/material';
import './TodoList.css';

const TodoList = ({ 
  todos, 
  currentTodoId, 
  editingTodo, 
  handleEdit, 
  handleDelete, 
  handleCancel, 
  confirmEdit, 
  setEditingTodo,
  handleClick,
  categories
}) => {
  // Group todos by category
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    acc[todo.category].push(todo);
    return acc;
  }, {});

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      
      <div className="todo-grid">
        {Object.entries(groupedTodos).map(([category, categoryTodos]) => {
          // Find the category object to get background color
          const categoryDetails = categories.find(cat => cat.name === category);
          const backgroundColor = categoryDetails ? categoryDetails.backgroundColor : "defaultColor"; // Set a default color if not found

          return (
            <Card key={category} className="todo-category-card" style={{ backgroundColor }}>
              <CardContent>
                <h2 className="todo-category-title">{category}</h2>
                <div className="todo-category-items">
                  {categoryTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todos={todos}
                      todo={todo}
                      isEditing={currentTodoId === todo.id}
                      editingTodo={editingTodo}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      onSave={confirmEdit}
                      onEditChange={setEditingTodo}
                      handleCancel={handleCancel}
                      handleClick={handleClick}
                      categories={categories}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
