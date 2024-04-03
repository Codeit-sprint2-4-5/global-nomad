import DaumPostcode from 'react-daum-postcode';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import BaseButton from '@/components/common/button/BaseButton';
import { useToggleButton } from '@/hooks';

import styles from './AddActivityForm.module.scss';
import classNames from 'classnames/bind';
import { PostActivityFormValues } from '@/types';

const cn = classNames.bind(styles);

interface Props {
  register: UseFormRegister<PostActivityFormValues>;
  errors: FieldErrors<PostActivityFormValues>;
  onSetAddressValue: (value: string) => void;
}

export default function AddressInput({ register, errors, onSetAddressValue }: Props) {
  const { isToggle: isopen, handleToggleClick } = useToggleButton();

  const completeHandler = (data: any) => {
    onSetAddressValue(data.roadAddress);
  };

  const handleOpenAddress = () => {
    onSetAddressValue('');
    handleToggleClick();
  };
  return (
    <div className={cn('address-input-box')}>
      <label htmlFor='address' className={cn('label', 'address-label')}>
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
      <BaseButton text='주소 찾기' size='sm' variant='primary' onClick={handleOpenAddress} />
      {isopen && <DaumPostcode className={cn('address-modal')} onComplete={completeHandler} />}
    </div>
  );
}
