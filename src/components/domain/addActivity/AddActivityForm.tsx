import { MouseEvent, useMemo, useRef, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import Input from '@/components/common/Input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import Textarea from '@/components/common/Input/Textarea';
import BaseButton from '@/components/common/button/BaseButton';
import ImageInput from './ImageInput';
import DateInput from '@/components/common/Input/DateInput';
import IconButton from '@/components/common/button/IconButton';
import AddressInput from './AddressInput';
import ScheduleList from './ScheduleList';
import Confirm from '@/components/common/popup/confirm/Confirm';
import Title from '@/components/common/title/Title';
import { getActiviy } from '@/apis/get/getActivity';
import { postActivity } from '@/apis/post/postActivity';
import { patchActivity } from '@/apis/patch/patchActivity';
import { ICON, USER_CATEGORYS } from '@/constants';
import setUrlsId from './utills/setUrlsId';
import styles from './AddActivityForm.module.scss';
import classNames from 'classnames/bind';
import { Router, useRouter } from 'next/router';
import { PatchValues, PostActivityFormValues, Schedules } from '@/types';

const cn = classNames.bind(styles);
const { add } = ICON;

export default function AddActivityForm({ isEdit }: { isEdit?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { id: activityId } = router.query;
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [subImageUrls, setSubImageUrls] = useState<{ imageUrl: string; id: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [schedules, setSchedules] = useState<Schedules[]>([]);
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<typeof subImageUrls>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<Schedules[]>([]);
  const [confrimText, setConfirmText] = useState('');
  const { register, formState, handleSubmit, getValues, setValue } = useForm<PostActivityFormValues>({
    mode: 'onChange',
  });

  const { errors } = formState;

  const { data: activityData, isSuccess } = useQuery({
    queryKey: [activityId],
    queryFn: () => getActiviy(activityId as string),
    enabled: isEdit,
  });

  const titleText = useMemo(() => (isEdit ? '수정' : '등록'), [isEdit]);

  const handleSelectedCategoryId = (id: number) => {
    setSelectedCategoryId(id);
    const updateCategory = USER_CATEGORYS.find((category) => id === category.id)?.category;
    if (updateCategory) return setValue('category', updateCategory);
  };

  useEffect(() => {
    if (isSuccess) {
      setValue('title', activityData.title);
      setValue('description', activityData.description);
      setValue('price', activityData.price);
      setValue('address', activityData.address);

      setSchedules(activityData.schedules);
      setBannerImageUrl(activityData.bannerImageUrl);
      setSubImageUrls(activityData.subImages);
      setValue('category', activityData.category);
      const categoryId = USER_CATEGORYS.find((category) => activityData.category === category.category)?.id;
      categoryId && handleSelectedCategoryId(categoryId);
      setSelectedCategoryId(categoryId);
    }
  }, [activityData, isEdit]);

  const handlePostDateValue = (value: string) => {
    return setValue('schedules.date', value);
  };

  const handleSetAddressValue = (value: string) => {
    return setValue('address', value);
  };

  const handleConfirmText = (text: string) => {
    if (!dialogRef.current) return;

    setConfirmText(text);
    return dialogRef.current.showModal();
  };

  const handleAddSchdule = () => {
    const nextSchedule = { ...getValues('schedules'), id: schedules.length + 1 } as Schedules;
    const isValid =
      nextSchedule &&
      Object.values(nextSchedule).every((value) => value !== '' && value !== null && value !== undefined);

    if (!isValid || !nextSchedule) {
      return handleConfirmText('날짜, 시작시간, 종료 시간을 확인해 주세요');
    }

    if (schedules.find((item) => item?.date === nextSchedule?.date && item?.startTime === nextSchedule?.startTime)) {
      return handleConfirmText('날짜, 시작시간, 종료 시간을 확인해 주세요');
    }
    if (isEdit) {
      setSchedulesToAdd((prev) => [...prev, nextSchedule]);
    }

    return setSchedules((prev) => [...prev, nextSchedule as Schedules]);
  };

  const handleDeleteSchedule = (id: number) => {
    if (schedules.length !== 0) {
      const updateSchedule = schedules.filter((schedule) => id !== schedule?.id);
      if (isEdit && schedulesToAdd) {
        const upDateNewSchedule = schedulesToAdd.filter((schedule) => id !== schedule.id);
        setSchedulesToAdd(upDateNewSchedule);
      }
      if (id > 100) {
        setScheduleIdsToRemove((prev) => [...prev, id]);
      }
      return setSchedules(updateSchedule);
    }
  };

  const handleAddImageUrls = (targetId: string, imageData: string) => {
    if (targetId === 'bannerImageUrl') {
      return setBannerImageUrl(imageData);
    } else if (targetId === 'subImageUrl') {
      if (subImageUrls.length < 4) {
        isEdit && setSubImageUrlsToAdd((prev) => [...prev, { imageUrl: imageData, id: setUrlsId(imageData) }]);
        return setSubImageUrls((prev) => [...prev, { imageUrl: imageData, id: setUrlsId(imageData) }]);
      }
      return handleConfirmText('이미지를 4개 이상 추가 할 수 없습니다');
    }
  };

  const hadleDeleteImageUrl = (e: MouseEvent<HTMLButtonElement>) => {
    const currentTargetId = e.currentTarget.id;
    if (currentTargetId) {
      if (Number(currentTargetId) < 5000) {
        setSubImageIdsToRemove((prev) => [...prev, Number(currentTargetId)]);
      }
      const newList = subImageUrls.filter((item) => currentTargetId !== String(item.id));
      return setSubImageUrls(newList);
    }

    return setBannerImageUrl('');
  };

  const postActivityMutation = useMutation({
    mutationFn: (data: PostActivityFormValues) => postActivity(data),
    onSuccess: () => {
      handleConfirmText('체험 등록이 완료되었습니다');
    },
  });

  const patchActivityMutation = useMutation({
    mutationFn: (data: unknown) => patchActivity(activityId as string, data),
    onSuccess: () => {
      handleConfirmText('체험 수정이 완료되었습니다');
    },
  });

  const postSuccess = postActivityMutation.isSuccess;
  const patchSuccess = patchActivityMutation.isSuccess;

  const handleClickSuccessConfirm = () => {
    if (postSuccess || patchSuccess) {
      return router.push('/mypage/myactivities');
    } else return;
  };
  const onHandleSubmit: SubmitHandler<PostActivityFormValues> = (data) => {
    const postData = { ...data };
    postData.schedules = schedules.map((schedule: Schedules) => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    }));
    postData.price = Number(data.price);
    postData.bannerImageUrl = bannerImageUrl;
    postData.subImageUrls = subImageUrls.map((url) => url.imageUrl);

    if (isEdit) {
      const addSubUrl = subImageUrlsToAdd.map((item) => item.imageUrl);
      const addSchedule = schedulesToAdd.map((schedule) => ({
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      }));
      const patchData: PatchValues = {
        ...postData,
        subImageIdsToRemove,
        subImageUrlsToAdd: addSubUrl,
        scheduleIdsToRemove,
        schedulesToAdd: addSchedule,
      };
      delete patchData.subImageUrls;
      delete patchData.schedules;
      return patchActivityMutation.mutate(patchData);
    }
    postActivityMutation.mutate(postData);
  };
  return (
    <form className={cn('form-wrapper')} onSubmit={handleSubmit(onHandleSubmit)}>
      <BaseButton text={`${titleText}하기`} size='md' type='submit' />
      <Title text={`내 체험 ${titleText}`} />

      <Input
        {...register('title', { required: '체험 제목을 입력해 주세요' })}
        type='text'
        placeholder='제목'
        isError={!!errors.title}
        errorMessage={errors.title?.message}
      />
      <Dropdown
        placeholder='카테고리'
        onSelectedId={handleSelectedCategoryId}
        lists={USER_CATEGORYS}
        selectedCategoryId={selectedCategoryId}
        {...register('category')}
      />
      <Textarea
        {...register('description', { required: '체험 설명 칸을 입력해 주세요' })}
        placeholder='설명'
        minLength={10}
      />
      <label htmlFor='price' className={cn('label')}>
        가격
      </label>
      <Input
        {...register('price', {
          required: '가격을 입력해 주세요',
          min: { value: 0, message: '올바른 가격을 입력해 주세요' },
        })}
        type='number'
        id='price'
        isError={!!errors.price}
        errorMessage={errors.price?.message}
        placeholder='숫자로 입력해 주세요'
      />
      <AddressInput register={register} errors={errors} onSetAddressValue={handleSetAddressValue} />

      <article className={cn('schedule')}>
        <label htmlFor='date' className={cn('label', 'label-date')}>
          예약 가능한 시간대
        </label>
        <div className={cn('schedule-input-box', { isSchdule: schedules.length !== 0 })}>
          <div className={cn('schedule-input')}>
            <label id='date' className={cn('label-date-little')}>
              날짜
            </label>
            <DateInput onPostDataValue={handlePostDateValue} id='date' {...register('schedules.date')} />
          </div>
          <div className={cn('schedule-input', 'time')}>
            <label id='start-time' className={cn('label-date-little')}>
              시작 시간
            </label>
            <Input type='time' {...register('schedules.startTime')} />
          </div>
          <p className={cn('time-input-between-wave')}>~</p>
          <div className={cn('schedule-input', 'time')}>
            <label id='end-time' className={cn('label-date-little')}>
              종료 시간
            </label>
            <Input type='time' {...register('schedules.endTime')} />
          </div>
          <IconButton onClick={handleAddSchdule} type='button' size='56' svg={add.default.src} alt={add.default.alt} />
        </div>
      </article>
      {schedules.length !== 0 && (
        <>
          <ScheduleList schedules={schedules} onDeleteSchedule={handleDeleteSchedule} />
        </>
      )}

      <ImageInput
        imageUrl={bannerImageUrl}
        inputId='bannerImageUrl'
        onDeleteImageUrl={hadleDeleteImageUrl}
        onAddImageUrls={handleAddImageUrls}
      />
      <ImageInput
        imageUrl={subImageUrls}
        inputId='subImageUrl'
        onDeleteImageUrl={hadleDeleteImageUrl}
        onAddImageUrls={handleAddImageUrls}
      />
      <p className={cn('guide-image-input')}>* 배너 이미지는 1개, 소개 이미지는 최대 4개까지 등록 가능합니다.</p>
      <Confirm dialogRef={dialogRef} text={confrimText} handleClickSuccessConfirm={handleClickSuccessConfirm} />
    </form>
  );
}
