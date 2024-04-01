import { RefObject } from 'react';
import classNames from 'classnames/bind';
import style from '@/components/common/popup/imageViewer/ImageViewer.module.scss';
import Image from 'next/image';

interface ImageViewerProps {
  imageUrl: string | null;
  dialogRef: RefObject<HTMLDialogElement>;
}

const cn = classNames.bind(style);

export default function ImageViewer({ imageUrl, dialogRef }: ImageViewerProps) {
  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };
  return (
    <>
      <dialog className={cn('container')} ref={dialogRef} onClick={handleCloseClick}>
        <div className={cn('image-field')}>
          {imageUrl && (
            <Image className={cn('image')} sizes='100%' src={imageUrl} alt={'이미지 팝업으로 보기'} fill priority />
          )}
        </div>
      </dialog>
    </>
  );
}
