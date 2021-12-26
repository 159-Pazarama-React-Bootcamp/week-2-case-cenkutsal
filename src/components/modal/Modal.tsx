import React from "react"
import ReactModal from "react-modal"
import "./_modal.css"

interface ModalProps {
	isOpen: boolean
	modalContentLabel: string
	onClose: (...args: any[]) => void
	children?: React.ReactNode
}
ReactModal.setAppElement("#root")

//Modal component that pops up in edit todo
function Modal({ isOpen, modalContentLabel, onClose, children }: ModalProps) {
	return (
		<ReactModal
			className='modal'
			isOpen={isOpen}
			contentLabel={modalContentLabel}
			onRequestClose={onClose}
		>
			<div className='modal__body'>{children}</div>
		</ReactModal>
	)
}

export default Modal
