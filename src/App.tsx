import React from 'react';
import TodoList from './list/TodoList';
import './App.css';
import AddTodoForm from './form/add/AddTodoForm';
import { useContext } from 'react';
import LoginForm from './form/login/LoginForm';
import AppContext from './core/context/AppContext';
import Topbar from './topbar/Topbar';

function App() {
    const { appState: appState } = useContext(AppContext);
    return (
        <div className="app">
            <Topbar />
            <div className="app__child">
                {!appState.username ? (
                    <LoginForm />
                ) : (
                    <>
                        <TodoList />
                        <AddTodoForm />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
