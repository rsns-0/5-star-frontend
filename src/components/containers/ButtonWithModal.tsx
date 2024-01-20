import { Button, type ButtonProps, Modal, type ModalBaseProps } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { type ReactNode } from "react"
import { TitleText } from "../typography/TitleText"

type ModalProps = {
	children: ReactNode
	buttonText: string
	buttonProps?: ButtonProps & { onClick?: React.MouseEventHandler<HTMLButtonElement> }
	modalProps?: Partial<ModalBaseProps>
	title: string
}

/** Pass in modal content as children. useModalContext to control the modal. */
export const ButtonWithModal = ({
	children,
	buttonText,
	buttonProps,
	modalProps,
	title,
}: ModalProps) => {
	const [opened, { close, open }] = useDisclosure(false)

	return (
		<>
			<Button
				{...buttonProps}
				onClick={(e) => {
					buttonProps?.onClick?.(e)
					open()
				}}
			>
				{buttonText}
			</Button>
			<Modal
				closeButtonProps={{ "aria-label": "Close modal" }}
				title={<TitleText>{title}</TitleText>}
				size={"xl"}
				opened={opened}
				onClose={close}
				centered
				{...modalProps}
			>
				{children}
			</Modal>
		</>
	)
}
