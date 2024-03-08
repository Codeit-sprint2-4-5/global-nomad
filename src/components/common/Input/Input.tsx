import { ChangeEventHandler, FocusEventHandler } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useToggleButton } from '@/hooks';
import { USER_PASSWORD_SHOW } from '@/constants';
import style from '@/components/common/Input/inputField.module.scss';

const cn = classNames.bind(style);

interface InputProps {
  name: string;
  type: string;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function Input({ name, type, isError, errorMessage, className, ...props }: InputProps) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const { src, alt, inputType } = isToggle ? USER_PASSWORD_SHOW.on : USER_PASSWORD_SHOW.off;

  return (
    <>
      <div className={cn(type === 'textarea' ? 'textarea-field' : 'input-field')}>
        {type === 'textarea' ? (
          <textarea name={name} className={cn('textarea')} {...props} />
        ) : (
          <>
            <input
              name={name}
              type={type === 'password' ? inputType : type}
              className={cn('input', { error: isError }, className)}
              {...props}
            />
            {type === 'password' && (
              <button type='button' onClick={handleToggleClick} className={cn('btn-password-show')}>
                <Image src={src} alt={alt} width={24} height={24} />
              </button>
            )}
          </>
        )}
      </div>
      {isError && <p className={cn('error')}>{errorMessage}</p>}
    </>
  );
}
