import React, { useContext, useState } from "react"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import AppContext from "../../core/context/AppContext"

function LoginForm() {
	const [username, setUsername] = useState("")
	const { dispatchAppStateAction: dispatchAppStateAction } =
		useContext(AppContext)
	return (
		<form onSubmit={handleSubmit}>
			<Input
				placeholder='enter username...'
				name='username'
				onChange={handleTextFieldChange}
			/>
			<Button type='submit'>log in</Button>
		</form>
	)
	function handleTextFieldChange({
		currentTarget: { value, name },
	}: React.SyntheticEvent<HTMLInputElement>) {
		setUsername(value)
	}
	function handleSubmit() {
		localStorage.setItem("username", username)
		dispatchAppStateAction({ type: "SET_USERNAME", payload: username })
	}
}

export default LoginForm
