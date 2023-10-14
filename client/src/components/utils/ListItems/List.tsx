// @flow

// Thanks to https://gist.github.com/DelvarWorld/3784055
// for the inspiration for the shift-selection

import includes from 'lodash/includes'
import range from 'lodash/range'
import reject from 'lodash/reject'
import uniq from 'lodash/uniq'
import ListItem from './ListItem'
import classNames from '../classNames'
import { useState } from 'react'
import '@/styles/List.module.css'

type Props = {
	className?: string,
	items: Array<React.ReactNode>,
	selected: Array<number>,
	disabled?: Array<number>,
	multiple?: boolean,
	onChange?: any,
	keyboardEvents?: boolean,
}

type State = {
	items?: Array<React.ReactNode>,
	selectedItems?: Array<number> | any,
	disabledItems?: Array<number> | any,
	focusedIndex?: null | number,
	lastSelected?: null | number,
}

type SelectArgs = {
	index: null | number,
	contiguous: boolean,
}

const List = ({ className, items = [], selected = [], disabled = [], multiple = false, onChange = () => {}, keyboardEvents = true }: Props) => {
	const KEY = {
		UP: 38,
		DOWN: 40,
		ESC: 27,
		ENTER: 13,
		SPACE: 32,
		J: 74,
		K: 75,
	}
	
	const KEYS = Object.values(KEY)

	const [state, setState] = useState<State>({
		items: items,
		selectedItems: selected,
		disabledItems: disabled,
		focusedIndex: null,
		lastSelected: null,
	})

	const clear = () => {
		setState({
			selectedItems: [],
			disabledItems: [],
			focusedIndex: null,
			lastSelected: null,
		})
	}

	const select = ({ index, contiguous = false }: SelectArgs) => {
		if (index === null) {
			return
		}

		if (includes(state.disabledItems, index)) {
			return
		}

		let { lastSelected } = state
		let selectedItems = multiple
			? [...state.selectedItems, index]
			: [index]

		if (
			contiguous &&
			multiple &&
			typeof lastSelected === 'number'
		) {
			let start = Math.min(lastSelected, index)
			let end = Math.max(lastSelected, index)

			selectedItems = uniq([
				...selectedItems,
				...range(start, end + 1),
			])
		}

		setState({
			...state,
			selectedItems, lastSelected: index,
		})

		onChange(
			multiple
			? selectedItems
			: lastSelected,
		)
	}

	const deselect = ({ index, contiguous = false }: SelectArgs) => {
		if (index === null) {
			return
		}

		let { selectedItems, lastSelected } = state

		if (
			contiguous &&
			multiple &&
			typeof lastSelected === 'number'
		) {
			let start = Math.min(lastSelected, index)
			let end = Math.max(lastSelected, index)

			let toDeselect = range(start, end + 1)
			selectedItems = reject(selectedItems, idx =>
				includes(toDeselect, idx),
			)
		} else {
			selectedItems = reject(selectedItems, idx => idx === index)
		}

		setState({selectedItems, lastSelected: index})
		onChange(
			multiple ? selectedItems : null,
		)
	}

	// const disable = (index: number) => {
	// 	const { disabledItems } = state as any
	// 	let indexOf = disabledItems.indexOf(index)
		
	// 	setState({
	// 			disabledItems: [...disabledItems].splice(indexOf, 1),
	// 		}
	// 	)
	// }

	const disable = (index: number) => {
		setState({...state, disabledItems: [...state.disabledItems, index]}
		)
	}

	const focusIndex = (index: null | number = null) => {
		if (index === null) {
			return {}
		}

		let {focusedIndex, disabledItems} = state

		if (!includes(disabledItems, index) && typeof index === 'number') {
			focusedIndex = index
		}
		
		setState({ ...state, focusedIndex })
	}

	const focusPrevious = () => {
		let { focusedIndex, disabledItems, items } = state as any
			let lastItem = items.length - 1 

			if (focusedIndex === null) {
				focusedIndex = lastItem
			} else {
				// focus last item if reached the top of the list
				focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex =
						focusedIndex <= 0 ? lastItem : focusedIndex - 1
				}
			}
			setState({ ...state, focusedIndex })
	}

	const focusNext = () => {
		setState(state => {
			let {focusedIndex, disabledItems, items} = state as any
			let lastItem = items.length - 1

			if (focusedIndex === null) {
				focusedIndex = 0
			} else {
				// focus first item if reached last item in the list
				focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex =
						focusedIndex >= lastItem ? 0 : focusedIndex + 1
				}
			}

			return {focusedIndex}
		})
	}

	const onKeyDown = (event: any) => {
		let key = event.keyCode
		const focusedIndex = state.focusedIndex as number
		if (key === KEY.UP || key === KEY.K) {
			focusPrevious()
		} else if (key === KEY.DOWN || key === KEY.J) {
			focusNext()
		} else if (key === KEY.SPACE || key === KEY.ENTER) {
			toggleKeyboardSelect({
				event,
				index: focusedIndex,
			})
		}

		// prevent default behavior where in some situations pressing the
		// key up / down would scroll the browser window
		if (includes(KEYS, key)) {
			event.preventDefault()
		}
	}

	const toggleSelect = (args: {contiguous: boolean, index: null | number}) => {
		let {contiguous, index} = args
		if (index === null) {
			return
		}

		if (!includes(state.selectedItems, index)) {
			select({index, contiguous})
		} else if (multiple) {
			deselect({index, contiguous})
		}
	}

	const toggleKeyboardSelect = (args: {
		event: any,
		index: null | number,
	}) => {
		let {event, index} = args
		event.preventDefault()
		let shift = event.shiftKey
		toggleSelect({ contiguous: shift, index })
	}

	const toggleMouseSelect = (args: {
		event: any,
		index: number,
	}) => {
		let { event, index } = args
		event.preventDefault()
		let shift = event.shiftKey
		toggleSelect({ contiguous: shift, index })
	}

	return (
		<>
			<ul
				className={classNames('relative inline-block outline-none mr-[0.5em] border bg-[#fafafa] text-sm', className)}
				tabIndex={0}
				onKeyDown={keyboardEvents ? onKeyDown : undefined}
			>
				{
					items.map((itemContent: any, index: number) => (
						<ListItem
							key={index}
							index={index}
							disabled={includes(state.disabledItems, index)}
							selected={includes(state.selectedItems, index)}
							focused={state.focusedIndex === index}
							onMouseOver={focusIndex}
							onChange={toggleMouseSelect}
						>
							{itemContent}
					</ListItem>
					
					))
				}
			</ul>
		</>
	)
}

export default List