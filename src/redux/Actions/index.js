
/**
 * Agregar el producto seleccionado a la constante/estado global
 * @param {*Producto seleccionado por el cliente} todo 
 */
export const addTodoAction = (todo) => ({
    type: "ADD_TODO",
    payload: todo,
});

/**
 * 
 * @param {*ID del producto seleccionado por el cliente} todoId 
 */
export const toggleTodoAction = (todoId) => ({
    type: "TOGGLE_TODO",
    payload: todoId,
});

/**
 * Elimina el producto seleccionado de la constante/estado global
 * @param {*ID del producto seleccionado por el cliente} todoId 
 */
export const deleteTodoAction = todoId => ({
      type: 'DELETE_TODO',
      payload: todoId
})

/**
 * Modifica el producto que se encuentra guardado actualmente por el nuevo seleccionado por el cliente
 * @param {*Producto seleccionado por el cliente} todo 
 */
export const modifyTodoAction = (todo) => {
    return {
        type: 'MODIFY_TODO',
        payload: todo
    }
};

/**
 * Agrega al menu del dia, la opcion seleccionada por el cliente a una constante/estado global
 * @param {*Opcion del menu del dia seleccionado por el cliente} todaysmenu 
 */
export const addTodaysMenuAction = (todaysmenu) => ({
    type: "ADD_TODAYSMENU",
    payload: todaysmenu,
});

/**
 * Modifica en el menu del dia, la opcion seleccionada por el cliente a una constante/estado global
 * @param {*Opcion del menu del dia seleccionado por el cliente} todaysmenu 
 */
export const modifyTodaysMenuAction = (todaysmenu) => {
    return {
        type: 'MODIFY_TODAYSMENU',
        payload: todaysmenu
    }
};

/**
 * Elimina del menu del dia, la opcion seleccionada por el cliente a una constante/estado global
 * @param {*Opcion del menu del dia seleccionado por el cliente} todaysMenuId 
 */
export const deleteTodaysMenuAction = todaysMenuId => ({
    type: 'DELETE_TODAYSMENU',
    payload: todaysMenuId
})

/**
 * Agrega a una constante/estado global el menu del dia formado por el cliente
 * @param {*Menu del dia seleccionado por el cliente} todostodaysmenu 
 */
export const addTodosTodaysMenuAction = (todostodaysmenu) => ({
    type: "ADD_TODOSTODAYSMENU",
    payload: todostodaysmenu,
});