function addClass(ratio) {
  switch (true) {
    case ratio < 0.58: // ratio 29/50
      return 'tall2';
    case ratio > 1.52 && ratio <= 2.5:
      return 'wide2';
    // case ratio > 2.5:
    //   return 'wide3';
    default:
      return '';
  }
}

export { addClass };
