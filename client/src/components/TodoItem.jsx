/* eslint-disable react/prop-types */

import { IconButton, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "./TodoItem.css";
const TodoItem = ({
  todo,
  isEditing,
  editingTodo,
  handleEdit,
  handleDelete,
  onSave,
  onEditChange,
  handleCancel,
  handleClick,
  categories,
}) => {
  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="todo-editing">
          <div className="todo-editing-inputs">
            <input
              type="text"
              value={editingTodo.title || ""}
              onChange={(e) =>
                onEditChange({ ...editingTodo, title: e.target.value })
              }
              className="todo-editing-input"
              placeholder="Todo title"
            />
            <Select
              size="small"
              value={editingTodo.category || todo.category || ""}
              onChange={(e) =>
                onEditChange({ ...editingTodo, category: e.target.value })
              }
              className="todo-editing-select"
            >

              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}{" "}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="todo-actions">
            <IconButton
              size="small"
              onClick={() => onSave(todo.id)}
              color="primary"
              title="Save"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleCancel}
              color="error"
              title="Cancel"
            >
              <CancelIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="todo-display">
          {todo.done ? (
            <span
              className="isDone todo-title"
              onClick={() => handleClick(todo.id)}
            >
              {todo.title}
            </span>
          ) : (
            <span className="todo-title" onClick={() => handleClick(todo.id)}>
              {todo.title}
            </span>
          )}
          <div className="todo-actions">
            <IconButton
              size="small"
              onClick={() => handleEdit(todo)}
              color="primary"
              title="Edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDelete(todo.id)}
              color="error"
              title="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
