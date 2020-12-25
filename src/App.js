import React, { useState, useEffect } from "react";
import Header from './components/header';
import AddNewTodo from './components/addNewTodo';
import TodoItem from './components/todoItem';
import Counter from './components/footer'

const App = () => {
  const defaultTodo = JSON.parse(localStorage.getItem('react-todo')) || [];
  const [todos, setTodos] = useState(defaultTodo);
  const [filterState, setFilterState] = useState('all');

  useEffect(() => {
    setLocalStorage();
   }, [todos])

  const setLocalStorage = () => {
    window.localStorage.setItem('react-todo', JSON.stringify(todos));
  }

  const sortTodos = () => {
    return [...todos].sort((a, b) => {
          let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
          let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
          return scoreA - scoreB;
        })
  }

  const todosFilter = () => {
    return sortTodos().filter((todo) => {
      if (filterState === "all") return sortTodos;
      if (filterState === "inProgress") return !todo.isCompleted;
      if (filterState === "completed") return todo.isCompleted;
    });
  }

  return (
    <div className="App">
      <Header filterState={filterState} setFilterState={setFilterState}/>
      <AddNewTodo todos={todos} setTodos={setTodos}/>
      <section className="todo-list">
        {todosFilter().map(todo => {
          return (
            <TodoItem key={todo.todoId} todo={todo} todos={todos} setTodos={setTodos}/>
          )
        })}
      </section>
      <Counter todos={todos} />
    </div>
  );
}

export default App;
