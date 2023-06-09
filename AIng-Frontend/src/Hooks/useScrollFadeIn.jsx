import { useRef, useEffect } from 'react';
// 스크롤 내릴 때 Fade in 효과 Hook
const useScrollFadeIn = (direction = 'up', duration = 1, delay = 0) => {
    const ref = useRef();
    
    useEffect(() => {
    const element = ref.current;
    if (element) {
        const handleScroll = () => {
        const { top, bottom } = element.getBoundingClientRect();
        const { innerHeight } = window;
        if (top < innerHeight && bottom >= 0) {
            element.style.transitionProperty = 'opacity transform';
            element.style.transitionDuration = `${duration}s`;
            element.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
            element.style.transitionDelay = `${delay}s`;
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }
    }, [delay, duration]);

    if (direction === 'up') {
    return {
        ref,
        style: {
        opacity: 0,
        transform: 'translateY(50px)',
        },
        };
    }

    if (direction === 'right') {
    return {
        ref,
        style: {
        opacity: 0,
        transform: 'translateX(-50px)',
        },
        };
    }

    if (direction === 'down') {
    return {
        ref,
        style: {
        opacity: 0,
        transform: 'translateY(-50px)',
        },
    };
    }

    if (direction === 'left') {
    return {
        ref,
        style: {
        opacity: 0,
        transform: 'translateX(50px)',
        },
    };
    }
};

export default useScrollFadeIn;
