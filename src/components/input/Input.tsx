import React from "react"
import "./_input.css"

type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange" | "name"
> & { onChange: React.ReactEventHandler<HTMLInputElement>; name: string }
function Input(props: InputProps) {
	return (
		<div className='input-container'>
			<input className='input' {...props} />
		</div>
	)
}

export default Input
