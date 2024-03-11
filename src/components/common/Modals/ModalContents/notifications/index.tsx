import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ICON } from '@/constants';
import styles from './Notifications.module.scss';
import classNames from 'classnames/bind';
import { getMyNotifications } from '@/pages/api/get/getMyNotifications';
import { queryKey } from '@/pages/api/quertKey';
import getTimeAgo from '../utills/getTimeAgo';

const cn = classNames.bind(styles);

const { ellipse, xMedium } = ICON;

export default function Notifications() {
  const { data: notificationsData } = useQuery({
    queryKey: queryKey.myNotifications,
    queryFn: getMyNotifications,
  });

  console.log(notificationsData);
  function highlightContent(content: string) {
    if (content.includes('승인')) {
      return content.replace(/승인/g, '<span style= "color: #0085ff " >$&</span>');
    } else if (content.includes('거절')) {
      return content.replace(/거절/g, '<span style="color: #ff472e">$&</span>');
    } else {
      //예약 들어온 경우 swagger 에 안나옵니다..
      return content;
    }
  }

  const description = (context: string) => {
    // 이렇게 하면 안되는 걸 아는데 다른 방법을 못찾겠어요

    return (
      <div
        className={cn('notification-item-context')}
        dangerouslySetInnerHTML={{ __html: highlightContent(context) }}
      ></div>
    );
  };

  return (
    <>
      <h1 className={cn('title')}>알림 {notificationsData?.totalCount}개</h1>
      <ul className={cn('notification-list')}>
        {notificationsData?.notifications.map((notification: any) => (
          <li key={notification.id} className={cn('notification-item')}>
            <div className={cn('notification-item-top-line')}>
              <Image
                src={ellipse.default.src}
                alt={ellipse.default.alt}
                width={5}
                height={5}
                className={cn(
                  { rejection: notification.content.includes('거절') },
                  { approval: notification.content.includes('승인') }
                )}
              />
              <Image src={xMedium.default.src} alt={xMedium.default.alt} width={24} height={24} />
            </div>

            <h2>{description(notification.content)}</h2>

            <p className={cn('notification-item-timeAgo')}>{getTimeAgo(notification.createdAt)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
