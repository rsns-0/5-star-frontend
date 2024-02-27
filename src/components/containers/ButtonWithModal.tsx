import {
	Button,
	type ButtonProps,
	Modal,
	type ModalBaseProps,
	useMantineTheme,
	type ModalProps,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { type ReactNode } from "react"
import { TitleText } from "../typography/TitleText"

type ModalWithButtonProps = {
	children: ReactNode
	buttonText: string
	buttonProps?: ButtonProps & { onClick?: React.MouseEventHandler<HTMLButtonElement> }
	modalProps?: Partial<ModalBaseProps>
	title: ReactNode
}

/** Pass in modal content as children. useModalContext to control the modal. */
export const ButtonWithModal = ({
	children,
	buttonText,
	buttonProps,
	modalProps,
	title,
}: ModalWithButtonProps) => {
	const [opened, { close, open }] = useDisclosure(false)

	const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		buttonProps?.onClick?.(e)
		open()
	}

	return (
		<>
			<Button fullWidth={false} {...buttonProps} onClick={onClick}>
				{buttonText}
			</Button>

			<ArticleModal title={title} opened={opened} onClose={close} {...modalProps}>
				{children}
			</ArticleModal>
		</>
	)
}

function ArticleModal({ title, ...modalProps }: ModalProps) {
	const { colors } = useMantineTheme()

	return (
		<Modal
			centered={false}
			closeButtonProps={{
				"aria-label": "Close modal",
				style: { border: "1px solid gray" },
				bg: "red",
				c: "white",
			}}
			title={<TitleText>{title}</TitleText>}
			size={"xl"}
			padding="xl"
			styles={{
				title: {
					width: "100%",
					textAlign: "center",
				},
				header: { borderBottom: "1px solid gray", background: colors.gray[9] },
				body: { marginTop: "2rem", marginBottom: "2rem" },
			}}
			{...modalProps}
		/>
	)
}
