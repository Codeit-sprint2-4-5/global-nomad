import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cn = classNames.bind(styles);
interface Props {
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

export default function Search({ keyword, onSubmit, onChange }: Props) {
  const [isKeyword, setIsKeyword] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(e);
    }, 100);

    if (e.target.value === '') {
      setIsKeyword(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;

    onSubmit();
    setIsKeyword(true);
  };

  return (
    <div className={cn('container')}>
      <p className={cn('text')}>무엇을 체험하고 싶으신가요?</p>
      <div className={cn('wrap')}>
        <form onSubmit={handleSubmit} className={cn('form', { acitve: isKeyword })}>
          <input
            className={cn('search-bar')}
            type='search'
            placeholder='내가 원하는 체험은'
            onChange={handleValueChange}
            value={keyword}
          />
          <div className={cn('button')}>
            <BaseButton type='submit' size='md' text='검색하기' />
          </div>
        </form>
      </div>
    </div>
  );
}
