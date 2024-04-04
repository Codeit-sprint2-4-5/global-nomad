import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useToggleButton } from '@/hooks';
import { USER_PASSWORD_SHOW } from '@/constants';
import style from '@/components/common/Input/InputField.module.scss';

const cn = classNames.bind(style);

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'number' | 'time';
  isError?: boolean;
  errorMessage?: string;
}
export default forwardRef<HTMLInputElement, InputProps>(function Input({ type, isError, errorMessage, ...props }, ref) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const { src, alt, inputType } = isToggle ? USER_PASSWORD_SHOW.on : USER_PASSWORD_SHOW.off;

  return (
    <>
      <div className={cn('input-field')}>
        <input
          {...props}
          ref={ref}
          type={type === 'password' ? inputType : type}
          className={cn('input', { error: isError })}
        />
        {type === 'password' && (
          <button type='button' onClick={handleToggleClick} className={cn('btn-password-show')}>
            <Image src={src} alt={alt} width={24} height={24} />
          </button>
        )}
      </div>
      {isError && <p className={cn('error')}>{errorMessage}</p>}
    </>
  );
});
