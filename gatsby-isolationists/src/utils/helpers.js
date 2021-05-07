function addClass(ratio) {
  switch (true) {
    case ratio < 0.65:
      return 'tall2';
    case ratio > 1.5 && ratio <= 2.4:
      return 'wide2';
    case ratio > 2.4:
      return 'wide3';
    default:
      return '';
  }
}

export { addClass };
