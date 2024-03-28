import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const KAKAO_MAPS_API_KEY = '63be0c9110bd6e2e0df50576a4bf3db3';
  return (
    <Html lang="ko">
      <Head />
      <script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAPS_API_KEY}&libraries=services,clusterer`}
        async={false}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
