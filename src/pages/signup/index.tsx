import AuthForm from '@/components/domain/auth/signup/AuthForm';
import { useMutation } from '@tanstack/react-query';
import { FormValues } from '@/types/auth';
import { SubmitHandler } from 'react-hook-form';
import { auth } from '@/apis/auth';
import { useRef, useState } from 'react';
import { AxiosError } from 'axios';
import Router from 'next/router';
import Confirm from '@/components/common/popup/confirm/Confirm';

interface ErrorMessage {
  message: string;
}

export default function Signup() {
  const [popupError, setPopupError] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpenPopup = (message: string | undefined, onClose?: () => void) => {
    if (!dialogRef.current || !message) return;
    setPopupError(message);
    dialogRef.current.showModal();

    if (!onClose) return;
    dialogRef.current.onclose = onClose;
  };

  const signupMutation = useMutation({
    mutationFn: (data: FormValues) => auth.signup(data),
    mutationKey: ['signup'],
    onSuccess: () => {
      handleOpenPopup('가입이 완료되었습니다!', () => {
        Router.push('/signin');
      });
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      if (error.response && error.response.status >= 400) {
        handleOpenPopup(error.response.data?.message);
        return;
      }
      console.error('MutationError', error);
    },
  });

  const onSignupSubmit: SubmitHandler<FormValues> = (data) => {
    signupMutation.mutate(data);
  };

  if (signupMutation.isPending) {
    <div>Loading...</div>;
  }

  return (
    <>
      <AuthForm onSignupSubmit={onSignupSubmit} />
      <Confirm dialogRef={dialogRef} text={popupError} />
    </>
  );
}
