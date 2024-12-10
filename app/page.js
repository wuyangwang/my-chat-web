import { ModelToolList } from '@/components/home/ModelToolList'
import TextWriter from '@/components/anim/text-writer'

export default function Home() {
	return (
		<div className='p-4 h-full justify-center'>
			<div className='my-4 text-center md:text-left text-foreground text-3xl font-bold'>
				<TextWriter text={'选择一个模型，开始聊天吧！'} delay={0.2} loop />
			</div>
			<ModelToolList />
		</div>
	)
}
