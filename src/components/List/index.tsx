import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import useWebSocket from 'react-use-websocket'
import { PiCaretLeftBold, PiChartPieBold, PiCheckBold, PiFolderSimpleDashedBold, PiListChecksBold, PiMinusBold, PiPlusBold, PiTrashBold } from 'react-icons/pi'
import { AnimatePresence, motion } from 'framer-motion'
import Spinner from '../Spinner'
import Modal from '../Modal'
import { useListStore } from '../../store/listStore'
import useSound from 'use-sound'
import hover from '../../assets/core_16.opus'
import select from '../../assets/Click.opus'
import deselect from '../../assets/core_18.opus'
import error from '../../assets/core_23.opus'
import back from '../../assets/core_75.opus'
import ok from '../../assets/core_58.opus'
import writing from '../../assets/core_21.opus'

const List = () => {
	const allLists = useListStore(state => state.allLists)
	const setAllLists = useListStore(state => state.setAllLists)
	const addAllLists = useListStore(state => state.addAllLists)
	const list = useListStore(state => state.list)
	const setList = useListStore(state => state.setList)
	const addElement = useListStore(state => state.addElement)
	const deleteElement = useListStore(state => state.deleteElement)
	const spinning = useListStore(state => state.spinning)
	const user = useListStore(state => state.user)
	const setUsers = useListStore(state => state.setUsers)
	const sfxMute = useListStore(state => state.sfxMute)
	const sfxVolume = useListStore(state => state.sfxVolume)
	const [add, setAdd] = useState('')
	const [ogSize, setOgSize] = useState(0)
	const [selected, setSelected] = useState('')
	const [listSize, setListSize] = useState<number>()
	const [listSelected, setListSelected] = useState<{ name: string }[]>([])
	const [deleteConfirmation, setDeleteConfirmation] = useState(false)
	const [playHover] = useSound(hover, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSelect] = useSound(select, { volume: sfxMute ? 0 : (sfxVolume * 0.5) / 100 })
	const [playDeselect] = useSound(deselect, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playError] = useSound(error, { volume: sfxMute ? 0 : (sfxVolume * 0.75) / 100 })
	const [playBack] = useSound(back, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playOk] = useSound(ok, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playWriting] = useSound(writing, { volume: sfxMute ? 0 : sfxVolume / 100 })
	
	const {
		sendJsonMessage,
		lastJsonMessage
	} = useWebSocket('/ws', {
		share: true,
		filter: (message) => {
			const data = JSON.parse(message.data)
			const { type } = data

			return ['addedList', 'addedElement', 'deletedElement', 'userConnected'].includes(type)
		},
		onOpen: () => console.log('Connection opened'),
		shouldReconnect: () => true,
	})

	useEffect(() => {
		if (user) {
			sendJsonMessage({ type: 'user', user })
		}
	}, [user])

	useEffect(() => {
		if (lastJsonMessage) {
			const { type, success, added, listName, users } = lastJsonMessage as { type: string, success: boolean, added: string[] | string, listName: string, users: { username: string, pic: number }[] }
			type ResTypes = 'addedList' | 'addedElement' | 'deletedElement'
			
			const resTypes = {
				'addedList': () => {
					if (added) {
						addAllLists({ name: added as string })
					}
				},
				'addedElement': () => {
					if (added && listName && list[listName].length > 0) {
						addElement(listName, { name: added as string })
						setListSize(list[listName].length)
					}
				},
				'deletedElement': () => {
					if (listName && added && list[listName].length > 0) {
						const newSelected = listSelected.filter(x => !added.includes(x.name))
						
						deleteElement(listName, added as string[])
						setListSize(list[listName].length)
						setListSelected(newSelected)
					}
				},
				'userConnected': () => {
					if (users.length > 0 && user) {
						const parseUsers = users.filter(x => x.username !== user.username).map(x => ({ username: x.username, pic: x.pic }))

						setUsers(parseUsers)
					}
				}
			}

			if (success) resTypes[type as ResTypes]()
		}
	}, [lastJsonMessage])
	
	useEffect(() => {
		if (allLists.length > 0) return
		
		fetch(`/api/getLists`, { credentials: 'include' })
		.then(res => res.json())
		.then(res => {
			setAllLists(res)
			setOgSize(res.length)

			const list: { [key: string]: { name: string }[] } = {}
			
			if (res.length > 0) {
				res.forEach(({ name }: { name: string }) => {
					list[name] = []
				})
			}

			setList(list)
		})
	}, [])

	useEffect(() => {
		if (selected && list[selected].length < 1) {
			fetch(`/api/getList/${selected}`, { credentials: 'include' })
			.then(res => res.json())
			.then((res: {name: string}[]) => {
				const newList = list
				newList[selected] = res
				
				setList(newList)
				setListSize(res.length)
			})
		} else if (selected) {
			setListSize(list[selected].length)
		}
	}, [selected])

	const handleAdd = () => {
		if (add) {
			playOk()
			
			if (selected) {
				sendJsonMessage({ type: 'addElement', listName: selected, value: add })
			} else {
				sendJsonMessage({ type: 'addList', listName: add })
			}

			setAdd('')
		}
	}

	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e

		if (key == ' ' && !selected) {
			e.preventDefault()
			return
		}

		if (key == 'Enter' && add) {
			handleAdd()
		}
	}

	const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget

		playWriting()
		
		if (!selected) {
			setAdd(value.replace(/\s/g, ''))

			return
		}
		

		setAdd(value)
	}

	const handleDelete = () => {
		setDeleteConfirmation(true)
	}

	const handleConfirmDelete = () => {
		setDeleteConfirmation(false)

		if (selected && listSelected.length > 0) {
			const parseList = listSelected.map(({ name }) => name)

			sendJsonMessage({ type: 'deleteElement', listName: selected, value: parseList })
		}
	}

	const newWheel = () => {
		if (listSelected.length > 0) {
			sendJsonMessage({ type: 'selectList', listName: selected, value: listSelected })
		}
	}

	const selectAll = () => {
		if (listSelected.length < 1) {
			playSelect()
			setListSelected(list[selected])
		} else {
			playDeselect()
			setListSelected([])
			setDeleteConfirmation(false)
		}
	}
	
	return (
		<div className={styles.list}>
			<div className={styles.input}>
				<input type="text" name={selected ? 'addElement' : 'addList'} placeholder={selected ? 'Add element...' : 'Add category...'} onKeyDown={handleKey} onInput={handleInput} value={add} onFocus={() => playSelect()} onBlur={() => playBack()} />
				<button className={styles.add} onClick={handleAdd} onMouseOver={() => playHover()}>
					<div className={styles.icon}>
						<PiPlusBold />
					</div>
				</button>
			</div>
			<h2>
				{selected || 'CATEGORY'}
				{selected &&
					<span onClick={() => { playBack(); setSelected(''); setListSize(undefined); setListSelected([]) }} onMouseOver={() => playHover()}>
						<div className={styles.icon}>{<PiCaretLeftBold />}</div>
						Back
					</span>
				}
			</h2>
			{selected && listSize !== undefined && listSize > 0 &&
				<div className={styles.actions}>
					<div className={styles.selectAll} onClick={selectAll}>
						<div className={`${styles.box} ${listSelected.length > 0 && styles.active}`}>
							{listSelected.length > 0 &&
								<div className={styles.subIcon}>
									{listSelected.length === list[selected].length ? <PiCheckBold /> : listSelected.length < list[selected].length && <PiMinusBold />}
								</div>
							}
						</div>
						<div className={styles.icon}>
							<PiListChecksBold />
						</div>
					</div>
					<AnimatePresence>
						{listSelected.length > 0 &&
							<motion.div className={styles.delete} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleDelete}>
								<div className={styles.icon}>
									<PiTrashBold />
								</div>
								<AnimatePresence>
									{deleteConfirmation &&
										<Modal title={'[Deletion confirmation]'} text={'Are you sure you want to delete this?'} close={() => { playBack(); setDeleteConfirmation(false) }} action={() => { playOk(); handleConfirmDelete() }} />
									}
								</AnimatePresence>
							</motion.div>
						}
					</AnimatePresence>
				</div>
			}
			{((!selected && allLists.length > 0) || (selected && listSize !== undefined && listSize > 0)) &&
				<div className={styles.itemsWrapper} key={selected}>
					<motion.div className={styles.items} key={selected}>
						{!selected ? allLists.length > 0 && allLists.map(({ name }, i) => {
							const delay = i > (ogSize - 1) ? 0 : i == 0 ? 0 : i / 10
							
							return (
								<motion.div className={styles.item} key={name} initial={{ opacity: 0, x: -15 }}
								animate={{ opacity: 1, x: 0, transition: { delay } }}
								onClick={() => { playSelect(); setSelected(name) }} onMouseOver={() => playHover()}>
									{name}
									<div className={styles.arrowWrapper}>
										<div className={styles.wrapper}>
											<div className={styles.arrow}></div>
										</div>
									</div>
								</motion.div>
							)
						}) : listSize !== undefined && listSize > 0 ? list[selected].map(({ name }, i) => {
							const delay = i > (listSize - 1) ? 0 : i == 0 ? 0 : i / 10
							const findSelected = listSelected.find(x => x.name === name)

							const handleAdd = () => {
								if (findSelected) {
									if (listSelected.length < 2) setDeleteConfirmation(false)
										
									playDeselect()
									setListSelected(prev => prev.filter(x => x.name !== name))

									return
								}
								
								playSelect()
								setListSelected(prev => [...prev, { name }])
							}

							return (
								<motion.div className={`${styles.element} ${findSelected ? styles.active : ''}`} key={name} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0, transition: { delay } }} onClick={handleAdd} onMouseOver={() => playHover()}>
									{name}
									<div className={styles.arrowWrapper}>
										<div className={styles.wrapper}>
											<div className={styles.arrow}></div>
										</div>
									</div>
								</motion.div>
							)
						}) : ''
						}
					</motion.div>
				</div>
			}
			{selected && listSize == undefined ?
				<Spinner />
			: selected && listSize !== undefined && listSize < 1 &&
				<div className={styles.empty}>
					<span>
						<div className={styles.icon}>
							<PiFolderSimpleDashedBold />
						</div>
						This category is empty
					</span>
				</div>
			}
			{selected && listSize !== undefined && listSize > 1 &&
				<button className={`${styles.addWheel} ${listSelected.length < 2 || spinning ? styles.disabled : ''}`}
				onClick={() => { if (listSelected.length < 2 || spinning) { playError() } else { playOk(); newWheel() }}} onMouseOver={() => !(listSelected.length < 2 || spinning) && playHover()}>
					<div className={styles.icon}>
						<PiChartPieBold />
					</div>
					Create wheel
				</button>
			}
		</div>
	)
}

export default List