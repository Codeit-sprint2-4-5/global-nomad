import classNames from 'classnames/bind';
import styles from './Title.module.scss';

const cn = classNames.bind(styles);

export default function Title({ text }: { text: string }) {
  return <h2 className={cn('title')}>{text}</h2>;
}
