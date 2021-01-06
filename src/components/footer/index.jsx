import './index.scss';
// import PropTypes from 'prop-types';

import { useContext } from 'react';
import { ContextStore } from '../../App'

const Footer = () => {
  const { state } = useContext(ContextStore)
  
  const leftNum = state.todos.filter(todo => !todo.isCompleted).length;
  const completedNum = state.todos.length - leftNum;
  const isShowLeftCount = state.status !== 'completed';

  if (isShowLeftCount) {
    return (
      <footer>
        <h4 className="todo-count ">
          { leftNum } <span>{ leftNum > 1 ? 'tasks' : 'task' }</span> left
        </h4>
        <p className="hint">點擊 ☆ 任務置頂，任務完成置底</p>
      </footer>
    )
  }else {
    return (
      <footer>
        <h4 className="todo-count">
          { completedNum } <span>{ completedNum > 1 ? 'tasks' : 'task' }</span> completed
        </h4>
        <p className="hint">點擊 ☆ 任務置頂，任務完成置底</p>
      </footer>
    )
  }
  
}

export default Footer;
