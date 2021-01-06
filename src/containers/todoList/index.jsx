import React, { useContext } from 'react';
import TodoItem from '../todoItem';
import './index.scss';

import { ContextStore } from '../../App'

const TodoList = () => {
  const { state } = useContext(ContextStore);

  const { todos, status } = state;

  const todosFilter = (todos, status) => {
    return todos.filter(todo => {
      if (status === 'all') return true;
      if (status === 'inProgress') return !todo.isCompleted;
      if (status === 'completed') return todo.isCompleted;
    })
  }

  return (
    <section className="todo-list">
      {
        todosFilter(todos, status).map(todo => {
          return (
            <TodoItem key={todo.todoId} todo={todo}/>
          )
      })}
    </section>
  )
}

export default TodoList;
