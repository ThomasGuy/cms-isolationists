import { useState, useEffect } from 'react';
import { ariaExpanded } from '../utils/helpers';

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = evt => {
      // evt.stopPropagation();
      // If the active element exists and is clicked outside of
      if (
        el.current !== null &&
        (!el.current.contains(evt.target) ||
          evt.target.nodeName === 'A' ||
          evt.target.getAttribute('aria-label') === 'home-icon')
      ) {
        setIsActive(state => !state);
        if (el.current.hasAttribute('aria-expanded')) ariaExpanded(el.current);
      }
      // console.log('event target', evt.target);
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
      // console.log('active');
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
      // console.log('not active');
    };
  }, [isActive]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
