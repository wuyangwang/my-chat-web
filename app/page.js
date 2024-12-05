import CanvasCursor from '@/components/anim/canvas-cursor'
import TextWriter from '@/components/anim/text-writer'
import { ModelToolList } from '@/components/home/ModelCard'

export default function Home() {
	return (
		<div className='h-full justify-center'>
			<div className='my-4 text-foreground text-4xl font-bold'>当前功能:</div>
			<ModelToolList />
			<div className='text-center mt-10 text-2xl font-bold'>
				<TextWriter text={'选择一个模型，开始加速吧！'} delay={0.2} loop />
			</div>
			<CanvasCursor />
		</div>
	)
}
