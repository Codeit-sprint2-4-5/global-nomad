import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import ActivityDetailInfo from '@/types/ActivitiyDetailInfo';

import classNames from 'classnames/bind';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { instance } from '@/apis/axios';

const cn = classNames.bind(styles);

export default function KakaoMap() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  const {
    data: activitiesDetailInfo,
    error,
    isLoading,
  } = useQuery<ActivityDetailInfo, AxiosError>({
    queryKey: ['activity-detail', id],
    queryFn: () => getActivityDetail(id),
  });
  const getActivityDetail = async (id: string | undefined) => {
    const response = await instance.get(`/activities/${id}`);
    return response.data;
  };

  const [center, setCenter] = useState({
    lat: 37.49676871972202,
    lng: 127.02474726969814,
  });
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const searchRoute = activitiesDetailInfo
    ? `https://map.kakao.com/link/to/${activitiesDetailInfo.address},${center.lat},${center.lng}`
    : '';
  useEffect(() => {
    if (activitiesDetailInfo) {
      // 추가: activitiesDetailInfo가 존재하는 경우에만 실행
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        activitiesDetailInfo.address,
        function (result: any[], status: string) {
          if (status === kakao.maps.services.Status.OK) {
            const newSearch = result[0];
            setCenter({ lat: newSearch.y, lng: newSearch.x });
          }
        }
      );
    }
  }, [activitiesDetailInfo]);
  const handleMarkerClick = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };
  const handleCopyAddress = async () => {
    if (activitiesDetailInfo && activitiesDetailInfo.address) {
      await navigator.clipboard.writeText(activitiesDetailInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 데이터가 로딩 중이면 로딩 UI를 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러가 발생한 경우 에러 UI를 표시
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 데이터가 없는 경우 빈 화면을 표시하거나 다른 처리를 수행
  if (!activitiesDetailInfo) {
    return <div>No data available</div>;
  }
  return (
    <>
      <div className={cn('container')}>
        <Map center={center} className={cn('map')} level={3}>
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />

          <CustomOverlayMap position={center}>
            {overlayVisible && (
              <div className={cn('wrap')}>
                <div className={cn('info')}>
                  <div className={cn('title')}>
                    {activitiesDetailInfo.title}
                    <button
                      className={cn('close')}
                      title="닫기"
                      onClick={handleCloseOverlay}
                    ></button>
                  </div>
                  <div className={cn('body')}>
                    <div className={cn('img')}>
                      <Image
                        src={activitiesDetailInfo.bannerImageUrl}
                        fill
                        alt="기본이미지"
                      />
                    </div>
                    <div className={cn('desc')}>
                      <div className={cn('ellipsis')}>
                        <div>주소</div>
                        {activitiesDetailInfo.address}
                      </div>
                      <div className={cn('copyLink')}>
                        <a
                          href={searchRoute}
                          target="_blank"
                          className={cn('link')}
                          onClick={() => setOverlayVisible(false)}
                        >
                          길찾기
                        </a>
                        <div onClick={handleCopyAddress} className={cn('copy')}>
                          주소 복사
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <MapMarker position={center} onClick={handleMarkerClick} />
          </CustomOverlayMap>
        </Map>

        <div className={cn('address')}>
          <Image
            src={ICON.mapMarker.default.src}
            width={18}
            height={18}
            alt={ICON.mapMarker.default.alt}
          />
          {activitiesDetailInfo.address}
        </div>
        {copied && <div className={cn('toast')}>주소를 복사했습니다</div>}
      </div>
    </>
  );
}
