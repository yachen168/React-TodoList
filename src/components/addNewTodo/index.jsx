import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faCalendarAlt, faCommentDots, faFile, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

import { useContext } from 'react';
import {ContextStore} from '../../App';
import useSubmitHandler from "../../hooks/useSubmit";

const defaultNewTodo = {
  todoTitle: "",
  todoComment: "",
  todoDate: "",
  todoTime: "",
  isStarred: false,
  isCompleted: false,
  isEditing: false,
}


const AddNewTodo = () => {
  const { dispatch } = useContext(ContextStore);

  const [newTodo, setNewTodo] = useState(defaultNewTodo);
  const [isEditingNewTodo, setIsEditingNewTodo] = useState(false);

  const toggleNewTodo = (e) => {
    e.preventDefault();
    setIsEditingNewTodo(!isEditingNewTodo);
    setNewTodo(defaultNewTodo);
  }

  const editNewTodo = (e) => {
    const name = e.currentTarget.dataset.name;

    if (name === 'isStarred' || name === 'isCompleted'){
      setNewTodo({...newTodo, [name]: !newTodo[name]});
    }else{
      setNewTodo({...newTodo, [name]: e.target.value});
    }
  }

  const submitHandler = useSubmitHandler(toggleNewTodo, newTodo.todoTitle);

  return (
    <section className="new-todo">
      <button className="add-todo" onClick={toggleNewTodo}>+ Add Task</button>
      <form className={`edit-area new-todo-edit-area ${isEditingNewTodo ? 'active' : ''}`}
            onSubmit={submitHandler}>
        <div  className={`todo-bar ${newTodo.isStarred ? 'active' : ''}`}>
          <label className="todo-title">
            <input
              className="checkbox"
              type="checkbox"
              data-name="isCompleted"
              checked={newTodo.isCompleted}
              onChange={editNewTodo}
            />
            <input
              className="todo-name new-todo-name"
              type="text"
              placeholder="Type Something Here…"
              data-name="todoTitle"
              value={newTodo.todoTitle}
              onChange={editNewTodo}
            />
          </label>
          <div className="icon-wrapper">
            <span className="star" data-name="isStarred" onClick={editNewTodo}>
              <FontAwesomeIcon icon={faStar}/>
            </span>
            <span className="pen new-pen">
              <FontAwesomeIcon icon={faPen}/>
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="deadline">
              <h3 className="icon">
                <FontAwesomeIcon icon={faCalendarAlt}/>Deadline
              </h3>
              <div className="input-wrapper">
                <input
                  className="new-date"
                  type="date"
                  data-name="todoDate"
                  onChange={editNewTodo}
                />
                <input
                  className="new-time"
                  type="time"
                  data-name="todoTime"
                  onChange={editNewTodo}
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
              <h3>
                <FontAwesomeIcon icon={faCommentDots}/>Comment
              </h3>
              <textarea
                className="add-comment"
                placeholder="Type your memo here..."
                data-name="todoComment"
                value={newTodo.todoComment}
                onChange={editNewTodo}
              ></textarea>
            </div>
          </div>
          <div className="card-footer new-card-footer">
            <button
              type="submit"
              className="button-cancel new-button-cancel"
              onClick={toggleNewTodo}
            >
              <FontAwesomeIcon icon={faTimes}/>Cancel
            </button>
            <button
              className="button-confirm new-button-confirm"
              onClick={() => dispatch({type: 'ADD_TODO', payload: {...newTodo, todoId: Date.now()}})}
            >
              <FontAwesomeIcon icon={faPlus}/>Add Task
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddNewTodo;