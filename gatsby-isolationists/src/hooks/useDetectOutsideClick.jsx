import { useState, useEffect } from 'react';

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = evt => {
      // If the active element exists and is clicked outside of
      // console.log('aria-hidden', evt.target.hasAttribute('aria-hidden'));
      if (
        el.current !== null &&
        (!el.current.contains(evt.target) ||
          evt.target.nodeName === 'A' ||
          evt.target.hasAttribute('aria-hidden'))
      ) {
        setIsActive(state => !state);
        // this is only relavant for BigNav aria-expanded
        const but = el.current?.children[0];
        if (el.current !== null && but.type === 'button') {
          const expanded = but.getAttribute('aria-expanded') === 'true' || false;
          but.setAttribute('aria-expanded', !expanded);
        }
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
