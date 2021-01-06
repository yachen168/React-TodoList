import React, { useState, createContext, useReducer, useEffect } from "react";
import Header from './components/header';
import AddNewTodo from './components/addNewTodo';
import TodoList from './components/todoList';
import Footer from './components/footer'

import reducer from './reducers'

const ContextStore = createContext();

// const sortTodos = (todos) => {
//   return [...todos].sort((a, b) => {
//         let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
//         let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
//         return scoreA - scoreB;
//       })
// }

const initialState = {
  todos: JSON.parse(localStorage.getItem('react-todo')) || [],
  status: 'all'
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [filterState, setFilterState] = useState('all');

  useEffect(() => {
    setLocalStorage();
   }, [state]);
  
  const setLocalStorage = () => {
    window.localStorage.setItem('react-todo', JSON.stringify(state.todos));
  }
  
  return (
    <ContextStore.Provider value={{state, dispatch}}>
      <div className="App">
        <Header/>
          <AddNewTodo/>
          <TodoList/>
        <Footer/>
      </div>
    </ContextStore.Provider>
  );
}

export { App, ContextStore};
