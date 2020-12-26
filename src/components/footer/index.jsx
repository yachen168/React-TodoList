import './index.scss';
import PropTypes from 'prop-types';

const Footer = ({todos, filterState}) => {
  const leftNum = todos.filter(todo => !todo.isCompleted).length;
  const completedNum = todos.length - leftNum;
  const isShowLeftCount = filterState !== 'completed';

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

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  filterState: PropTypes.string.isRequired
}

export default Footer;
