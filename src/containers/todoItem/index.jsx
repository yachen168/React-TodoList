import { useState, useContext } from "react";
import { ContextStore } from '../../App';
import useSubmitHandler from "../../hooks/useSubmit";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faTrashAlt, faCalendarAlt, faCommentDots, faFile, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

import TodoDropdown from '../../components/todoDropdown';
import FormButton from '../../components/formButton';
import './index.scss';

const TodoItem = ({todo}) => {
  const { dispatch } = useContext(ContextStore)
  const [cacheTodo, setCacheTodo] = useState({...todo});
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  const editTodo = (e) => {
    const name = e.currentTarget.dataset.name;
    setCacheTodo({...cacheTodo, [name]: e.target.value});
  }

  const confirmBtnHandler = () => {
    dispatch({ type: 'EDIT_TODO', payload: {todo: cacheTodo}});

    setIsEditingTodo(!isEditingTodo);
  }

  const cancelBtnHandler = () => {
    setIsEditingTodo(!isEditingTodo);
    setCacheTodo(todo);
  }

  const submitHandler = useSubmitHandler(confirmBtnHandler, cacheTodo.todoTitle);

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
          <span className="pen" onClick={() => setIsEditingTodo(!isEditingTodo)}>
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
      <TodoDropdown todo={cacheTodo}
        editTodo={editTodo}
        cancelBtnHandler={cancelBtnHandler}
        submitHandler={submitHandler}
      >
        <FormButton buttonType="reset"
          className="button-cancel"
          clickHandler={cancelBtnHandler}
        >
          <FontAwesomeIcon icon={faTimes}/>Cancel
        </FormButton>
        <FormButton buttonType="submit"
          className="button-confirm"
          clickHandler={submitHandler}
        >
          <FontAwesomeIcon icon={faPlus}/>Save
        </FormButton>
      </TodoDropdown>
    </form>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;