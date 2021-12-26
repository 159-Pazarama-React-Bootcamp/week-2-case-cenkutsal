import { useContext, useState } from "react"
import todoApi from "../../api/todoApi"
import { Todo } from "../../api/todoApiModels"
import Button from "../../components/button/Button"
import Checkbox from "../../components/checkbox/Checkbox"
import Modal from "../../components/modal/Modal"
import AppContext from "../../core/context/AppContext"
import useAsyncProcess from "../../core/network/async-process/useAsyncProcess"
import EditTodoForm from "../../form/edit/EditTodoForm"
import "./_todoListItem.css"

interface TodoListItemProps {
	todo: Todo
}

function TodoListItem({ todo }: TodoListItemProps) {
	const { runAsyncProcess: runUpdateTodoAsyncProcess } = useAsyncProcess()
	const { state: deleteTodoState, runAsyncProcess: runDeleteTodoAsyncProcess } =
		useAsyncProcess()
	const { dispatchAppStateAction: dispatchAppStateAction } =
		useContext(AppContext)
	const [shouldDisplayEditModal, setEditModalVisibility] = useState(false)
	return (
		<li>
			<Checkbox
				isSelected={todo.isCompleted}
				item={{
					content: todo.content,
					id: todo.id,
					inputProps: { htmlFor: "todo", name: "todo", value: "todo" },
				}}
				onSelect={handleCheckboxChange(todo)}
			/>
			<div>
				<Button onClick={handleEditClick}>edit</Button>
				<Button
					shouldDisplaySpinner={deleteTodoState.isRequestPending}
					onClick={handleDeleteClick}
				>
					-
				</Button>
			</div>
			{shouldDisplayEditModal && (
				<Modal
					isOpen={shouldDisplayEditModal}
					modalContentLabel='Edit Todo'
					onClose={handleEditModalClose}
				>
					<EditTodoForm todo={todo} onSubmit={handleEditModalClose} />
				</Modal>
			)}
		</li>
	)
	function handleEditClick() {
		setEditModalVisibility(true)
	}
	async function handleDeleteClick() {
		try {
			await runDeleteTodoAsyncProcess(todoApi.deleteTodo(todo.id))
			dispatchAppStateAction({
				type: "REMOVE_TODO",
				payload: { todoId: todo.id },
			})
		} catch (error) {
			console.log(error)
		}
	}
	function handleEditModalClose() {
		setEditModalVisibility(false)
	}
	//if todo is completed ticks the checkbox or vice versa
	function handleCheckboxChange(todo: Todo) {
		return async () => {
			try {
				dispatchAppStateAction({
					type: "TOGGLE_TODO_COMPLETED",
					payload: { todoId: todo.id },
				})
				await runUpdateTodoAsyncProcess(
					todoApi.updateTodo(
						{ ...todo, isCompleted: !todo.isCompleted },
						todo.id
					)
				)
			} catch (error) {}
		}
	}
}

export default TodoListItem
