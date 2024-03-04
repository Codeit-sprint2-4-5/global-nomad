import classNames from 'classnames/bind';
import styles from './Chips.module.scss';

const cn = classNames.bind(styles);

interface ChipsProps {
	status: 'confirmed' | 'complete' | 'reservation' | 'seat';
	count?: number;
}

function Chips({ status, count = 0 }: ChipsProps) {
	const statusObject = {
		confirmed: '확정',
		complete: '완료',
		reservation: '예약',
		seat: '잔여',
	};

	return (
		<div className={cn(`chips-${status}`, 'chips')}>
			<span>{statusObject[status]}</span>
			<span>{count}</span>
		</div>
	);
}

export default Chips;
