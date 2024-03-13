import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Buttons.module.scss';

const cn = classNames.bind(styles);

interface IconButtonProps {
  svg: string;
  size: string;
  alt: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function IconButton({ svg, size, alt, type = 'button', ...props }: IconButtonProps) {
  return (
    <button type={type} className={cn('ic-btn', `ic-btn-${size}`)} {...props}>
      <div className={cn(`ic-box`)}>
        <Image src={svg} alt={alt} className={cn('ic-fit')} />
      </div>
    </button>
  );
}
