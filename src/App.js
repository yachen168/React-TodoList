import React, { useState } from "react";
import Header from './components/header';
import AddNewTodo from './components/addNewTodo';
import TodoList from './components/todoList';
import Footer from './components/footer'

const App = () => {
  const defaultTodo = JSON.parse(localStorage.getItem('react-todo')) || [];
  const [todos, setTodos] = useState(defaultTodo);
  const [filterState, setFilterState] = useState('all');

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
      <main>
        <AddNewTodo todos={todos} setTodos={setTodos}/>
        <TodoList todos={todosFilter()} setTodos={setTodos}/>
      </main>
      <Footer todos={todos} />
    </div>
  );
}

export default App;
