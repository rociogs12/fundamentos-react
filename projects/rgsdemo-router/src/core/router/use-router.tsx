import { useState, useEffect } from "react";

export const useRouter = () => {
    const [currentPath, setCurrentPath] = useState<string>(
        window.location.pathname,
      );
    
      useEffect(() => {
        const handlePopState = () => {
          setCurrentPath(window.location.pathname)
        }
    
        window.addEventListener('popstate', handlePopState);
        return () => {
          window.removeEventListener('popstate', handlePopState);
        }
      }, []);

      return currentPath;
}