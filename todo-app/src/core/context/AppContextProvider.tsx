import { useEffect, useLayoutEffect, useReducer } from "react"
import todoApi from "../../api/todoApi"
import { Todo } from "../../api/todoApiModels"
import useAsyncProcess from "../network/async-process/useAsyncProcess"
import AppContext, {
	appStateReducer,
	initialAppState as initialAppState,
} from "./AppContext"

interface AppContextProviderProps {
	children: React.ReactNode
}
function AppContextProvider({ children }: AppContextProviderProps) {
	const [appState, dispatchAppStateAction] = useReducer(
		appStateReducer,
		initialAppState
	)
	const { state, runAsyncProcess } = useAsyncProcess<Todo[]>()
	//listing the todos that we got from api
	useEffect(() => {
		;(async () => {
			const response = await runAsyncProcess(todoApi.getTodos())
			dispatchAppStateAction({ type: "SET_TODOS", payload: response })
		})()
	}, [])
	//sets the username in localStorage if we recieve it in localstorage
	useEffect(() => {
		const username = localStorage.getItem("username")
		if (username) {
			dispatchAppStateAction({ type: "SET_USERNAME", payload: username })
		}
	}, [])
	//toggles the dark mode in _theme.css
	useLayoutEffect(() => {
		localStorage.setItem("theme", appState.theme)
		document.documentElement.classList.add(appState.theme)
		return () => {
			document.documentElement.classList.remove(appState.theme)
		}
	}, [appState.theme])

	return (
		<AppContext.Provider
			value={{
				appState: appState,
				dispatchAppStateAction: dispatchAppStateAction,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
