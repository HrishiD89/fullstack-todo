/* eslint-disable react/prop-types */
import "./AddTodoForm.css";
const AddTodoForm = ({ onSubmitHandler ,categories}) => {

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="todo-container">
        <div className="todo-card">
          <h1>Add Todo</h1>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g Going to the gym "
            required
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            defaultValue="School"
          >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}{" "}
                </option>
              ))}

          </select>
          <button type="submit">Add</button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;
