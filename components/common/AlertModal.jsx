'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { useState } from 'react'

export function AlertModal({
	show = false,
	children,
	title = '确认操作',
	desc,
	showCancel = true,
	onConfirm
}) {
	const [open, setOpen] = useState(show)

	const onCancel = () => {
		setOpen(false)
	}
	const onSubmit = () => {
		setOpen(false)
		onConfirm()
	}
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{desc}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{showCancel && <AlertDialogCancel onClick={onCancel}>取消</AlertDialogCancel>}
					<AlertDialogAction onClick={onSubmit}>确定</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
