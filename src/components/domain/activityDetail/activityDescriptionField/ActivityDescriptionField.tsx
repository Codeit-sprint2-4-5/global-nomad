import styles from './ActivityDescriptionField.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function ActivityDescriptionField({ description }: { description: string }) {
  return (
    <article className={cn('description-box')}>
      <h3 className={cn('description-title')}>체험 설명</h3>
      <p className={cn('description-content')}>{description}</p>
    </article>
  );
}
