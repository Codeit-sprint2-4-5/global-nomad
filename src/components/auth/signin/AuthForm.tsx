import classNames from 'classnames/bind';
import style from '@/components/auth/signin/AuthForm.module.scss';
import FormHeader from '../formHeader/FormHeader';
import Input from '@/components/common/Input/Input';
import BaseButton from '@/components/common/button/BaseButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { USER_INPUT_VALIDATION } from '@/constants';
import { FormValues } from '@/types/auth';
import Link from 'next/link';

const cn = classNames.bind(style);

const { email, password } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  passwordRules: {
    required: password.errorMessage.empty,
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
    minLength: {
      value: 8,
      message: password.errorMessage.minLength,
    },
  },
};

interface AuthFormProps {
  onSigninSubmit: SubmitHandler<FormValues>;
}

export default function AuthForm({ onSigninSubmit: handleSigninSubmit }: AuthFormProps) {
  const { formState, register, handleSubmit } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const { errors, isValid } = formState;
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSigninSubmit({ email: data.email, password: data.password });
  };

  return (
    <div className={cn('signin')}>
      <fieldset>
        <legend className='hidden'>Global Nomad 로그인</legend>
        <FormHeader />
        <form className={cn('signin-form')} onSubmit={handleSubmit(onSubmit)}>
          <label className={cn('signin-label')}>
            <span className={cn('signin-label-text')}>이메일</span>
            <Input
              register={register('email', rules.emailRules)}
              name='email'
              type='email'
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              maxLength={30}
            />
          </label>
          <label className={cn('signin-label')}>
            <span className={cn('signin-label-text')}>비밀번호</span>
            <Input
              register={register('password', rules.passwordRules)}
              name='password'
              type='password'
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              maxLength={15}
            />
          </label>
          <BaseButton size='lg' text='로그인 하기' type='submit' variant={'primary'} disabled={!isValid} />
        </form>
        <div className={cn('signin-link')}>
          <span className={cn('signin-link-text')}>
            회원이 아니신가요?
            <Link className={cn('signin-link-text-link')} href={'/signup'}>
              회원가입하기
            </Link>
          </span>
        </div>
      </fieldset>
    </div>
  );
}
