import { SubmitHandler, useForm } from 'react-hook-form';
import RatingInput from './RatingInput';
import styles from '../ModalContents.module.scss';
import className from 'classnames/bind';

const cn = className.bind(styles);

interface FormData {
  rating: number;
  content: string;
}
export default function ReviewFrom() {
  const { control, handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: { rating: 0 },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={cn('form')}>
      <RatingInput control={control} setValue={setValue} />

      <textarea {...register('content')} className={cn('textarea')} placeholder="후기를 작성해주세요"></textarea>
      <button type="submit">submit</button>
    </form>
  );
}
