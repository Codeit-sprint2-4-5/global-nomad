import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Buttons.module.scss';

const cn = classNames.bind(styles);

interface MixButtonProps {
  svg: string;
  alt: string;
  reverse: boolean;
  iconSize: string;
  type: 'button' | 'reset' | 'submit';
  text: string;
  fontSize: string;
}

export default function MixButton({
  svg,
  alt,
  reverse,
  iconSize = '24',
  type = 'button',
  text = '',
  fontSize = '18',
  ...props
}: MixButtonProps) {
  return (
    <div className={cn('mix')}>
      <button type={type} className={cn('mix-btn')} {...props}>
        {reverse && <span className={cn(`mix-text-${fontSize}`)}>{text}</span>}
        <div className={cn(`mix-box-${iconSize}`)}>
          <Image src={svg} alt={alt} className={cn('ic-fit')} />
        </div>
        {!reverse && <span className={cn(`mix-text-${fontSize}`)}>{text}</span>}
      </button>
    </div>
  );
}
