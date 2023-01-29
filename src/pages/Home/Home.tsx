import React from 'react'
import img from '@/assets/images/webpack.png'
import { Heading } from '../../ui/Heading/Heading'

export function Home() {
	return (
		<div>
			<Heading level={1} text="HomePage" />
			<img src={img} alt="img" />
		</div>
	)
}
