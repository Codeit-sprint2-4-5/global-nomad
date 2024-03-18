import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { ICON } from '@/constants';

import Image from 'next/image';

import styles from './CountMemberInput.module.scss';
import classNames from 'classnames/bind';
import BaseButton from '../button/BaseButton';

const { add, subtract } = ICON;

const cn = classNames.bind(styles);

interface Props {
  onDownDisabled?: boolean;
  control?: Control;
  setValue?: UseFormSetValue<any>;
  onClickCloseModal?: () => void;
}

export default function CountMemberInput({ onDownDisabled, control, setValue, onClickCloseModal }: Props) {
  const handleClickCountUp = (prev: number) => {
    if (setValue) {
      const nextCount = ++prev;
      setValue('headCount', nextCount);
    }
  };
  const handleClickCountDown = (prev: number) => {
    if (setValue) {
      const nextCount = --prev;
      setValue('headCount', nextCount);
    }
  };

  return (
    <div className={cn('countInput-wrapper', { modal: onClickCloseModal })}>
      {onClickCloseModal && <h3>인원</h3>}
      <label htmlFor='contMember' className={cn('countInput-label')}>
        {onClickCloseModal ? '예약할 인원을 선택해 주세요' : '참여 인원 수'}
      </label>

      <Controller
        control={control}
        name='headCount'
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange } }) => (
          <>
            <input id='headCount' className={cn('countInput-input')} type='text' onChange={onChange} value={value} />

            <button
              type='button'
              disabled={onDownDisabled}
              onClick={() => handleClickCountDown(value)}
              className={cn('countInput-input-btn', 'subtract')}
            >
              <Image height={20} width={20} src={subtract.default.src} alt={subtract.default.alt} />
            </button>
            <button
              type='button'
              onClick={() => handleClickCountUp(value)}
              className={cn('countInput-input-btn', 'add')}
            >
              <Image height={20} width={20} src={add.default.src} alt={add.default.alt} />
            </button>

            {onClickCloseModal && <BaseButton text='확인' size='lg' type='button' onClick={onClickCloseModal} />}
          </>
        )}
      />
    </div>
  );
}
