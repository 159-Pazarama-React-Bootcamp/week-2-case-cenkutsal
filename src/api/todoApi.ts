import { AddTodoPayload, Todo } from './todoApiModels';

const baseUrl = 'https://61c37a449cfb8f0017a3ebae.mockapi.io/todos';

const todoApi = {
    getTodos(): Promise<Todo[]> {
        return fetch(baseUrl, { method: 'GET' })
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },
    addTodo(payload: AddTodoPayload): Promise<Todo> {
        return fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },
    deleteTodo(id: string) {
        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
    },
    updateTodo(payload: AddTodoPayload, id: string): Promise<Todo> {
        return fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => console.log(error));
    },
};

export default todoApi;
