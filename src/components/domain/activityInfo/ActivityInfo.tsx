import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { instance } from '@/apis/axios';
import Title from '@/components/common/title/Title';
import Menu from '@/components/common/menu/Menu';
import Question from '@/components/common/popup/question/Question';
import Confirm from '@/components/common/popup/confirm/Confirm';
import classNames from 'classnames/bind';
import styles from './ActivityInfo.module.scss';
import { GetActivityDetail } from '@/types';

const cn = classNames.bind(styles);

interface ActivityInfoProps {
  detailData: GetActivityDetail;
}

export default function ActivityInfo({ detailData }: ActivityInfoProps) {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const confirmRef = useRef<HTMLDialogElement>(null);
  const questionRef = useRef<HTMLDialogElement>(null);

  async function getUser() {
    try {
      const res = await instance.get('/users/me');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteActivity() {
    try {
      const res = await instance.delete(`/my-activities/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const { data: user } = useQuery({
    queryKey: ['/users/me'],
    queryFn: getUser,
  });

  const { mutate } = useMutation({
    mutationKey: ['/my-activities'],
    mutationFn: deleteActivity,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/my-activities'] });
      handleSuccess();
    },
  });

  const handleModifyClick = () => {
    router.push(`/editActivity/${id}`);
  };

  const handleDeleteClick = () => {
    if (!questionRef.current) return;
    questionRef.current.showModal();
  };

  const handleButtonClick = () => {
    mutate();
  };

  const handleSuccess = () => {
    if (!confirmRef.current) return;
    confirmRef.current.showModal();
  };

  return (
    <>
      <div className={cn('container')}>
        <div className={cn('activity-info')}>
          <p className={cn('category')}>{detailData?.category}</p>
          <Title text={detailData?.title} />
          <div className={cn('wrap')}>
            <p className={cn('rating')}>{detailData?.rating}</p>
            <p className={cn('address')}>{detailData?.address}</p>
          </div>
        </div>
        {detailData?.userId === user?.id && (
          <Menu handleModifyClick={handleModifyClick} handleDeleteClick={handleDeleteClick} />
        )}
      </div>
      <Question text='삭제하시겠습니까?' dialogRef={questionRef} buttonText='삭제하기' onClick={handleButtonClick} />
      <Confirm text='삭제되었습니다' dialogRef={confirmRef} />
    </>
  );
}
