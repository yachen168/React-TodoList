const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
        let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
        let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
        return scoreA - scoreB;
      })
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {...state, todos: sortTodos([...state.todos, action.payload])};
    }

    case 'DELETE_TODO': {
      const todos = state.todos.filter(item => item.todoId !== action.payload.todo.todoId);
      return {...state, todos}; 
    }      
      
    case 'EDIT_TODO': {
      const index = state.todos.findIndex(item => item.todoId === action.payload.todo.todoId);
      state.todos[index] = action.payload.todo;
      return {...state}; 
    }
  
    case 'STAR_TODO': {
      const index = state.todos.findIndex(item => item.todoId === action.payload.todo.todoId);
      state.todos[index].isStarred = !state.todos[index].isStarred;
      
      console.log(sortTodos(state.todos))
      return {...state, todos: sortTodos(state.todos)};
    }

    case 'COMPLETE_TODO': {
      const index = state.todos.findIndex(item => item.todoId === action.payload.todo.todoId);
      state.todos[index].isCompleted = !state.todos[index].isCompleted;
      return {...state, todos: sortTodos(state.todos)};
    }

    default:
      return state;
  }
}

export default reducer;