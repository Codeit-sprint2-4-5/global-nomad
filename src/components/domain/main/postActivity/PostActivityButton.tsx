import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostActivityButton.module.scss';

const cn = classNames.bind(styles);

export default function PostActivityButton() {
  const router = useRouter();

  const handlePostActivityButtonClick = () => {
    router.push('/addActivity');
  };

  return (
    <button className={cn('post-activity-button')} type='button' onClick={handlePostActivityButtonClick}>
      체험 등록
    </button>
  );
}
