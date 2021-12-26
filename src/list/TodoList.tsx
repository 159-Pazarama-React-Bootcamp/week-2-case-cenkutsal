import { useContext } from "react"
import AppContext from "../core/context/AppContext"
import TodoListItem from "./item/TodoListItem"
import "./_todo-list.css"

//For displaying the todolist
function TodoList() {
	const {
		appState: { todos },
	} = useContext(AppContext)
	return (
		<ul className='todo__list'>
			{todos?.map(todo => (
				<TodoListItem key={todo.id} todo={todo} />
			))}
		</ul>
	)
}

export default TodoList
