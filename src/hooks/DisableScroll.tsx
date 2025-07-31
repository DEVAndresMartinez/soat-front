import { useEffect } from 'react';

export function useDisableScroll(isActive: boolean) {
  useEffect(() => {
    if (isActive) {
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isActive]);
}
