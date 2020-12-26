import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem';
import './index.scss';


const TodoList = ({todos, setTodos}) => {
  
  return (
    <section className="todo-list">
      {
        todos.map(todo => {
          return (
            <TodoItem key={todo.todoId} todo={todo} todos={todos} setTodos={setTodos}/>
          )
      })}
    </section>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired, 
  setTodos: PropTypes.func.isRequired,
}

export default TodoList;
