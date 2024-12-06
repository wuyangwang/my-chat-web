export function ChatMessage({ message }) {
	const { role, content } = message
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2'>
				<div className='w-[30px] h-[30px] rounded-full bg-gray-500'></div>
				<div className='font-bold'>{role}</div>
			</div>
			<div className='p-4 bg-gray-100 rounded-lg'>
				<pre className='whitespace-pre-wrap'>{content}</pre>
			</div>
		</div>
	)
}
