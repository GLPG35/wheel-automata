import styles from './styles.module.scss'
import List from './components/List'
import Wheel from './components/Wheel'
import { useEffect } from 'react'
import Login from './components/Login'
import { useListStore } from './store/listStore'
import Spinner from './components/Spinner'
import Users from './components/Users'

const App = () => {
	const user = useListStore(state => state.user)
	const setUser = useListStore(state => state.setUser)
	
	useEffect(() => {
		if (!user) {
			fetch(`${import.meta.env.VITE_BACK_URL}/auth`, {
				credentials: 'include'
			}).then(res => {
				if (res.ok) {
					return res.json()
				}

				return res.json()
				.then(res => {
					throw new Error(res.message)
				})
			}).then(res => {
				setUser(res.data)
			}).catch(() => {
				setUser(null)
			})
		}
	}, [user])

	return (
		<div className={styles.app}>
			{user === undefined ?
				<Spinner />
			: user === null ?
				<Login />
			:
				<>
					<Users />
					<List />
					<Wheel />
				</>
			}
		</div>
	)
}

export default App