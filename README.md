# Melpik Native App

React Native로 개발된 Melpik 모바일 애플리케이션입니다.

## 🚀 기술 스택

- **React Native** - 모바일 앱 개발 프레임워크
- **TypeScript** - 타입 안전성
- **React Navigation** - 네비게이션
- **AsyncStorage** - 로컬 스토리지
- **Axios** - HTTP 클라이언트
- **Expo** - 개발 도구 및 배포 플랫폼
- **Yarn** - 패키지 매니저

## 📱 주요 기능

- **홈** - 상품 목록 및 상세 정보
- **브랜드** - 브랜드별 상품 조회
- **락커룸** - 개인 상품 관리
- **멜픽** - 상품 등록 및 관리
- **마이스타일** - 개인 스타일 관리
- **인증** - 로그인/회원가입

## 🛠 설치 및 실행

### 필수 요구사항

- Node.js 18.0 이상
- Yarn 패키지 매니저
- Expo CLI
- iOS Simulator (macOS) 또는 Android Emulator

### 설치

```bash
# Yarn 설치 (전역)
npm install -g yarn

# 의존성 설치
yarn install

# Expo CLI 설치 (전역)
yarn global add @expo/cli
```

### 실행

```bash
# 개발 서버 시작
yarn start

# iOS 시뮬레이터에서 실행
yarn ios

# Android 에뮬레이터에서 실행
yarn android

# 캐시 초기화 후 시작
yarn reset-cache

# 린트 검사
yarn lint

# 테스트 실행
yarn test
```

### 추가 명령어

```bash
# 의존성 정리 및 재설치
yarn clean

# 새 패키지 추가
yarn add [패키지명]

# 개발 의존성 추가
yarn add -D [패키지명]

# 패키지 제거
yarn remove [패키지명]

# 의존성 업데이트
yarn upgrade

# Expo 빌드
yarn build:android
yarn build:ios

# Expo 상태 확인
yarn doctor

# Expo 프로젝트 설정
yarn prebuild
```

## 📁 프로젝트 구조

```
src/
├── api/                 # API 관련 파일들
│   ├── auth/           # 인증 API
│   ├── user/           # 사용자 API
│   ├── product/        # 상품 API
│   └── ...
├── components/         # 재사용 가능한 컴포넌트들
│   ├── common/         # 공통 컴포넌트
│   ├── Home/           # 홈 관련 컴포넌트
│   └── ...
├── pages/             # 페이지 컴포넌트들
│   ├── Home/          # 홈 페이지
│   ├── Brand/         # 브랜드 페이지
│   └── ...
├── hooks/             # 커스텀 훅들
├── styles/            # 스타일 관련 파일들
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수들
└── config/            # 설정 파일들
```

## 🔧 주요 설정 파일들

- `package.json` - 프로젝트 설정 및 의존성
- `yarn.lock` - Yarn 의존성 잠금 파일
- `app.json` - Expo 앱 설정
- `metro.config.js` - Metro 번들러 설정
- `babel.config.js` - Babel 설정
- `tsconfig.json` - TypeScript 설정

## 📱 플랫폼별 설정

### iOS

- `ios/` 디렉토리에 iOS 네이티브 설정
- Xcode에서 프로젝트 열기 가능

### Android

- `android/` 디렉토리에 Android 네이티브 설정
- Android Studio에서 프로젝트 열기 가능

## 🚀 배포

### Expo EAS Build

```bash
# EAS CLI 설치
yarn global add @expo/eas-cli

# 빌드 설정
eas build:configure

# iOS 빌드
eas build --platform ios

# Android 빌드
eas build --platform android
```

### Expo Submit

```bash
# App Store 제출
eas submit --platform ios

# Google Play Store 제출
eas submit --platform android
```

## 🔍 개발 가이드

### 컴포넌트 작성

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../styles/common';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  title: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default MyComponent;
```

### 네비게이션 사용

```typescript
import {useNavigation} from '@react-navigation/native';

const MyScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('HomeDetail', {productId: 123});
  };

  return (
    // 컴포넌트 내용
  );
};
```

### API 호출

```typescript
import { Axios } from '../api/Axios';

const fetchData = async () => {
  try {
    const response = await Axios.get('/api/endpoint');
    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};
```

## 🐛 문제 해결

### 일반적인 문제들

1. **Metro 캐시 문제**

   ```bash
   yarn reset-cache
   ```

2. **의존성 문제**

   ```bash
   yarn clean
   ```

3. **iOS 빌드 문제**

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android 빌드 문제**

   ```bash
   cd android && ./gradlew clean && cd ..
   ```

5. **Expo 상태 확인**
   ```bash
   yarn doctor
   ```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
