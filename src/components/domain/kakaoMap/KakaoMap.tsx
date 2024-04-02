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

import classNames from 'classnames/bind';
import { ICON } from '@/constants';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { instance } from '@/apis/axios';

const cn = classNames.bind(styles);

interface KakaoMapProps {
  address: string;
  title: string;
  bannerImageUrl: string;
}
export default function KakaoMap({
  address,
  title,
  bannerImageUrl,
}: KakaoMapProps) {
  const [center, setCenter] = useState({
    lat: 37.49676871972202,
    lng: 127.02474726969814,
  });
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const searchRoute = `https://map.kakao.com/link/to/${address},${center.lat},${center.lng}`;
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setCenter({ lat: newSearch.y, lng: newSearch.x });
      }
    });
  }, [address]);

  const handleMarkerClick = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };
  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                    {title}
                    <button
                      className={cn('close')}
                      title="닫기"
                      onClick={handleCloseOverlay}
                    ></button>
                  </div>
                  <div className={cn('body')}>
                    <div className={cn('img')}>
                      <Image src={bannerImageUrl} fill alt="기본이미지" />
                    </div>
                    <div className={cn('desc')}>
                      <div className={cn('ellipsis')}>
                        <div>주소</div>
                        {address}
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
          {address}
        </div>
        {copied && <div className={cn('toast')}>주소를 복사했습니다</div>}
      </div>
    </>
  );
}
