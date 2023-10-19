import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { type ReactNode } from "react"
import { TitleText } from "../typography/TitleText"

type ModalProps = {
	children: ReactNode
	buttonText?: string
	title: string
}

/** Pass in modal content as children. useModalContext to control the modal. */
export const ButtonWithModal = ({ children, buttonText = "Show More", title }: ModalProps) => {
	const [opened, { close, open }] = useDisclosure(false)

	return (
		<>
			<Button onClick={open}>{buttonText}</Button>
			<Modal
				closeButtonProps={{ "aria-label": "Close modal" }}
				title={<TitleText>{title}</TitleText>}
				size={"xl"}
				opened={opened}
				onClose={close}
				centered
			>
				{children}
			</Modal>
		</>
	)
}
