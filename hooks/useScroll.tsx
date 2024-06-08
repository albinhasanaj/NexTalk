// hooks/useScroll.js
import { useState, useEffect } from 'react';

const useScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('up');

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScroll = () => {
            const currentScrollY = window.pageYOffset;
            setScrollY(currentScrollY);
            setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', updateScroll);

        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, []);

    return { scrollY, scrollDirection };
};

export default useScroll;
