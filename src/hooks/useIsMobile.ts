import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 600) {
    const [isMob, setIsMob] = useState(
        window.matchMedia(`(max-width: ${breakpoint}px)`).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleChange = (event: MediaQueryListEvent) => {
            setIsMob(event.matches);
        };

        setIsMob(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [breakpoint]);

    return isMob;
}