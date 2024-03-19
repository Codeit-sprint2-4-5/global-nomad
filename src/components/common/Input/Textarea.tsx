import classNames from 'classnames/bind';
import style from '@/components/common/Input/inputField.module.scss';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

const cn = classNames.bind(style);

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string;
  isError?: boolean;
  errorMessage?: string;
}

export default function Textarea({ name, isError, errorMessage, ...props }: TextareaProps) {
  return (
    <>
      <div className={cn('textarea-field')}>
        <textarea {...props} name={name} className={cn('textarea', { error: isError })} />
      </div>
      {isError && <p className={cn('error')}>{errorMessage}</p>}
    </>
  );
}
