import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFile } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const TodoDropdown = ({children, todo, editTodo, cancelBtnHandler, submitHandler}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="deadline">
          <h3><FontAwesomeIcon icon={faCalendarAlt}/>Deadline</h3>
          <div className="input-wrapper">
            <input
              className="date"
              type="date"
              data-name="todoDate"
              value={todo.todoDate}
              onChange={editTodo}
            />
            <input
              className="time"
              type="time"
              data-name="todoTime"
              value={todo.todoTime}
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
            value={todo.todoComment}
            onChange={editTodo}
          ></textarea>
        </div>
      </div>
      <div className="card-footer">
        {children}
      </div>
    </div>
  );
}

export default TodoDropdown;
