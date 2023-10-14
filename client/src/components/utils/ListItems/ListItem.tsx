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
		onChange({event: ev, index: index})
	}

	return (
		<li
			className={
				classNames('react-list-select--item', {
					'is-disabled': disabled,
					'is-selected': selected,
					'is-focused': focused,
				})
			}
			onMouseOver={handleMouseOver}
			onClick={handleChange}
		>
			{children}
		</li>
	)
	
}

export default ListItem