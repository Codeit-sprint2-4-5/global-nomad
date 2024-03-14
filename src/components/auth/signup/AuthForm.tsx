import classNames from 'classnames/bind';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import FormHeader from '@/components/auth/formHeader/FormHeader';
import Input from '@/components/common/Input/Input';
import BaseButton from '@/components/common/button/BaseButton';
import { USER_INPUT_VALIDATION } from '@/constants';
import { FormValues } from '@/types/auth';
import style from '@/components/auth/signup/AuthForm.module.scss';

const cn = classNames.bind(style);

const { email, nickname, password, passwordConfirm } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
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
  onSignupSubmit: SubmitHandler<FormValues>;
}

export default function AuthForm({ onSignupSubmit }: AuthFormProps) {
  const { formState, register, handleSubmit, getValues, setError } = useForm<FormValues>({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSignupSubmit({ email: data.email, nickname: data.nickname, password: data.password });
  };

  return (
    <div className={cn('signup')}>
      <fieldset>
        <legend className='hidden'>Global Nomad 회원가입</legend>
        <FormHeader />
        <form className={cn('signup-form')} onSubmit={handleSubmit(onSubmit)}>
          <label className={cn('signup-label')}>
            <span className={cn('signup-label-text')}>이메일</span>
            <Input
              register={register('email', rules.emailRules)}
              name='email'
              type='email'
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              maxLength={30}
            />
          </label>
          <label className={cn('signup-label')}>
            <span className={cn('signup-label-text')}>닉네임</span>
            <Input
              register={register('nickname', rules.nicknameRules)}
              name='nickname'
              type='text'
              isError={!!errors.nickname}
              errorMessage={errors.nickname?.message}
              maxLength={12}
            />
          </label>
          <label className={cn('signup-label')}>
            <span className={cn('signup-label-text')}>비밀번호</span>
            <Input
              register={register('password', rules.passwordRules)}
              name='password'
              type='password'
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              maxLength={15}
            />
          </label>
          <label className={cn('signup-label')}>
            <span className={cn('signup-label-text')}>비밀번호 확인</span>
            <Input
              register={register('passwordConfirm', {
                validate: {
                  notMatch: (value) => {
                    const { password } = getValues();
                    return password === value || passwordConfirm?.errorMessage.confirm;
                  },
                },
              })}
              name='passwordConfirm'
              type='password'
              isError={!!errors.passwordConfirm}
              errorMessage={errors.passwordConfirm?.message}
              maxLength={15}
            />
          </label>
          <BaseButton size='lg' text='회원가입 하기' type='submit' variant={'primary'} disabled={!isValid} />
        </form>
        <div className={cn('signup-link')}>
          <span className={cn('signup-link-text')}>
            회원이신가요?
            <Link className={cn('signup-link-text-link')} href={'/signin'}>
              로그인하기
            </Link>
          </span>
        </div>
      </fieldset>
    </div>
  );
}
