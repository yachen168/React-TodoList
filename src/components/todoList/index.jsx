import React, {useContext} from 'react';
import TodoItem from '../todoItem';
import './index.scss';

import { ContextStore } from '../../App'

const TodoList = () => {
  const { state } = useContext(ContextStore);

  return (
    <section className="todo-list">
      {
        state.todos.map(todo => {
          return (
            <TodoItem key={todo.todoId} todo={todo}/>
          )
      })}
    </section>
  )
}

export default TodoList;
