import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import styles from './PostActivityButton.module.scss';
import Question from '@/components/common/popup/question/Question';

const cn = classNames.bind(styles);

export default function PostActivityButton() {
  const router = useRouter();
  const questionRef = useRef<HTMLDialogElement>(null);

  const handlePostActivityButtonClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      router.push('/addActivity');
      return;
    }
    if (!questionRef.current) return;
    questionRef.current.showModal();
  };

  const hadledirectSignin = () => {
    router.push('/signin');
  };

  return (
    <>
      <button className={cn('post-activity-button')} type='button' onClick={handlePostActivityButtonClick}>
        체험 등록
      </button>
      <Question dialogRef={questionRef} text='로그인 하시겠습니까?' onClick={hadledirectSignin} buttonText='예' />
    </>
  );
}
