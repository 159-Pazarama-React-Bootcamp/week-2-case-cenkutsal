import React, { useContext, useState } from 'react';
import Button from '../components/button/Button';
import AppContext from '../core/context/AppContext';
import './_top-bar.css';

//Bringing all the top elements in one functional component
function Topbar() {
    const { appState: appState, dispatchAppStateAction: dispatchAppStateAction } = useContext(AppContext);
    return (
        <div className="topbar">
            {appState.username ? <h1>welcome back {appState.username}🚀</h1> : <h1>todo app</h1>}
            <Button onClick={toggleTheme}>{`${appState.theme === 'dark' ? '☀' : '🌙'}`}</Button>
        </div>
    );
    function toggleTheme() {
        const newTheme = appState.theme === 'dark' ? 'white' : 'dark';
        dispatchAppStateAction({ type: 'SET_THEME', payload: newTheme });
    }
}

export default Topbar;
