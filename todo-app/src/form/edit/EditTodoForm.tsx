import React, { FormEvent, useContext, useState } from "react"
import todoApi from "../../api/todoApi"
import { Todo } from "../../api/todoApiModels"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import AppContext from "../../core/context/AppContext"
import useAsyncProcess from "../../core/network/async-process/useAsyncProcess"
import "./_edit-todo-form.css"

interface EditTodoFormProps {
	todo: Todo
	onSubmit: VoidFunction
}
//Functional component that users edits their todos
function EditTodoForm({ todo, onSubmit }: EditTodoFormProps) {
	const { state: editTodoState, runAsyncProcess: runEditTodoAsyncProcess } =
		useAsyncProcess<Todo>()
	const [todoQuery, setTodoQuery] = useState(todo.content)
	const { dispatchAppStateAction: dispatchAppStateAction } =
		useContext(AppContext)
	return (
		<form className='form' onSubmit={handleSubmit}>
			<Input
				placeholder='edit todo...'
				name='todo'
				minLength={3}
				value={todoQuery}
				onChange={handleTextFieldChange}
			/>
			<Button
				shouldDisplaySpinner={editTodoState.isRequestPending}
				isDisabled={!Boolean(todoQuery.length)}
				type='submit'
			>
				save
			</Button>
		</form>
	)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		event.stopPropagation()
		try {
			const response = await runEditTodoAsyncProcess(
				todoApi.updateTodo(
					{ content: todoQuery, isCompleted: todo.isCompleted },
					todo.id
				)
			)
			dispatchAppStateAction({ type: "UPDATE_TODO", payload: response })
			onSubmit()
		} catch (error) {}
	}

	function handleTextFieldChange({
		currentTarget: { value },
	}: React.SyntheticEvent<HTMLInputElement>) {
		setTodoQuery(value)
	}
}

export default EditTodoForm
