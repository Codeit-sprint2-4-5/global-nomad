import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
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
  const [isKeyword, setIsKeyword] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      setIsKeyword(false);
    }
  };

  const handleSearchClick = () => {
    if (!keyword) return;

    const filterItem = data.activities.filter((activity: Activity) => activity.title.includes(keyword));
    setSearchResult(filterItem);
    setIsKeyword(true);
  };

  return (
    <div className={cn('container')}>
      <p className={cn('text')}>무엇을 체험하고 싶으신가요?</p>
      <div className={cn('wrap', { acitve: isKeyword })}>
        <input
          className={cn('search-bar')}
          type='search'
          placeholder='내가 원하는 체험은'
          onChange={handleValueChange}
          value={keyword}
        />
        {/* TODO 버튼 컴포넌트 만들어지면 바꾸기 */}
        <button onClick={handleSearchClick}>검색하기</button>
      </div>
    </div>
  );
}
