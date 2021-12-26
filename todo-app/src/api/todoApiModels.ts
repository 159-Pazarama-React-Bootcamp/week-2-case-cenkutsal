interface Todo {
	content: string
	isCompleted: boolean
	id: string
}
interface AddTodoPayload {
	content: string
	isCompleted: boolean
}

export type { Todo, AddTodoPayload }
