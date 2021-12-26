import React from "react"
import "./_checkbox.css"

export interface CheckboxInputItem {
	id: string
	content: React.ReactNode
	inputProps: {
		htmlFor: string
		value: string
		name: string
	}
	isDisabled?: boolean
}
export interface CheckboxInputProps {
	item: CheckboxInputItem
	onSelect: (
		item: CheckboxInputItem,
		event?: React.SyntheticEvent<HTMLInputElement>
	) => void
	isSelected: boolean
	isDisabled?: boolean
}

function Checkbox({
	isSelected,
	item,
	onSelect,
	isDisabled,
}: CheckboxInputProps) {
	const {
		inputProps: { name, value, htmlFor },
		content,
	} = item
	return (
		<label className='checkbox-label'>
			<input
				className='checkbox-input'
				type='checkbox'
				id={htmlFor}
				name={name}
				value={value}
				disabled={isDisabled}
				checked={isSelected}
				onChange={handleCheckboxChange}
			/>
			{content}
		</label>
	)
	function handleCheckboxChange(event: React.SyntheticEvent<HTMLInputElement>) {
		onSelect(item, event)
	}
}

export default Checkbox
