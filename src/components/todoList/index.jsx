import React from 'react'
import TodoItem from '../todoItem';

const TodoList = ({todos, setTodos}) => {
  
  return (
    <section className="todo-list">
      {todos.map(todo => {
        return (
          <TodoItem key={todo.todoId} todo={todo} todos={todos} setTodos={setTodos}/>
        )
      })}
    </section>
  )
}

export default TodoList;
