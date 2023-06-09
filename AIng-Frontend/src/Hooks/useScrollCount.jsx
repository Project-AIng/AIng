import { useRef, useEffect, useCallback } from 'react';

const useScrollCountHook = (end, start = 0, duration = 3000, delay = 0) => {
  const elementRef = useRef();
  const observerRef = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const handleScroll = useCallback(([entry]) => {
    const { current } = elementRef;
    if (entry.isIntersecting) {
      let currentNumber = start;
      const counter = setInterval(() => {
        currentNumber += 1;
        current.innerHTML = currentNumber;
        if (currentNumber === end) {
          clearInterval(counter);
          observerRef.current.disconnect(elementRef.current);
        }
      }, stepTime);
    }
  }, [end, start, stepTime]);

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observerRef.current.observe(elementRef.current);
    }

    return () => observerRef.current && observerRef.current.disconnect();
  }, [handleScroll]);

  return {
    ref: elementRef,
  };
};

export default useScrollCountHook;
