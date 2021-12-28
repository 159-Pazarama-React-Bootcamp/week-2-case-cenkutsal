import { createContext, Dispatch } from 'react';
import { Todo } from '../../api/todoApiModels';
import { getInitialTheme } from '../ui/themeUtils';

//types and interfaces section
export type AppTheme = 'white' | 'dark';

interface AppState {
    theme: AppTheme;
    username: string;
    todos: Todo[];
}
const initialAppState: AppState = {
    username: '',
    todos: [] as Todo[],
    theme: getInitialTheme(),
} as const;

type AppStateAction =
    | { type: 'SET_TODOS'; payload: Todo[] }
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'TOGGLE_TODO_COMPLETED'; payload: { todoId: string } }
    | { type: 'REMOVE_TODO'; payload: { todoId: string } }
    | { type: 'UPDATE_TODO'; payload: Todo }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_THEME'; payload: AppTheme };

//App state Reducer
function appStateReducer(state = initialAppState, action: AppStateAction) {
    let newState = state;
    switch (action.type) {
        case 'SET_TODOS':
            newState = { ...state, todos: action.payload };
            break;
        case 'ADD_TODO':
            newState = { ...state, todos: [...state.todos, action.payload] };
            break;
        case 'TOGGLE_TODO_COMPLETED': {
            const newTodos = [...state.todos];
            const todoIndex = state.todos.findIndex((t) => t.id === action.payload.todoId);
            const relatedTodo = state.todos[todoIndex];
            newTodos.splice(todoIndex, 1, {
                ...relatedTodo,
                isCompleted: !relatedTodo.isCompleted,
            });
            newState = { ...state, todos: newTodos };
            break;
        }

        case 'REMOVE_TODO': {
            const newTodos = state.todos.filter((todo) => todo.id !== action.payload.todoId);
            newState = { ...state, todos: newTodos };
            break;
        }
        case 'UPDATE_TODO': {
            const newTodos = [...state.todos];
            const todoIndex = state.todos.findIndex((t) => t === action.payload);
            newTodos.splice(todoIndex, 1, action.payload);
            newState = { ...state, todos: newTodos };
            break;
        }
        case 'SET_USERNAME':
            newState = { ...state, username: action.payload };
            break;

        case 'SET_THEME': {
            newState = { ...state, theme: action.payload };
            break;
        }
        default:
            break;
    }
    return newState;
}
const AppContext = createContext({
    appState: initialAppState,
    dispatchAppStateAction: (() => undefined) as Dispatch<AppStateAction>,
});
export default AppContext;
export { appStateReducer as appStateReducer, initialAppState as initialAppState };
