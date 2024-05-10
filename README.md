## 🔗배포: https://global-nomad.vercel.app/<br/>
## 💢발표자료 - [gn-pdf.pdf](https://github.com/Codeit-sprint2-4-5/global-nomad/files/15177996/gn-pdf.pdf)
## 🔑 Demo 계정
ID: test@codeit.com <br>
PW: test1234 <br>
## 🚻Team 소개

<table>
  <tbody>
    <tr>
      <td>
        팀장 김미진
      </td>
      <td>
        고성선
      </td>
      <td>
        김재환
      </td>
      <td>
        박운성
      </td>
      <td>
        박지원
      </td>
    </tr>
  </tbody>
</table>

## ✨ 주요 기능 구현
김미진 - 달력 컴포넌트 제작, 로딩바/스켈레톤 구현, 팝업 컴포넌트 구현, 검색 컴포넌트 구현, 예약 현황 페이지, 체험 상세 페이지, 체험 정보 페이지
고성선 - 버튼 컴포넌트 구현, 인풋 컴포넌트 구현, 로그인, 회원가입 페이지, 내정보 수정 페이지, Route guard 구현, AccessToken 재발급, 체험상세 - ImageField 구현
김재환 - Footer 구현, Card 컴포넌트 구현, 무한스크롤 Hook 구현, 내 체험 정보, 내 예약 정보 구현, 카카오맵 구현
박운성 - 메인 페이지, 캐러셀 구현, 드롭다운 컴포넌트 구현, GNB 컴포넌트 구현, 카테고리 컴포넌트 구현, 칩 컴포넌트 구현
박지원 - 모달 컴포넌트 구현, 체험 상세 페이지 (체험 설명, 후기,예약 컴포넌트) 구현, 체험 등록 / 수정 페이지 구현, axios interceptor 적용

## 🛠️ Dev Tools
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-F36D00?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge"><br/>
<img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/KakaoMaps-FFCD00?style=for-the-badge">


## 😯 코드 컨벤션
- Next.js
    - <img> → <Image>,<a> → <Link> 사용
- 컴포넌트
    - 컴포넌트 이름은 대문자로 시작 (PascalCase) & 함수 선언식
    - 컴포넌트 이름 **구체적**으로 작성
    - 컴포넌트 최대한 **재사용성** 높게 작성
    - 훅의 경우 use로 시작
    - 데이터를 가져오는 함수는 get으로 시작
    - 이벤트 핸들러는 handle뭐뭐이벤트 ex) handleEmailClick
- 변수, 상수 등의 이름 **직관적으로, 구체적으로** 작성
- 상수 → 모두 대문자 & _로 연결 → const MAX_HEIGHT = { };
- 변수 할당의 경우 웬만하면 **const** 사용 ( 꼭 불가피하게 원시 데이터 할당 후 변경해야 하는 경우에만 let 사용)
- 조건문(if) **early return** 하기! (불가피한 경우 depth는 2까지만!)
    - 아래 연산자들 적극 활용
    - 삼항 연산자 `조건 ? true일 경우 : false일 경우`
    - 단축평가 `&&` `||`
    - 옵셔널 체이닝 `?.`
    - `??` → null, undefined인 경우 기본값 설정
- css 단위는 rem으로
    - global에서 font-size:62.5% 했으므로 px 단위 값에 곱하기 0.1한 값으로 사용 
    ex) 16px → 1.6rem
- css는 태그나 id 사용 ❌ className으로 통일
- import 순서
    - 다른 폴더 → 절대경로 ex) import GreyClockIcon from "@/public/images/clock_grey.svg";
    - 같은 폴더 → 상대경로 ex) import GreyClockIcon from "../images/clock_grey.svg";
        1. react-router 등 라이브러리
        2. 컴포넌트
        3. 사용하는 함수(util, 상수)
        4. image 파일
        5. css
- export 시
    - export default 컴포넌트
    - 함수, 상수의 경우 한 페이지에서 여러 개를 export하는 경우도 있어서, 그럴 경우 아래와 같이 하는게 어떨까하여 작성했습니다. 하나만 export 할 경우는 컴포넌트와 같이 하시면 될 것 같아요.
        - export 함수
        - export 상수
- 함수
    - 선언식으로 사용하기 (화살표 함수)

