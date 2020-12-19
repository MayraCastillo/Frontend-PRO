
const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };

      case "TOGGLE_TODO":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, complete: !todo.complete }
              : todo
          ),
        };

      case "DELETE_TODO":
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };

      case "MODIFY_TODO":
        return {
          ...state,
          todos: [action.payload],
        };

      case "ADD_TODAYSMENU":
        return {
          ...state,
          todaysmenu: [...state.todaysmenu, action.payload],
        };

      case "MODIFY_TODAYSMENU":
        return {
          ...state,
          todaysmenu: [action.payload],
        };

      case "DELETE_TODAYSMENU":
        return {
          ...state,
          todaysmenu: state.todaysmenu.filter((todaymenu) => todaymenu.id !== action.payload),
        };

      case "ADD_TODOSTODAYSMENU":
        return {
          ...state,
          todostodaysmenu: [...state.todostodaysmenu, action.payload],
        };

      default:
        return state;
    }
  };
  
  export default reducer;