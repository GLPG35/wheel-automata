import { useListStore } from '../../store/listStore'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import useSound from 'use-sound'
import writing from '../../assets/core_21.opus'
import success from '../../assets/core_64.opus'
import hover from '../../assets/core_16.opus'
import select from '../../assets/Click.opus'
import { useEffect, useState } from 'react'

const Login = () => {
	const setUser = useListStore(state => state.setUser)
	const sfxVolume = useListStore(state => state.sfxVolume)
	const sfxMute = useListStore(state => state.sfxMute)
	const [playWriting] = useSound(writing, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSuccess] = useSound(success, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playHover] = useSound(hover, { volume: sfxMute ? 0 : sfxVolume / 100 })
	const [playSelect] = useSound(select, { volume: sfxMute ? 0 : (sfxVolume * 0.5) / 100 })
	const [error, setError] = useState<string>()
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const { username, hash } = e.currentTarget
		
		fetch(`${import.meta.env.VITE_BACK_URL}/auth`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				username: username.value,
				hash: hash.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors'
		}).then(res => {
			if (res.ok) {
				return res.json()
			}

			return res.json()
			.then(res => {
				throw new Error(res.message)
			})
		}).then(res => {
			const { data } = res

			playSuccess()
			setUser(data)
		}).catch(err => {
			setError(err.message)
		})
	}
	
	const handleInput = () => {
		playWriting()
	}

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(undefined)
			}, 3000)
		}
	}, [error])
	
	return (
		<div className={styles.login}>
			<motion.div className={styles.logo} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 5 } }}>
				<img src="/yorha.webp" alt="" />
			</motion.div>
			<motion.form autoComplete='off' onSubmit={handleSubmit} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}>
				<div className={styles.title}>
					[Provide your credentials]
				</div>
				<div className={styles.fields}>
					<input type="text" name='username' placeholder='[username]' onInput={handleInput} onFocus={() => playSelect()} />
					<input type="password" name='hash' placeholder='[hash]' onInput={handleInput} onFocus={() => playSelect()} />
					<button type='submit' onMouseOver={() => playHover()} onClick={() => playSelect()}>
						Enter
					</button>
				</div>
				<AnimatePresence>
					{error &&
						<motion.div className={styles.error} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}>
							<div className={styles.title}>
								[Error]
							</div>
							<div className={styles.description}>
								{error}
							</div>
						</motion.div>
					}
				</AnimatePresence>
			</motion.form>
		</div>
	)
}

export default Login