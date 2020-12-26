import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './index.scss';


const TodoItem = ({todo, todos, setTodos}) => {

  const [cacheTodo, setCacheTodo] = useState(todo);
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  useEffect(() => {
    setLocalStorage();
   }, [todos]);

  const setLocalStorage = () => {
    window.localStorage.setItem('react-todo', JSON.stringify(todos));
  }

  const toggleTodo = () => {
    setIsEditingTodo(!isEditingTodo);
  }

  const editTodo = (e) => {
    const name = e.currentTarget.dataset.name;

    if (name === 'isStarred' || name === 'isCompleted'){
      cacheTodo[name] = !cacheTodo[name];

      const index = todos.findIndex(item => item.todoId === todo.todoId);
      const newTodos= [...todos];
  
      newTodos[index] = cacheTodo;

      setTodos(newTodos);
    }else{
      setCacheTodo({...cacheTodo, [name]: e.target.value})
    }
  }

  const confirmBtnHandler = () => {
    const index = todos.findIndex(item => item.todoId === todo.todoId);
    const newTodos= [...todos];

    newTodos[index] = cacheTodo;

    setTodos(newTodos);
    toggleTodo();
  }

  const cancelBtnHandler = () => {
    setCacheTodo(todo);
    toggleTodo();
  }

  const deleteTodo = () => {
    setTodos(todos.filter(item=>item.todoId !== todo.todoId));
  }

  return (
    <form className={`edit-area ${isEditingTodo ? 'active' : ''}`}
          onSubmit={(e)=>e.preventDefault()}>
      <div className={`todo-bar ${todo.isStarred ? 'active' : ''}`}>
        <div className="hover-dots">
          <span>∙</span>
          <span>∙</span>
          <span>∙</span>
        </div>
        <label className="todo-title">
          <input
            className="checkbox"
            type="checkbox"
            data-name="isCompleted"
            checked={todo.isCompleted}
            onChange={editTodo}
          />
          <input
            className="todo-name"
            type="text"
            placeholder="Type Something Here…"
            value={cacheTodo.todoTitle}
            data-name="todoTitle"
            onChange={editTodo}
          />
        </label>
        <div className="icon-wrapper">
          <span className="star" data-name="isStarred" onClick={editTodo}>
            <FontAwesomeIcon icon={faStar}/>
          </span>
          <span className="pen" onClick={toggleTodo}>
            <FontAwesomeIcon icon={faPen}/>
          </span>
          <span className="delete" onClick={deleteTodo}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </span>
        </div>
        <div className="hint-icons">
          <i
            className="far fa-calendar-alt"
            ><span className="hint-date">todo.todoDate.split('-').join('/')</span></i
          >
          <i className="far fa-file"></i>
          <i
            className="far fa-comment-dots"
          ></i>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="deadline">
            <h3><i className="far fa-calendar-alt"></i>Deadline</h3>
            <div className="input-wrapper">
              <input
                className="date"
                type="date"
                data-name="todoDate"
                value={cacheTodo.todoDate}
                onChange={editTodo}
              />
              <input
                className="time"
                type="time"
                data-name="todoTime"
                value={cacheTodo.todoTime}
                onChange={editTodo}
              />
            </div>
          </div>
          <div className="file">
            <h3><i className="far fa-file"></i>File</h3>
            <label className="upload">
              <input className="upload-input" type="file" />
              <span className="upload-icon">+</span>
            </label>
          </div>
          <div className="comment">
            <h3><i className="far fa-comment-dots"></i>Comment</h3>
            <textarea
              className="comment-content"
              placeholder="Type your memo here..."
              data-name="todoComment"
              value={cacheTodo.todoComment}
              onChange={editTodo}
            >todo.todoComment</textarea>
          </div>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            className="button-cancel"
            onClick={cancelBtnHandler}
          >
            <i className="fas fa-times"></i>Cancel
          </button>
          <button
            type="submit"
            className="button-confirm"
            onClick={confirmBtnHandler}
          >
            <i className="fas fa-plus"></i>Save
          </button>
        </div>
      </div>
    </form>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired
}

export default TodoItem;