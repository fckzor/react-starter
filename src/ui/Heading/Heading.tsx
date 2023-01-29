import React from 'react'

interface IHeadingProps {
	level?: number
	text: string
	className: string
}

export function Heading({ level = 1, text, className }: IHeadingProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const HeadingTag: any = `h${level}`

	return <HeadingTag className={className}>{text}</HeadingTag>
}
