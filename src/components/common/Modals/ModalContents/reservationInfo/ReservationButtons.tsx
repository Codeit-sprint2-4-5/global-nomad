// import styles from './Reservaiton.module.scss';
// import classNames from 'classnames/bind';
// import { ReservationSchedule } from './ReservationInfo';

// const cn = classNames.bind(styles);

// interface Props {
//   selected: 'declined' | 'confirmed' | 'pending';
//   reservationStatuses: ReservationSchedule;
// }

// export default function ReservationButtons({ selected, reservationStatuses, handleButtonClick }: Props) {
//   return (
//     <ul className={cn('reservation-status')}>
//       {['pending', 'confirmed', 'declined'].map((status) => (
//         <button
//           key={status}
//           onClick={() => handleButtonClick(status)}
//           className={cn('reservation-status-item', { selected: selected === status })}
//         >
//           {status} {reservationStatuses[status]}
//         </button>
//       ))}
//     </ul>
//   );
// }
