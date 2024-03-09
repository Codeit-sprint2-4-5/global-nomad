import { ICON } from '@/constants';

const { eye } = ICON;

interface USER_INPUT_VALIDATION_TYPE {
  email: {
    regex: RegExp;
    errorMessage: {
      empty: string;
      invalid: string;
      check: string;
      confirm: string;
    };
  };
  password: {
    regex: RegExp;
    errorMessage: {
      empty: string;
      invalid: string;
      minLength?: string;
      check: string;
    };
  };
  passwordConfirm: {
    regex?: RegExp;
    errorMessage: {
      confirm: string;
    };
  };
}

export const USER_INPUT_VALIDATION: USER_INPUT_VALIDATION_TYPE = {
  email: {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    errorMessage: {
      empty: '이메일을 입력해 주세요.',
      invalid: '잘못된 이메일 입니다.',
      check: '이메일 또는 비밀번호를 확인해 주세요.',
      confirm: '이미 사용중인 이메일 입니다.',
    },
  },
  password: {
    regex: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/,
    errorMessage: {
      empty: '비밀번호를 입력해 주세요.',
      invalid: '유효하지 않은 비밀번호 입니다.',
      minLength: '8자 이상 입력해주세요',
      check: '이메일 또는 비밀번호를 확인해 주세요',
    },
  },
  passwordConfirm: {
    errorMessage: {
      confirm: '비밀번호가 일치하지 않습니다.',
    },
  },
};

export const USER_PASSWORD_SHOW: {
  on: {
    src: string;
    alt: string;
    inputType: string;
  };
  off: {
    src: string;
    alt: string;
    inputType: string;
  };
} = {
  on: {
    src: eye.on.src,
    alt: eye.on.alt,
    inputType: 'text',
  },
  off: {
    src: eye.off.src,
    alt: eye.off.alt,
    inputType: 'password',
  },
};

export const USER_CATEGORYS = [
  { id: 1, category: '문화 예술' },
  { id: 2, category: '식음료' },
  { id: 3, category: ' 스포츠 ' },
  { id: 4, category: '투어' },
  { id: 5, category: '관광' },
  { id: 6, category: '웰빙' },
];
