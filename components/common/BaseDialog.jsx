import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function BaseDialog({ trigger, children, title, desc, onConfirm }) {
	const [open, setOpen] = useState(false)

	const onClose = () => {
		setOpen(false)
	}
	const onClick = () => {
		const flag = onConfirm()
		flag && onClose()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[360px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{desc && <DialogDescription>{desc}</DialogDescription>}
				</DialogHeader>
				{children}
				<DialogFooter>
					<Button variant='secondary' onClick={onClose}>
						取消
					</Button>
					<Button onClick={onClick}>确定</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
