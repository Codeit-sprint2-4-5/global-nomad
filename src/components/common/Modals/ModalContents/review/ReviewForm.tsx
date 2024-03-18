import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import RatingInput from './RatingInput';
import styles from '../ModalContents.module.scss';
import className from 'classnames/bind';
import BaseButton from '@/components/common/button/BaseButton';
import { postMyReview } from '@/apis/post/postReview';

const cn = className.bind(styles);

interface FormData {
  rating: number;
  content: string;
}

interface Props {
  id: number;
  onClickCloseModal: () => void;
}

export default function ReviewFrom({ id, onClickCloseModal }: Props) {
  const { control, handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: { rating: 0, content: '' },
  });
  const postReviewMutation = useMutation({
    mutationFn: (data: FormData) => postMyReview(id, data),
    onSuccess: () => {
      onClickCloseModal();
      //후기리스트 다시 불러오는 거추가..?
      //함수 이름 맘에 안듦
    },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    postReviewMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={cn('form')}>
      <RatingInput control={control} setValue={setValue} />

      <textarea
        {...register('content', { required: '후기를 작성해 주세요' })}
        className={cn('textarea')}
        placeholder='후기를 작성해주세요'
      ></textarea>
      <BaseButton type='submit' text='작성하기' size='lg' />
    </form>
  );
}
