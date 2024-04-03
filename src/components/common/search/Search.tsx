import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { instance } from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);
interface Props {
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

export default function Search({ keyword, onSubmit, onChange }: Props) {
  const [isKeyword, setIsKeyword] = useState(false);
  const [title, setTitle] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function getActivity() {
    const res = await instance.get('/activities', {
      params: {
        method: 'offset',
      },
    });
    return res.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['/activities'],
    queryFn: getActivity,
  });

  const handleSearchFocus = () => {
    setIsFocus(true);
    setIsKeyword(true);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (e.target.value === '') {
      setIsKeyword(false);
    } else {
      setIsKeyword(true);
      setIsFocus(false);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(e);
    }, 300);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;

    onSubmit();
  };

  let count = 1;
  useEffect(() => {
    if(data && data?.activities[0]) {
      setTitle(data?.activities[0].title);
    }

    const title = setInterval(() => {
      if (count < data?.activities.length) {
        setTitle(data?.activities[count++].title);
      }
    }, 3000);

    return () => clearInterval(title);
  }, []);

  if (isLoading) return;

  return (
    <div className={cn('container')}>
      <p className={cn('text')}>무엇을 체험하고 싶으신가요?</p>
      <div className={cn('wrap')}>
        <form onSubmit={handleSubmit} className={cn('form', { acitve: isKeyword })} onFocus={handleSearchFocus}>
          <input className={cn('search-bar')} type='search' onChange={handleValueChange} value={keyword} />
          <div className={cn('button')}>
            <BaseButton type='submit' size='md' text='검색하기' />
          </div>
        </form>
        <div className={cn('title')}>
          <ul>{!keyword && !isFocus && <li>{title}</li>}</ul>
        </div>
      </div>
    </div>
  );
}
