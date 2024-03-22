import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { auth } from '@/apis/auth';
import Title from '../../../common/title/Title';
import Input from '../../../common/Input/Input';
import { GetUserData, ProfileFormValues } from '@/types/auth';
import { USER_INPUT_VALIDATION } from '@/constants';
import BaseButton from '../../../common/button/BaseButton';
import style from './AccountForm.module.scss';

const cn = classNames.bind(style);

const { nickname, password, passwordConfirm } = USER_INPUT_VALIDATION;

const rules = {
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
    },
  },
  passwordRules: {
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
  },
};

interface AccountForm {
  onProfileSubmit: (data: ProfileFormValues, reset: () => void) => void;
}

export default function AccountForm({ onProfileSubmit }: AccountForm) {
  const { data: userData, isLoading }: UseQueryResult<GetUserData> = useQuery({ queryKey: ['myInfo'] });

  const { formState, register, handleSubmit, getValues, setValue, reset } = useForm<ProfileFormValues>({
    mode: 'onBlur',
  });
  const { errors, isDirty } = formState;

  const onSubmit = (data: ProfileFormValues) => {
    const formdata = { nickname: data.nickname, newPassword: data.password };
    onProfileSubmit(formdata, reset);
  };

  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.nickname);
      setValue('email', userData.email);
    }
  }, [userData, setValue]);

  if (isLoading) return <div>loading...z</div>;
  return (
    <div className={cn('form-field')}>
      <fieldset>
        <legend>Mypage - 내정보 수정</legend>
        <div className={cn('form-field-title')}>
          <Title text='내정보' />
          <BaseButton
            form='accountForm'
            size='md'
            type='submit'
            variant='primary'
            text='저장하기'
            disabled={!isDirty}
          />
        </div>
        <form className={cn('form')} id='accountForm' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={'nickname'} className={cn('form-label')}>
            닉네임
          </label>
          <Input
            {...register('nickname', rules.nicknameRules)}
            id={'nickname'}
            name={'nickname'}
            type={'text'}
            isError={!!errors.nickname}
            errorMessage={errors.nickname?.message}
            maxLength={10}
            placeholder={'2글자 이상 10글자 이하 닉네임을 입력해 주세요.'}
          />
          <label htmlFor={'email'} className={cn('form-label')}>
            이메일
          </label>
          <Input {...register('email')} readOnly id={'email'} name={'email'} type={'email'} />
          <label htmlFor='password' className={cn('form-label')}>
            비밀번호
          </label>
          <Input
            {...register('password', rules.passwordRules)}
            id='password'
            name={'password'}
            type={'password'}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
            required={false}
            placeholder={'8자 이상 입력해 주세요'}
            autoComplete={'off'}
          />
          <label htmlFor={'passwordConfirm'} className={cn('form-label')}>
            비밀번호 재입력
          </label>
          <Input
            {...register('passwordConfirm', {
              validate: {
                notMatch: (value) => {
                  const { password } = getValues();
                  return password === value || passwordConfirm?.errorMessage.confirm;
                },
              },
            })}
            id={'passwordConfirm'}
            name={'passwordConfirm'}
            type={'password'}
            isError={!!errors.passwordConfirm}
            errorMessage={errors.passwordConfirm?.message}
            placeholder={'비밀번호를 한번 더 입력해 주세요'}
            autoComplete={'off'}
          />
        </form>
      </fieldset>
    </div>
  );
}
