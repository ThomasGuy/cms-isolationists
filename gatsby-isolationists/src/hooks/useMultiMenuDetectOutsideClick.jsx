import { useState, useEffect } from 'react';
import { ariaExpanded } from '../utils/helpers';

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = evt => {
      // console.log('event.target', evt.target);
      // If the active element exists and is clicked outside of
      if (
        el.current !== null &&
        (!el.current.contains(evt.target) ||
          evt.target.nodeName === 'A' ||
          evt.target.getAttribute('aria-label') === 'home-icon')
      ) {
        setIsActive(state => !state);
        ariaExpanded(document.querySelector('#burger-menu-button'));
        // console.log('el.current', el.current);
        // console.log('event target node', evt.target.nodeName);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
      // console.log('not active');
    };
  }, [isActive]);

  return [isActive, setIsActive];
};

export default useDetectOutsideClick;
