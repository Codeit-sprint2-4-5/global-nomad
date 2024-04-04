import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ActivityInfo from '@/components/domain/activityInfo/ActivityInfo';
import KakaoMap from '@/components/domain/kakaoMap/KakaoMap';
import ImageField from '@/components/domain/activityImageField/ImageField';
import Layout from '@/components/common/layout/Layout';
import ActivityReviewField from '@/components/domain/activityDetail/activityReviewField/ActivityReviewField';
import FloatingBox from '@/components/common/floatingBox/FloatingBox';
import ActivityDescriptionField from '@/components/domain/activityDetail/activityDescriptionField/ActivityDescriptionField';
import styles from './ActivityDetailPage.module.scss';
import classNames from 'classnames/bind';
import { activity } from '@/apis/activity';
import { GetActivityDetail } from '@/types';
import { AxiosError } from 'axios';

const cn = classNames.bind(styles);

export default function ActivityDetail() {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  const { data: detailData, isSuccess } = useQuery<GetActivityDetail, AxiosError>({
    queryKey: ['activities', id],
    queryFn: () => (id ? activity.getActivityDetail(id) : Promise.reject(null)),
  });

  if (!isSuccess) return <div>loading...</div>;

  return (
    <Layout>
      <ActivityInfo detailData={detailData} />
      <ImageField detailData={detailData} />
      <section className={cn('content')} id='modal-root'>
        <div className={cn('detail')}>
          <ActivityDescriptionField description={detailData.description} />
          <KakaoMap detailData={detailData} />
          <ActivityReviewField />
        </div>
        <FloatingBox detailData={detailData} />
      </section>
    </Layout>
  );
}
