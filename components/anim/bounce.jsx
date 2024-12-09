'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const Bounce = ({
	children,
	delay = 0,
	duration = 0.5,
	bounceHeight = 20,
	className = '',
	once = true
}) => {
	const ref = useRef(null)
	const controls = useAnimation()
	const isInView = useInView(ref, { triggerOnce: once, threshold: 0.1 })

	useEffect(() => {
		if (isInView) {
			controls.start('visible')
		} else if (!once) {
			controls.start('hidden')
		}
	}, [controls, isInView, once])

	const variants = {
		hidden: { opacity: 0, y: bounceHeight },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay,
				duration,
				type: 'spring',
				stiffness: 200,
				damping: 10
			}
		}
	}

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={controls}
			variants={variants}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export default Bounce
