import { Fragment } from 'react/jsx-runtime'
import styles from './styles.module.scss'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { useListStore } from '../../store/listStore'
import useSound from 'use-sound'
import ok from '../../assets/core_58.opus'
import select from '../../assets/Click.opus'
import hover from '../../assets/core_16.opus'
import back from '../../assets/core_75.opus'
import error from '../../assets/core_23.opus'
import spin from '../../assets/core_37.opus'
import popup from '../../assets/core_1.opus'
import Spinner from '../Spinner'

const colors = [
	"#877A63",
	"#B7987E",
	"#BCAF91",
	"#E1D8AA",
	"#E6E1CD"
]

type Wheel = [string, { name: string }[], [number, number]] | []

const Wheel = () => {
	const setSpinning = useListStore(state => state.setSpinning)
	const spinning = useListStore(state => state.spinning)
	const sfxVolume = useListStore(state => state.sfxVolume)
	const sfxMute = useListStore(state => state.sfxMute)
	const user = useListStore(state => state.user)
	const [wheel, setWheel] = useState<Wheel>([])
	const calcDegrees = wheel.length > 0 && (360 / (wheel[1] as { name: string }[]).length)
	const [scope, animate] = useAnimate()
	const [turn, setTurn] = useState(false)
	const [selected, setSelected] = useState<string>()
	const [reset, setReset] = useState(false)
	const [spinned, setSpinned] = useState(false)
	const [playOk] = useSound(ok, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSelect] = useSound(select, { volume: sfxMute ? 0 : (sfxVolume * 0.5) / 100 })
	const [playHover] = useSound(hover, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playBack] = useSound(back, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playError] = useSound(error, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSpin] = useSound(spin, { volume: sfxMute ? 0 : (sfxVolume * 0.2) / 100 })
	const [playPopup] = useSound(popup, { volume: sfxMute ? 0 : sfxVolume / 100 })

	const { lastJsonMessage, sendJsonMessage } = useWebSocket(import.meta.env.VITE_WS_URL, {
		share: true,
		filter: (message) => {
			const data = JSON.parse(message.data)
			const { type } = data

			return ['selected', 'spin', 'reset', 'deletedElement', 'cleared', 'wheelEnded', 'spinning'].includes(type)
		},
		onOpen: () => console.log('Connection opened'),
		shouldReconnect: () => true
	})

	useEffect(() => {
		if (lastJsonMessage) {
			const { type, listName, success, selected, random, added, username } = lastJsonMessage as { type: string, listName: string, success: boolean, selected: { name: string }[], random: [number, number], added: string, username?: string }

			type ReqTypes = 'selected' | 'spin' | 'reset' | 'deletedElement' | 'cleared' | 'wheelEnded' | 'spinning'
			
			const reqTypes = {
				'selected': () => {
					if (listName && selected && random) {
						setWheel([listName, selected, random])
					}
				},
				'spin': () => {
					startTurning(username)
				},
				'spinning': () => {
					console.log('spinning')
					setSpinning(true)
				},
				'wheelEnded': () => {
					if (calcDegrees && !spinned) {
						const random = (wheel[2] as [number, number])[0] as number
			
						const baseAngle = calcDegrees / 2
						const createRanges = (wheel[1] as { name: string }[]).map(({ name }, i) => {
							const rawMax = baseAngle + (calcDegrees * (i + 1))
							const max = rawMax > 360 ? rawMax - 360 : rawMax
							const rawMin = max - calcDegrees
							const min = rawMin < 0 ? 360 + rawMin : rawMin

							return {
								min,
								max,
								name
							}
						})
						
						const matchOption = createRanges.filter(x => x.min < x.max ? random >= x.min && random <= x.max : random >= x.min || random <= x.max) as { min: number, max: number, name: string }[]
						
						const randomMatch = (wheel[2] as [number, number])[1] as number
						const parseMatch = matchOption.length > 1 ? matchOption[randomMatch] : matchOption[0]

						setSelected(parseMatch.name)
						animate(scope.current, { rotate: (360 - (random + (randomMatch == 0 ? 2 : -2))) - (360) }, { type: 'spring', visualDuration: 0.2, bounce: 0.06 })
					}
				},
				'reset': () => {
					if (listName && selected && random) {
						playOk()
						setSelected(undefined)
						setReset(prev => !prev)
						setWheel([listName, selected, random])
					}
				},
				'deletedElement': () => {
					if (listName === wheel[0] && added) {
						playBack()
						const newWheel = wheel
						newWheel[1] = (wheel[1] as { name: string }[]).filter(x => !added.includes(x.name))

						setSelected(undefined)
						setReset(prev => !prev)
						
						if ((wheel[1] as []).length < 2) {
							sendJsonMessage({ type: 'clearWheel' })

							return
						}

						setWheel(newWheel)
					}
				},
				'cleared': () => {
					playBack()

					setWheel(() => [])
				}
			}

			if (success) reqTypes[type as ReqTypes]()
		}
	}, [lastJsonMessage])

	const startTurning = async (username?: string) => {
		if (calcDegrees) {
			setSpinning(true)
			setSpinned(true)
			playSpin()

			const random = (wheel[2] as [number, number])[0] as number
			
			const baseAngle = calcDegrees / 2
			const createRanges = (wheel[1] as { name: string }[]).map(({ name }, i) => {
				const rawMax = baseAngle + (calcDegrees * (i + 1))
				const max = rawMax > 360 ? rawMax - 360 : rawMax
				const rawMin = max - calcDegrees
				const min = rawMin < 0 ? 360 + rawMin : rawMin

				return {
					min,
					max,
					name
				}
			})
			
			const matchOption = createRanges.filter(x => x.min < x.max ? random >= x.min && random <= x.max : random >= x.min || random <= x.max) as { min: number, max: number, name: string }[]

			const randomMatch = (wheel[2] as [number, number])[1] as number
			const parseMatch = matchOption.length > 1 ? matchOption[randomMatch] : matchOption[0]

			await animate(scope.current, { rotate: (360 - (random + (randomMatch == 0 ? 2 : -2))) - (360 * Math.floor(Math.random() * (100 - 75) + 75)) }, { type: 'spring', visualDuration: 5, bounce: 0.06 })

			setSpinning(false)
			setTurn(false)
			setSelected(parseMatch.name)
			if (username && username == user?.username) sendJsonMessage({ type: 'endWheel' })
			playPopup()
		}
	}

	const handleReset = () => {
		sendJsonMessage({ type: 'resetWheel' })
	}

	const handleDelete = () => {
		sendJsonMessage({ type: 'deleteElement', listName: wheel[0], value: [selected] })
	}
	
	useEffect(() => {
		if (turn && !spinning) sendJsonMessage({ type: 'spinWheel' })
	}, [turn])

	useEffect(() => {
		setSelected(undefined)
	}, [wheel])

	return (
		<div className={styles.wheelWrapper}>
			<AnimatePresence>
				{wheel.length > 0 &&
					<motion.div className={styles.listName} key={wheel[0]} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
						<div className={styles.title}>
							[Selected section]
						</div>
						<div className={styles.description}>
							{wheel[0]}
						</div>
					</motion.div>
				}
			</AnimatePresence>
			<AnimatePresence mode='wait'>
				{calcDegrees !== false ?
					<>
						<div className={styles.wheelBox}>
							<motion.div ref={scope} className={styles.wheel} key={`${(wheel[1] as []).join('')}${reset}`} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}>
								{(wheel[1] as { name: string }[]).map(({ name }, i) => {
									const deg = calcDegrees * (i + 1)
									const divDeg = (calcDegrees) * (i + 1.5)
									const color = i == (wheel.length - 1) && colors[0 % colors.length] == colors[i % colors.length] ? colors[(i + 1) % colors.length] : colors[i % colors.length]
									
									return (
										<Fragment key={name}>
											<div className={styles.item} style={{ rotate: `${deg}deg`, backgroundColor: color,
											width: (wheel[1] as []).length > 2 ? `calc(2 * (50%) * tan(180deg / ${(wheel[1] as []).length}))` : '100%', clipPath: (wheel[1] as []).length > 2 ? 'polygon(0 0, 100% 0, 50% 100%, 0 0)' : 'none' }}>
												<div className={styles.name}>
													<p>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</p>
												</div>
											</div>
											<div className={styles.divider} style={{ rotate: `${divDeg}deg` }}></div>
										</Fragment>
									)
								})}
							</motion.div>
						</div>
						<div className={styles.actions}>
							<AnimatePresence initial={false} mode='popLayout'>
								{!selected &&
									<motion.button className={spinning ? styles.disabled : ''} onClick={() => { if (!spinning) { playSelect(); setTurn(true) } else { playError() } }} key='start' initial={{ opacity: 0, x: -15 }} animate={{ opacity: spinning ? 0.5 : 1, x: 0 }} exit={{ opacity: 0, x: 15 }} onMouseOver={() => !spinning && playHover()}>
										Start
									</motion.button>
								}
								{selected &&
									<motion.button key='reset' initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} onClick={handleReset} onMouseOver={() => playHover()}>
										Reset
									</motion.button>
								}
								{selected &&
									<motion.button key='delete' initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} onClick={handleDelete} onMouseOver={() => playHover()}>
										Remove
									</motion.button>
								}
							</AnimatePresence>
						</div>
						<div className={styles.selectedWrapper}>
							<AnimatePresence>
								{selected &&
									<motion.div className={styles.selected} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}>
										<div className={styles.title}>
											[Selected option]
										</div>
										<div className={styles.description}>
											{selected}
										</div>
									</motion.div>
								}
							</AnimatePresence>
						</div>
					</>
				:
					<Spinner />
				}
			</AnimatePresence>
		</div>
	)
}

export default Wheel