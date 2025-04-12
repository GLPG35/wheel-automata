import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import hoverSound from '../../assets/core_16.opus'
import useSound from 'use-sound'
import { useListStore } from '../../store/listStore'

const User = ({ username, pic }: { username: string, pic: number }) => {
	const [hover, setHover] = useState(true)
	const sfxVolume = useListStore(state => state.sfxVolume)
	const sfxMute = useListStore(state => state.sfxMute)
	const [playHover] = useSound(hoverSound, { volume: sfxMute ? 0 : sfxVolume / 100 })
	
	const pics = 12
	const choosePic = Math.floor(pic * pics) + 1

	useEffect(() => {
		setTimeout(() => {
			setHover(false)
		}, 2000)
	}, [])
	
	return (
		<motion.div className={styles.user} key={username+pic} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} layout onMouseEnter={() => { playHover(); setHover(true) }} onMouseLeave={() => setHover(false)}>
				<motion.div className={styles.pic} layout>
					<img src={`${choosePic}.webp`} alt="" />
				</motion.div>
				<AnimatePresence mode='popLayout'>
					{hover &&
						<motion.div className={styles.username} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
							{username}
						</motion.div>
					}
				</AnimatePresence>
		</motion.div>
	)
}

export default User