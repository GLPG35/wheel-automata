import useSound from 'use-sound'
import { bgmList, useListStore } from '../../store/listStore'
import { memo, useEffect, useState } from 'react'
import silence from '../../assets/silence.opus'

const SubMusic = memo(({ render }: { render: boolean }) => {
	const bgm = useListStore(state => state.bgm)
	const bgmName = useListStore(state => state.bgmName)
	const musicMute = useListStore(state => state.musicMute)
	const bgmVolume = useListStore(state => state.bgmVolume)
	const bgmPreferences = useListStore(state => state.bgmPreferences)
	const addLoadedPreference = useListStore(state => state.addLoadedPreference)
	const vccVolume = useListStore(state => state.vccVolume)
	const [bgmLoaded, setBgmLoaded] = useState(false)
	const [vccLoaded, setVccLoaded] = useState(false)
	const [playBgm, { sound, stop: stopBgm }] = useSound(bgm.bgm[bgmPreferences[bgmName].variant].path[0], { volume: musicMute ? 0 : bgmVolume / 100, onload: () => {
		if (!bgmPreferences[bgmName].loaded.bgm[bgmPreferences[bgmName].variant]) {
			setBgmLoaded(true)
			addLoadedPreference(bgmName as keyof typeof bgmList, bgmPreferences[bgmName].variant)
		}
	} })
	const [playBgm2, { sound: sound2, stop: stopBgm2 }] = useSound(bgm.bgm[bgmPreferences[bgmName].variant].path[1], { volume: musicMute ? 0 : bgmVolume / 100 })
	const [playVcc, { sound: sound3, stop: stopVcc }] = useSound(bgm.bgm[bgmPreferences[bgmName].variant].voiced ? bgm.vcc[0].path[0] : silence, { volume: musicMute ? 0 : vccVolume / 100, onload: () => {
		if (!bgmPreferences[bgmName].loaded.vcc) {
			setVccLoaded(true)
			addLoadedPreference(bgmName as keyof typeof bgmList)
		}
	} })
	const [playVcc2, { sound: sound4, stop: stopVcc2 }] = useSound(bgm.bgm[bgmPreferences[bgmName].variant].voiced ? bgm.vcc[0].path[1] : silence, { volume: musicMute ? 0 : bgmVolume / 100 })
	
	useEffect(() => {
		if (bgmPreferences[bgmName].loaded.bgm[bgmPreferences[bgmName].variant]) {
			setBgmLoaded(true)
		}

		if (bgmPreferences[bgmName].loaded.vcc || !bgm.bgm[bgmPreferences[bgmName].variant].voiced) {
			setVccLoaded(true)
		}
	}, [render, bgmLoaded, vccLoaded])

	useEffect(() => {
		if (bgmLoaded && vccLoaded) {	
			playBgm()
			playVcc()
		}
	}, [bgmLoaded, vccLoaded])
	
	useEffect(() => {
		if (sound) {
			sound.on('end', () => {
				playBgm2()
				playVcc2()
			})

			sound.on('stop', () => {
				setBgmLoaded(false)
				setVccLoaded(false)
			})
		}
		
		return () => {
			if (sound) {
				stopBgm()
				sound.off('end')
			}

			if (sound3) {
				stopVcc()
				stopVcc()
			}
		}
	}, [sound])

	useEffect(() => {
		if (sound2) {
			sound2.on('end', () => {
				playBgm2()
				playVcc2()
			})

			sound2.on('stop', () => {
				setBgmLoaded(false)
				setVccLoaded(false)
			})
		}

		return () => {	
			if (sound2) {
				stopBgm2()
				sound2.off('end')
			}

			if (sound4) {
				stopVcc2()
				stopVcc2()
			}
		}
	}, [sound2])

	return <></>
})

export default SubMusic