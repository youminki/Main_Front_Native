import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useImageLoader() {
  const [loading, setLoading] = useState(true);
  const [exit, setExit] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // React Native에서는 이미지 로딩을 다르게 처리
    // 기본적으로 로딩 상태를 false로 설정
    setLoading(false);
  }, []);

  const handleBackWithExit = () => {
    setExit(true);
    setTimeout(() => navigation.goBack(), 300);
  };

  return { loading, exit, handleBackWithExit };
}
