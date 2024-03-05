import { instance } from '@/pages/api/axios';
import Image from 'next/image';

import getTimeAgo from '../utill/getTimeAgo';
import { ICON } from '@/constants';

import styles from '../ModalContents.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const { ellipse, xMedium } = ICON;

// const accessToken = 'd';
// const refreshToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA4LCJ0ZWFtSWQiOiIyLTUiLCJpYXQiOjE3MDk2MjE2MTEsImV4cCI6MTcxMDgzMTIxMSwiaXNzIjoic3AtZ2xvYmFsbm9tYWQifQ.WM1rD_Zp3djECzkvmL-l53lIQeH5acSfbhQM9lX9_z8';
// async function getNotifications() {
//   try {
//     const res = await instance.get('/my-notifications?size=10', {
//       headers: { Authorization: `Bearer ${refreshToken}` },
//     });

//     return res.data;
//   } catch (error: any) {
//     if (error.status >= 400) {
//       return alert(error.message);
//     }
//   }
// }

const mook = {
  totalCount: 4,
  notifications: [
    {
      id: 305,
      teamId: 2 - 5,
      userId: 108,
      content: '댄스(2024-03-04 17:00~18:00) 예약이 승인되었습니다.',
      createdAt: '2024-03-05T07:16:27.843Z',
      updatedAt: '2024-03-05T07:16:27.845Z',
      deletedAt: null,
    },
    {
      id: 306,
      teamId: 2 - 5,
      userId: 108,
      content: 'ssss(2024-03-04 17:00~18:00) 예약이 승인되었습니다.',
      createdAt: '2024-04-04T07:16:27.843Z',
      updatedAt: '2024-04-04T07:16:27.845Z',
      deletedAt: null,
    },
    {
      id: 307,
      teamId: 2 - 5,
      userId: 108,
      content: 'hhh(2024-03-04 17:00~18:00) 예약이 거절되었습니다.',
      createdAt: '2024-03-05T08:16:27.843Z',
      updatedAt: '2024-03-05T08:16:27.845Z',
      deletedAt: null,
    },
    {
      id: 308,
      teamId: 2 - 5,
      userId: 108,
      content: 'llll(2024-03-04 17:00~18:00) 예약이 거절되었습니다.',
      createdAt: '2024-03-05T09:16:27.843Z',
      updatedAt: '2024-03-05T09:16:27.845Z',
      deletedAt: null,
    },
  ],
  cursorId: null,
};

export default function Notifications() {
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
    // 이렇게 하면 안되는 걸아는데 다른 방법을 못찾겠어요

    return (
      <div
        className={cn('notification-item-context')}
        dangerouslySetInnerHTML={{ __html: highlightContent(context) }}
      ></div>
    );
  };

  return (
    <>
      <h1 className={cn('title')}>알림 {mook.totalCount}개</h1>
      <ul className={cn('notification-list')}>
        {mook.notifications?.map((notification) => (
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
