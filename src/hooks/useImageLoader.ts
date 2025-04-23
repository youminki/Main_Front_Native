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
    // reset loading on path change
    setLoading(true);
    const imgs = Array.from(document.querySelectorAll('img'));
    if (imgs.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    const onLoadOrError = () => {
      loadedCount += 1;
      if (loadedCount >= imgs.length) {
        setLoading(false);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) {
        onLoadOrError();
      } else {
        img.addEventListener('load', onLoadOrError);
        img.addEventListener('error', onLoadOrError);
      }
    });

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener('load', onLoadOrError);
        img.removeEventListener('error', onLoadOrError);
      });
    };
  }, [path]);

  const handleBackWithExit = () => {
    setExit(true);
    setTimeout(() => navigate(-1), 300);
  };

  return { loading, exit, handleBackWithExit };
}
