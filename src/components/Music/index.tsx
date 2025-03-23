import { useEffect, useState } from 'react'
import { useListStore } from '../../store/listStore'
import SubMusic from './sub'

const Music = () => {
	const musicMute = useListStore(state => state.musicMute)
	const bgm = useListStore(state => state.bgm)
	const bgmVariant = useListStore(state => state.bgmVariant)
	const [firstUnmute, setFirstUnmute] = useState(false)
	const [toggle, setToggle] = useState(false)
	
	useEffect(() => {
		if (!musicMute && !firstUnmute) {
			setFirstUnmute(true)
		}
	}, [musicMute])

	useEffect(() => {
		setToggle(prev => !prev)
	}, [bgm, bgmVariant])
	
	return <>{firstUnmute && <SubMusic render={toggle} />}</>
}

export default Music