import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import BaseButton from '@/components/common/button/BaseButton';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cn = classNames.bind(styles);

interface Activity {
  title: string;
}

interface Props {
  data: {
    activities: Activity[];
  };
  setSearchResult: Dispatch<SetStateAction<Activity[]>>;
}

export default function Search({ data, setSearchResult }: Props) {
  const [isKeyword, setIsKeyword] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      setIsKeyword(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;

    const filterItem = data.activities.filter((activity: Activity) => activity.title.includes(keyword));
    setSearchResult(filterItem);
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
            <BaseButton type={'submit'} size={'md'} text={'검색하기'} />
          </div>
        </form>
      </div>
    </div>
  );
}
