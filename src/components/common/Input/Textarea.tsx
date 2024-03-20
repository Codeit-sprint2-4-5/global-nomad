import classNames from 'classnames/bind';
import style from '@/components/common/Input/inputField.module.scss';
import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from 'react';

const cn = classNames.bind(style);

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  isError?: boolean;
  errorMessage?: string;
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { isError, errorMessage, ...props },
  ref
) {
  return (
    <>
      <div className={cn('textarea-field')}>
        <textarea {...props} ref={ref} className={cn('textarea', { error: isError })} />
      </div>
      {isError && <p className={cn('error')}>{errorMessage}</p>}
    </>
  );
});
