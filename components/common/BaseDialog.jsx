import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { createContext, useContext, useState } from 'react'

import { Button } from '@/components/ui/button'

const DialogContext = createContext()

export const DialogProvider = ({ children }) => {
	const [open, setOpen] = useState(false)
	const openDialog = () => setOpen(true)
	const closeDialog = () => setOpen(false)

	return (
		<DialogContext.Provider value={{ open, openDialog, closeDialog }}>
			{children}
		</DialogContext.Provider>
	)
}
export const useDialog = () => useContext(DialogContext)

export function BaseDialog({ trigger, children, title, desc, onConfirm }) {
	const { open, openDialog, closeDialog } = useDialog()

	const onClose = () => {
		closeDialog()
	}
	return (
		<Dialog open={open} onOpenChange={open ? closeDialog : openDialog}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-[360px] md:max-w-[420px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{desc && <DialogDescription>{desc}</DialogDescription>}
				</DialogHeader>
				{children}
				<DialogFooter>
					<Button variant='secondary' onClick={onClose}>
						取消
					</Button>
					<Button onClick={onConfirm}>确定</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
