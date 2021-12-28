import React, { FormEvent, useContext, useState } from 'react';
import todoApi from '../../api/todoApi';
import { Todo } from '../../api/todoApiModels';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import AppContext from '../../core/context/AppContext';
import useAsyncProcess from '../../core/network/async-process/useAsyncProcess';

import './_addTodoForm.css';
//Functional component that occurs from input and a button which allows user to add new todos
function AddTodoForm() {
    const { state: addTodoState, runAsyncProcess: runAddTodoAsyncProcess } = useAsyncProcess<Todo>();
    const [todoQuery, setTodoQuery] = useState('');
    const { dispatchAppStateAction: dispatchAppStateAction } = useContext(AppContext);
    return (
        <form className="form" onSubmit={handleSubmit}>
            <Input
                placeholder="add a todo..."
                name="todo"
                minLength={3}
                value={todoQuery}
                onChange={handleTextFieldChange}
            />
            <Button
                shouldDisplaySpinner={addTodoState.isRequestPending}
                isDisabled={!Boolean(todoQuery.length)}
                type="submit"
            >
                add
            </Button>
        </form>
    );
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await runAddTodoAsyncProcess(todoApi.addTodo({ content: todoQuery, isCompleted: false }));
            dispatchAppStateAction({ type: 'ADD_TODO', payload: response });
            setTodoQuery('');
        } catch (error) {}
    }
    function handleTextFieldChange({ currentTarget: { value, name } }: React.SyntheticEvent<HTMLInputElement>) {
        setTodoQuery(value);
    }
}

export default AddTodoForm;
