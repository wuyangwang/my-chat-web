class TextQueue {
	queue = []
	timer = null
	duration = 800

	startQueue(cb) {
		this.reset()
		this.timer = setInterval(() => {
			if (this.isEmpty()) return

			let text = this.queue.join('')
			cb(text)
		}, this.duration)

		return (text) => {
			this.addText(text)
		}
	}

	reset() {
		this.queue = []
		this.timer && clearTimeout(this.timer)
	}

	addText(str) {
		this.queue.push(str)
	}

	isEmpty() {
		return this.queue.length === 0
	}
}

const queue = new TextQueue()
export default queue
