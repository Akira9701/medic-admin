import { delay } from '@/shared/lib/utils/delay.utils';
import { LoaderPinwheel } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import cn from 'classnames';

interface PageLoaderProps {
  isShow: boolean;
}

const PageLoader = ({ isShow }: PageLoaderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isShowLocal, setIsShowLocal] = useState(false);
  useEffect(() => {
    if (!isShow && isMounted) {
      setIsShowLocal(false);
      delay(300).then(() => {
        setIsMounted(false);
      });
    } else if (isShow && !isMounted) {
      setIsMounted(true);
      delay(50).then(() => {
        setIsShowLocal(true);
      });
    }
  }, [isShow]);
  return (
    isMounted && (
      <div
        className={cn(
          'flex h-dvh w-dvw items-center justify-center fixed top-0 left-0 z-50 transition-opacity duration-300 bg-white',
          isShowLocal ? 'opacity-100' : 'opacity-0',
        )}>
        <LoaderPinwheel className="animate-spin" />
      </div>
    )
  );
};

export default PageLoader;
