import React, { useState } from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { ICON } from '@/constants';
import Image from 'next/image';
import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const { star } = ICON;

interface StarProps {
  selected: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, onClick, onMouseOut, onMouseOver }: StarProps) {
  const StarAction = selected ? star.active.src : star.default.src;
  return (
    <Image
      src={StarAction}
      alt={star.default.alt}
      fill
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    />
  );
}

interface RatingInputProps {
  setValue: UseFormSetValue<any>;
  control: Control<any>;
}

export default function RatingInput({ setValue, control }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value: number) => {
    setValue('rating', value);
  };

  const handleStarMouseOver = (value: number) => {
    setHoverRating(value);
  };

  const handleStarMouseOut = () => {
    setHoverRating(0);
  };

  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { onChange, value } }) => (
        <ul className={cn('stars')}>
          {RATINGS.map((rating) => (
            <li className={cn('star')} key={rating}>
              <Star
                selected={rating <= (hoverRating || value)}
                onClick={() => handleStarClick(rating)}
                onMouseOver={() => handleStarMouseOver(rating)}
                onMouseOut={handleStarMouseOut}
              />
            </li>
          ))}
        </ul>
      )}
    />
  );
}
