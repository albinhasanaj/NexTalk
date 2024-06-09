import { useState, useEffect } from 'react';

const useScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('up');

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScroll = () => {
            const currentScrollY = window.pageYOffset;

            if (Math.abs(currentScrollY - lastScrollY) > 1) {
                setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
                lastScrollY = currentScrollY;
            }

            setScrollY(currentScrollY);
        };

        window.addEventListener('scroll', updateScroll);

        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, []);

    return { scrollY, scrollDirection };
};

export default useScroll;
