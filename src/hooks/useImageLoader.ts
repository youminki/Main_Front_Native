// src/hooks/useImageLoader.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useImageLoader(
  navigate: ReturnType<typeof useNavigate>,
  path: string
) {
  const [loading, setLoading] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    if (!imgs.length) {
      setLoading(false);
      return;
    }
    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (loaded === imgs.length) setLoading(false);
    };
    imgs.forEach((img) =>
      img.complete ? onLoad() : img.addEventListener('load', onLoad)
    );
    return () => imgs.forEach((img) => img.removeEventListener('load', onLoad));
  }, [path]);

  const handleBackWithExit = () => {
    setExit(true);
    setTimeout(() => navigate(-1), 300);
  };

  return { loading, exit, handleBackWithExit };
}
