import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NewWindow() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(localStorage.getItem('newWindowImageUrl'));
  }, []);
  return (
    <>
      {imageUrl && (
        <div style={{ width: '100%', height: '100%' }}>
          <Image style={{ objectFit: 'contain' }} src={imageUrl} alt='새창에서 보기' fill priority />
        </div>
      )}
    </>
  );
}
