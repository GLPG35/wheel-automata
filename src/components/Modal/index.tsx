import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import hover from '../../assets/core_16.opus'
import popup from '../../assets/core_1.opus'
import useSound from 'use-sound'
import { useEffect } from 'react'
import { useListStore } from '../../store/listStore'

type Props = {
	title: string,
	text: string,
	close: () => void,
	action: () => void
}

const Modal = ({ title, text, close, action }: Props) => {
	const sfxVolume = useListStore(state => state.sfxVolume)
	const sfxMute = useListStore(state => state.sfxMute)
	const [playHover] = useSound(hover, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playPopup] = useSound(popup, { volume: sfxMute ? 0 : sfxVolume / 100 })

	useEffect(() => {
		playPopup()
	})
	
	return (
		<motion.div className={styles.modal} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} onClick={e => e.stopPropagation()}>
			<div className={styles.title}>
				{title}
			</div>
			<div className={styles.description}>
				<p>{text}</p>
			</div>
			<div className={styles.buttons}>
				<button onClick={close} onMouseOver={() => playHover()}>No</button>
				<button onClick={action} onMouseOver={() => playHover()}>Yes</button>
			</div>
		</motion.div>
	)
}

export default Modal