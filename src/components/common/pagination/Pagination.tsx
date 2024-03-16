import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cn = classNames.bind(styles);

interface Props {
  data: {
    totalCount: number;
  };
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  PAGE_LIMIT: number;
}

export default function Pagination({ data, currentPage, setCurrentPage, PAGE_LIMIT }: Props) {
  const BUTTON_LIMIT = 5;
  const buttonGroup = Math.ceil(currentPage / BUTTON_LIMIT);
  const totalPage = Math.ceil(data.totalCount / PAGE_LIMIT);
  const START_PAGE = (buttonGroup - 1) * BUTTON_LIMIT + 1;

  const handleButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage((old: number) => old - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((old: number) => old + 1);
  };

  return (
    <div className={cn('container')}>
      <button type='button' className={cn('control', 'prev')} onClick={handlePrevClick} disabled={currentPage === 1}>
        이전
      </button>
      <div className={cn('page-number')}>
        {Array(BUTTON_LIMIT)
          .fill(START_PAGE)
          .map((_, i) => {
            const pageNumber = START_PAGE + i;
            if (pageNumber > totalPage) return;

            return (
              <button
                type='button'
                key={i}
                onClick={() => handleButtonClick(pageNumber)}
                className={cn({ active: pageNumber === currentPage })}
              >
                {pageNumber}
              </button>
            );
          })}
      </div>
      <button
        type='button'
        className={cn('control', 'next')}
        onClick={handleNextClick}
        disabled={currentPage === totalPage}
      >
        다음
      </button>
    </div>
  );
}
