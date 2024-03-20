import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/apis/auth';
import { ProfileFormValues } from '@/types/auth';
import Confirm from '@/components/common/popup/confirm/Confirm';
import AccountForm from '@/components/account/form/AccountForm';
import Question from '@/components/common/popup/question/Question';

export default function Account() {
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [questionMessage, setQuestionMessage] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const questionRef = useRef<HTMLDialogElement | null>(null);
  const answerRef = useRef<boolean>(false);

  const handleOpenPopup = (message: string) => {
    if (!dialogRef.current) return;

    setPopupMessage(message);
    dialogRef.current.showModal();
  };

  const handleQuestionPopupOpen = (message: string, confirm: () => void) => {
    if (!questionRef.current) return;

    setQuestionMessage(message);
    questionRef.current.showModal();
    questionRef.current.onclose = () => {
      if (!answerRef.current) {
        handleOpenPopup('취소 되었습니다.');
        return;
      }
      confirm();
      answerRef.current = false;
    };
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['userPatch'],
    mutationFn: (patchData: ProfileFormValues) => auth.patchUser(patchData),
    onSuccess: () => {
      handleOpenPopup('내정보 변경에 성공하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
    onError: (error: AxiosError) => {
      console.error(error.message);
    },
  });

  const onProfileSubmit: (formData: ProfileFormValues, reset: () => void) => void = (formData, reset) => {
    handleQuestionPopupOpen('내정보를 변경하시겠습니까?', () => {
      const patchData: ProfileFormValues = { nickname: formData.nickname };
      if (formData.newPassword) patchData.newPassword = formData.newPassword;
      if (formData.profileImageUrl) patchData.profileImageUrl = formData.profileImageUrl;
      mutate(patchData);
      reset();
    });
  };

  // if (isPending) return <div>loading....</div>;

  return (
    <>
      <AccountForm onProfileSubmit={onProfileSubmit} />
      <Confirm dialogRef={dialogRef} text={popupMessage} />
      <Question
        dialogRef={questionRef}
        text={questionMessage}
        buttonText='변경 하기'
        onClick={() => (answerRef.current = true)}
      />
    </>
  );
}
