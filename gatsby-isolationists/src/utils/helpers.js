/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
function addClass(ratio) {
  switch (true) {
    case ratio < 0.58: // ratio 29/50
      return 'tall2';
    case ratio > 1.66:
      return 'wide2';
    // case ratio > 2.5:
    //   return 'wide3';
    default:
      return '';
  }
}

const ariaExpanded = element => {
  const expanded = element.getAttribute('aria-expanded') === 'true' || false;
  element.setAttribute('aria-expanded', !expanded);
};

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function shuffle2(arr) {
  let len = arr.length;
  const d = len;
  const array = [];
  let k;
  let i;
  for (i = 0; i < d; i++) {
    k = Math.floor(Math.random() * len);
    array.push(arr[k]);
    arr.splice(k, 1);
    len = arr.length;
  }
  for (i = 0; i < d; i++) {
    arr[i] = array[i];
  }
  return arr;
}

const shuffle3 = array => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export { addClass, ariaExpanded, shuffle, shuffle2, shuffle3 };
