import React, {useContext} from 'react';
import TodoItem from '../todoItem';
import './index.scss';

import { ContextStore } from '../../App'


  // const todosFilter = (todos) => {
  //   return todos.filter((todo) => {
  //     if (state.status === "all") return true;
  //     if (state.status === "inProgress") return !todo.isCompleted;
  //     if (state.status === "completed") return todo.isCompleted;
  //   });
  // }


const TodoList = () => {
  const { state } = useContext(ContextStore);

  console.log('List')
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
