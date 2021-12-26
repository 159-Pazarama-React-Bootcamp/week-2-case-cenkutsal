import { CircularProgress } from "@material-ui/core"
import React from "react"
import "./_button.css"

type ButtonProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	"disabled" | "children"
> & {
	children: React.ReactNode
	shouldDisplaySpinner?: boolean
	isDisabled?: boolean
}

function Button(props: ButtonProps) {
	const { onClick, shouldDisplaySpinner, isDisabled, children, ...rest } = props
	return (
		<button
			className='button'
			{...rest}
			disabled={isDisabled}
			onClick={handleClick}
		>
			{shouldDisplaySpinner ? <CircularProgress size={15} /> : children}
		</button>
	)
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		if (onClick && !isDisabled) {
			onClick(event)
		}
	}
}

export default Button
