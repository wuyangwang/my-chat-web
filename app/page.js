import { ModelToolList } from '@/components/home/ModelToolList'
import TextWriter from '@/components/anim/text-writer'

export default function Home() {
	return (
		<div className='p-4 h-full justify-center'>
			<div className='my-4 text-center md:text-left text-foreground text-3xl font-bold'>
				当前功能:
			</div>
			<ModelToolList />
			<div className='text-center mt-10 text-2xl font-bold'>
				<TextWriter text={'选择一个模型，开始加速吧！'} delay={0.2} loop />
			</div>
		</div>
	)
}
