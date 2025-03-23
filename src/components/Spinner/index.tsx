import { PiSpinnerGapBold } from 'react-icons/pi'
import styles from './styles.module.scss'

const Spinner = () => {
	return (
		<div className={styles.spinner}>
			<div className={styles.icon}>
				<PiSpinnerGapBold />
			</div>
		</div>
	)
}

export default Spinner