import { Children, ReactNode } from 'react';
import styles from './ReservationTag.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface ReservationProps {
  state: '승인' | '거절';
}

const ReservationTag = ({ state }: ReservationProps) => {
  return <div className={cn('tag', { rejected: state === '거절' })}>예약 {state}</div>;
};

export default ReservationTag;
