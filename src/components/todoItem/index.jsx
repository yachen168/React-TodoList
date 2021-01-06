import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrashAlt, faCalendarAlt, faCommentDots, faFile, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './index.scss';

import { ContextStore } from '../../App';
import useSubmitHandler from "../../hooks/useSubmit";

const TodoItem = ({todo}) => {
  const { dispatch } = useContext(ContextStore)
  const [cacheTodo, setCacheTodo] = useState({...todo});
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  const editTodo = (e) => {
    const name = e.currentTarget.dataset.name;
    setCacheTodo({...cacheTodo, [name]: e.target.value});
  }

  const toggleTodo = () => {
    setIsEditingTodo(!isEditingTodo);
  }

  const submitHandler = useSubmitHandler(toggleTodo, cacheTodo.todoTitle);

  return (
    <form className={`edit-area ${isEditingTodo ? 'active' : ''}`}
          onSubmit={submitHandler}>
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
            checked={todo.isCompleted}
            onChange={() => dispatch({ type: 'COMPLETE_TODO', payload: {todo}})}
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
          <span className="star" onClick={() => dispatch({ type: 'STAR_TODO', payload: {todo}})}>
            <FontAwesomeIcon icon={faStar}/>
          </span>
          <span className="pen" onClick={toggleTodo}>
            <FontAwesomeIcon icon={faPen}/>
          </span>
          <span className="delete" onClick={() => dispatch({ type: 'DELETE_TODO', payload: {todo: cacheTodo}})}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </span>
        </div>
        <div className="hint-icons">
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} className={`${cacheTodo.todoDate ? 'active' : ''}`}/>
            <span className="hint-date">{todo.todoDate.split('-').join('/')}</span>
          </span>
          <FontAwesomeIcon icon={faFile}/>
          <FontAwesomeIcon icon={faCommentDots} className={cacheTodo.todoComment ? 'active' : ''}/>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="deadline">
            <h3><FontAwesomeIcon icon={faCalendarAlt}/>Deadline</h3>
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
            <h3><FontAwesomeIcon icon={faFile}/>File</h3>
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
            ></textarea>
          </div>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            className="button-cancel"
            onClick={() => setCacheTodo(todo)}
          >
            <i className="fas fa-times"></i>Cancel
          </button>
          <button
            type="submit"
            className="button-confirm"
            onClick={() => dispatch({ type: 'EDIT_TODO', payload: {todo: cacheTodo}})}
          >
            <FontAwesomeIcon icon={faPlus}/>Save
          </button>
        </div>
      </div>
    </form>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;