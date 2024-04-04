import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, MouseEvent } from 'react';
import ImageList from './ImageList';
import { postActivityImageUrl } from '@/apis/post/postActivityImageUrl';
import isValidImage from './utills/isValidImage';
import { ICON } from '@/constants';
import styles from './AddActivityForm.module.scss';
import classNames from 'classnames/bind';
const { plus } = ICON;

const cn = classNames.bind(styles);

interface Props {
  onDeleteImageUrl: (e: MouseEvent<HTMLButtonElement>) => void;
  onAddImageUrls: (targetId: string, imageData: string) => void;
  inputId: 'bannerImageUrl' | 'subImageUrl';
  imageUrl: string | { imageUrl: string; id: string }[];
}

function ImageLableBox() {
  return (
    <div className={cn('file-label-box')}>
      <Image src={plus.default.src} alt={plus.default.alt} width={30} height={30} />
      <p>이미지 등록</p>
    </div>
  );
}

export default function ImageInput({ inputId, imageUrl, onDeleteImageUrl, onAddImageUrls }: Props) {
  const postImageMutation = useMutation({
    mutationFn: ({ formData, targetId }: { formData: FormData; targetId: string }) =>
      postActivityImageUrl(formData).then((res) => ({ ...res, targetId })),
    onSuccess: (res) => {
      const { targetId } = res;
      const activityImageUrl = res?.data.activityImageUrl;
      onAddImageUrls(targetId, activityImageUrl);
    },
  });

  const label = inputId === 'bannerImageUrl' ? '배너 이미지' : '소개 이미지';

  const handelUpLoadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const file = e.target.files && e.target.files[0];

    if (targetId === 'subImageUrl') {
      if (Array.isArray(imageUrl) && imageUrl.length >= 4) {
        return alert('이미지를 4개 이상 추가 할 수 없습니다');
      }
    }

    isValidImage(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('image', file);

      postImageMutation.mutate({ formData, targetId });
    }
  };

  return (
    <div className={cn('image-input-box')}>
      <label className={cn('label', 'file-label')} htmlFor={inputId}>
        {label} <ImageLableBox />
      </label>
      {inputId === 'bannerImageUrl'
        ? typeof imageUrl === 'string' &&
          imageUrl && <ImageList imageUrl={imageUrl} onDeleteImageUrl={onDeleteImageUrl} />
        : Array.isArray(imageUrl) &&
          imageUrl?.map((image) => (
            <ImageList key={image.id} onDeleteImageUrl={onDeleteImageUrl} imageUrl={image.imageUrl} id={image.id} />
          ))}
      <input className={cn('file-input')} onChange={handelUpLoadImg} type='file' id={inputId} />
    </div>
  );
}
