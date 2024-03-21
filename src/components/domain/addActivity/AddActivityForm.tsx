import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICON, USER_CATEGORYS } from '@/constants';
import Input from '@/components/common/Input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import Textarea from '@/components/common/Input/Textarea';
import BaseButton from '@/components/common/button/BaseButton';
import ImageInput from './ImageInput';
import setUrlsId from './utills/setUrlsId';
import styles from './AddActivityForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
const { plus } = ICON;

interface FormValues {
  title?: string;
  category?: string;
  description?: string;
  address?: string;
  price?: number;
  schedules?: {
    date?: string;
    startTime?: string;
    endTime?: string;
  }[];
  bannerImageUrl?: string;
  subImageUrls?: string[];
}

export default function AddActivityForm() {
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [subImageUrls, setSubImageUrls] = useState<{ url: string; id: string }[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const { register, formState, handleSubmit } = useForm<FormValues>({ mode: 'onBlur' });

  const { errors } = formState;

  const handleSelectedCategoryId = (id: number) => {
    setSelectedId(id);
  };

  const handleAddImageUrls = (targetId: string, imageData: string) => {
    if (targetId === 'bannerImageUrl') {
      setBannerImageUrl(imageData);
    } else if (targetId === 'subImageUrl') {
      subImageUrls.length < 4
        ? setSubImageUrls((prev) => [...prev, { url: imageData, id: setUrlsId(imageData) }])
        : alert('이미지를 4개 이상 추가 할 수 없습니다');
    }
  };

  const hadleDeleteImageUrl = (e: MouseEvent<HTMLButtonElement>) => {
    const currentTargetId = e.currentTarget.id;
    if (currentTargetId) {
      const newList = subImageUrls.filter((item) => currentTargetId !== item.id);
      return setSubImageUrls(newList);
    }

    setBannerImageUrl('');
  };

  const onHandleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <form className={cn('form-wrapper')} onSubmit={handleSubmit(onHandleSubmit)}>
      <Input
        {...register('title', { required: '체험 제목을 입력해 주세요' })}
        type='text'
        placeholder='제목'
        name='title'
        isError={!!errors.title}
        errorMessage={errors.title?.message}
      />
      <Dropdown
        placeholder='카테고리'
        onSelectedId={handleSelectedCategoryId}
        lists={USER_CATEGORYS}
        {...register('category', { required: '카테고리를 선택해 주세요' })}
      />
      <Textarea
        {...register('description', { required: '체험 설명 칸을 입력해 주세요' })}
        name='description'
        placeholder='설명'
        minLength={10}
      />
      <label htmlFor='price' className={cn('label')}>
        가격
      </label>
      <Input
        {...register('price', { required: '가격을 입력해 주세요' })}
        type='text'
        name='price'
        id='price'
        isError={!!errors.price}
        errorMessage={errors.price?.message}
        placeholder='가격'
      />
      <label htmlFor='address' className={cn('label')}>
        주소
      </label>
      <Input
        {...register('address', { required: '체험하는 장소를 입력해 주세요' })}
        type='text'
        name='address'
        id='address'
        isError={!!errors.address}
        errorMessage={errors.address?.message}
        placeholder='주소'
      />
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
      <BaseButton text='등록하기' size='md' type='submit' />
    </form>
  );
}
