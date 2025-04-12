import useSound from 'use-sound'
import { bgmList, useListStore } from '../../store/listStore'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import call from '../../assets/core_66.opus'
import leave from '../../assets/core_32.opus'
import hover from '../../assets/core_16.opus'
import select from '../../assets/Click.opus'
import popup from '../../assets/core_1.opus'
import back from '../../assets/core_75.opus'
import deselect from '../../assets/core_18.opus'
import { useEffect, useRef, useState } from 'react'
import User from '../User'
import { PiCaretLeftBold, PiWaveformBold, PiWaveformSlashBold } from 'react-icons/pi'
import Music from '../Music'

const Users = () => {
	const users = useListStore(state => state.users)
	const bgm = useListStore(state => state.bgm)
	const bgmPreferences = useListStore(state => state.bgmPreferences)
	const bgmVolume = useListStore(state => state.bgmVolume)
	const vccVolume = useListStore(state => state.vccVolume)
	const sfxVolume = useListStore(state => state.sfxVolume)
	const musicMute = useListStore(state => state.musicMute)
	const sfxMute = useListStore(state => state.sfxMute)
	const setMusicMute = useListStore(state => state.setMusicMute)
	const setSfxMute = useListStore(state => state.setSfxMute)
	const setBgmVolume = useListStore(state => state.setBgmVolume)
	const setVccVolume = useListStore(state => state.setVccVolume)
	const setSfxVolume = useListStore(state => state.setSfxVolume)
	const setBgm = useListStore(state => state.setBgm)
	const setBgmVariant = useListStore(state => state.setBgmVariant)
	const [lastQtty, setLastQtty] = useState(users.length)
	const [controls, setControls] = useState(false)
	const [selectedOp, setSelectedOp] = useState<{ index: number, handler: (type: 'left' | 'right') => void }>()
	const controlsRef = useRef<HTMLDivElement>(null)
	const [viewTracks, setViewTracks] = useState(false)
	const [backOption, setBackOption] = useState<'tracks'|'variants'|null>(null) 
	const [track, setTrack] = useState<keyof typeof bgmList | undefined>(undefined)
	const [playCall] = useSound(call, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playLeave] = useSound(leave, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playHover] = useSound(hover, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playPopup] = useSound(popup, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playBack] = useSound(back, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSelect] = useSound(select, { volume: sfxMute ? 0 : (sfxVolume * 0.5) / 100 })
	const [playDeselect] = useSound(deselect, { volume: sfxMute ? 0 : sfxVolume / 100 })
	
	useEffect(() => {
		if (lastQtty < users.length) {
			playCall()
		} else if (lastQtty > users.length) {
			playLeave()
		}

		setLastQtty(users.length)
	}, [users])

	const iconMusic = () => {
		return !musicMute ? <PiWaveformBold /> : <PiWaveformSlashBold />
	}

	const options = [
		{
			name: 'Music',
			value: musicMute,
			type: 'boolean',
			handler: setMusicMute
		},
		{
			name: 'Sound Effects',
			value: sfxMute,
			type: 'boolean',
			handler: setSfxMute
		},
		{
			name: 'Music Volume',
			value: bgmVolume,
			type: 'number',
			handler: setBgmVolume
		},
		{
			name: 'Voice Volume',
			value: vccVolume,
			type: 'number',
			handler: setVccVolume
		},
		{
			name: 'Sound Effect Volume',
			value: sfxVolume,
			type: 'number',
			handler: setSfxVolume
		}
	]

	useEffect(() => {
		if (controls) { playPopup() }
		else {
			playBack()
			setSelectedOp(undefined)
			setViewTracks(false)
			setTrack(undefined)
			setBackOption(null)
		}
	}, [controls])

	const controlOptions = (e: KeyboardEvent) => {
		const { key } = e
		const left = ['ArrowLeft', 'ArrowDown']
		const right = ['ArrowRight', 'ArrowUp']

		if (!selectedOp) return

		if (left.includes(key)) {
			selectedOp.handler('left')
			playHover()
		} else if (right.includes(key)) {
			selectedOp.handler('right')
			playHover()
		}
	}

	const clickOutside = (e: MouseEvent) => {
		if (controlsRef.current && !controlsRef.current.contains(e.target as Node)) {
			if (selectedOp) {
				setSelectedOp(undefined)
				setBackOption(null)
				playDeselect()
			}
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', controlOptions)
		document.addEventListener('mousedown', clickOutside)

		return () => {
			document.removeEventListener('keydown', controlOptions)
			document.removeEventListener('mousedown', clickOutside)
		}
	})

	const handleViewTracks = () => {
		playSelect()
		setViewTracks(true)
		setBackOption('tracks')
		setSelectedOp(undefined)
	}

	const backTracks = () => {
		playBack()
		setBackOption(null)
		setViewTracks(false)
	}

	const backVariants = () => {
		playBack()
		setBackOption('tracks')
		setTrack(undefined)
	}
	
	return (
		<div className={styles.users}>
			<Music />
			<AnimatePresence>
				{users.map(({ username, pic }) => <User key={username} {...{username, pic}} />)}
			</AnimatePresence>
			<div className={styles.controls}>
				<AnimatePresence>
					{controls && !viewTracks && !track ?
						<motion.div className={styles.settings} exit={{ x: 15, opacity: 0 }} ref={controlsRef}>
							<div className={styles.options}>
								{options.map(({ name, value, type, handler }, i) => {
									const delay = i > (options.length - 1) ? 0 : i == 0 ? 0 : i / 10
									const length = typeof value == 'number' ? value / 10 : undefined

									const handleClick = () => {
										playSelect()
										
										if (type == 'boolean') {
											(handler as (value: boolean) => void)(!value)
											setSelectedOp(undefined)
										} else {
											if (i == selectedOp?.index) {
												setSelectedOp(undefined)
											} else {
												setSelectedOp({ index: i, handler: handler as (type: 'left' | 'right') => void })
											}
										}
									}
									
									return (
										<motion.div className={`${styles.option} ${selectedOp?.index == i ? styles.active : ''}`} onClick={handleClick} onMouseOver={() => playHover()} initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay } }} key={name}>
											<div className={styles.description}>
												{name}
											</div>
											{type == 'number' ?
												<div className={styles.bar}>
													{Array(10).fill(0).map((_x, ix) => {
														const active = ix < (length as number)
														
														return (
															<motion.div className={styles.line} animate={{ height: selectedOp?.index == i && ix == (length as number - 1) ? '1.2em' : active ? '0.7em' : '3px' }} key={ix}>
															</motion.div>
														)
													})}
												</div>
											:
												<div className={styles.switch}>
													{value ? 'Off' : 'On'}
												</div>
											}
										</motion.div>
									)
								})}
								<motion.div className={styles.option} onClick={handleViewTracks} onMouseOver={() => playHover()} initial={{ x: 15, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: (options.length - 1) / 10 } }} key={'track'}>
									<div className={styles.description}>
										Select Track
									</div>
									<div className={styles.trackName}>
										<span>[</span>
										<div className={styles.name}>
											{bgm.name}
										</div>
										<span>]</span>
									</div>
								</motion.div>
							</div>
						</motion.div>
					: controls && viewTracks && !track ?
						<motion.div className={styles.tracks} key='tr' animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
							<motion.div className={styles.back} key='t' initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} onClick={() => backOption == 'tracks' ? backTracks() : backOption == 'variants' && backVariants()}>
								<div className={styles.icon}>
									<PiCaretLeftBold />
								</div>
								Back
							</motion.div>
							<motion.div className={styles.options} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}>
								{Object.entries(bgmList).map(([title, value]) => {
									const { name, bgm } = value

									const handleClick = () => {
										playSelect()
										setBgm(title as keyof typeof bgmList)
										setBackOption('variants')
										setTrack(title as keyof typeof bgmList)
									}
									
									return (
										<motion.div className={styles.option} onClick={handleClick} onMouseOver={() => playHover()} key={name}>
											<div className={styles.description}>
												{name}
											</div>
											<div className={styles.qtty}>
												[{bgm.length}]
											</div>
										</motion.div>
									)
								})}
							</motion.div>
						</motion.div>
					: controls && viewTracks && track &&
						<motion.div className={styles.trackDetails} key='trd'>
							<motion.div className={styles.back} key='td' animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} onClick={() => backOption == 'tracks' ? backTracks() : backOption == 'variants' && backVariants()}>
								<div className={styles.icon}>
									<PiCaretLeftBold />
								</div>
								Back
							</motion.div>
							<motion.div className={styles.options} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
								{bgmList[track].bgm.map(({ name, voiced }, i) => {
									const isActive = i == bgmPreferences[track].variant
									
									const handleClick = () => {
										playSelect()
										setBgmVariant(i)
									}
									
									return (
										<div className={`${styles.option} ${isActive ? styles.active : ''}`} key={name} onClick={handleClick} onMouseOver={() => playHover()}>
											<div className={styles.description}>
												{name}
											</div>
											<div className={styles.voiced}>
												{voiced && '[Voiced]'}
											</div>
										</div>
									)
								})}
							</motion.div>
						</motion.div>
					}
				</AnimatePresence>
				<button onClick={() => setControls(prev => !prev)} onMouseOver={() => playHover()}>
					<div className={styles.icon}>
						{iconMusic()}
					</div>
				</button>
			</div>
		</div>
	)
}

export default Users