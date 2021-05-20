import { useState, useEffect } from 'react';

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = evt => {
      // If the active element exists and is clicked outside of
      // console.log(el, evt.target.nodeName);
      if (
        el.current !== null &&
        (!el.current.contains(evt.target) || evt.target.nodeName === 'A')
      ) {
        setIsActive(state => !state);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
