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
      const newTodos = [...state.todos];
      
      newTodos[index] = action.payload.todo;
      return {...state, todos: newTodos}; 
    }
  
    case 'STAR_TODO': {
      const index = state.todos.findIndex(item => item.todoId === action.payload.todo.todoId);
      const newTodos = [...state.todos];

      newTodos[index] = {
        ...newTodos[index],
        isStarred: !newTodos[index].isStarred,
      };

      return {...state, todos: sortTodos(newTodos)};
    }

    case 'COMPLETE_TODO': {
      const index = state.todos.findIndex(item => item.todoId === action.payload.todo.todoId);
      const newTodos = [...state.todos];

      newTodos[index] = {
        ...newTodos[index],
        isCompleted: !newTodos[index].isCompleted,
      };

      return {...state, todos: sortTodos(newTodos)};
    }

    case 'SWITCH_TODO': {
      return {
        ...state, status: action.payload
      }
    }

    default:
      return state;
  }
}

export default reducer;