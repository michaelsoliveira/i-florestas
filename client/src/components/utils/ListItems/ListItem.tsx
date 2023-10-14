// @flow

import classNames from "../classNames"

type Props = {
	disabled: boolean,
	selected: boolean,
	focused: boolean,
	onMouseOver?: any,
	children: React.ReactNode,
	index?: number,
	onChange?: any,
}

const ListItem = ({ disabled = false, selected = false, focused = false, onMouseOver, children, index, onChange }: Props) => {

	const handleMouseOver = () => {
		onMouseOver(index)
	}

	const handleChange = (ev: any) => {
		onChange({ event: ev, index: index })
	}

	return (
		<li
			className={
				classNames('relative py-2 px-4 cursor-pointer focus:after:absolute focus:after:w-2 focus:before:bg-[#79b9ff] bg-green', 
				selected && 'bg-[#d7e7ff]',
				focused && 'after:absolute after:w-1 focus:after:content[\'\'] after:top-0 after:bottom-0 after:bg-[#79b9ff] after:right-0 before:absolute before:w-1 focus:before:content[\'\'] before:top-0 before:bottom-0 before:bg-[#79b9ff] before:left-0',
				disabled && 'text-[#afafaf] cursor-default'
				)
			}
			onMouseOver={handleMouseOver}
			onClick={handleChange}
		>
			{children}
		</li>
	)
	
}

export default ListItem