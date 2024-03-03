import styles from './Buttons.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface BaseButtonProps {
  size: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  border?: string;
}

const BaseButton = ({
  size,
  variant = 'primary',
  type = 'button',
  text = 'Button',
  border = 'br6',
  ...props
}: BaseButtonProps) => {
  return (
    <button className={cn(`btn-${variant}`, `btn-${size}`, `${border}`)} type={type} {...props}>
      <span>{text}</span>
    </button>
  );
};

export default BaseButton;
