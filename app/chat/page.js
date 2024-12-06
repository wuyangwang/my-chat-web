import { Chat } from '@/components/chat'
import { ChatTypeEnum } from '@/utils'

export default function ChatPage() {
	return <Chat type={ChatTypeEnum.chat} />
}
