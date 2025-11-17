export const BASE_URL = '/music-system/#/';

export const BASE_URL_NO_SLASH = '/music-system/#';

export const PAGE_URLS = {
  SCALE : 'scale',
  CHORD : 'chord',
  OSCILLATOR : 'frequency',
  SCORE : 'score',
  IREAL : 'ireal',
  SET_LIST_SORT : 'setListSort',
};

export const PAGE_TITLES = {
  SCALE : 'Scale',
  CHORD : 'Chord',
  OSCILLATOR : 'Oscillator',
  SCORE : 'Score',
  IREAL : 'iReal Data',
  SET_LIST_SORT : 'Set List Sort',
};

export const URLS = [
  {
    url: BASE_URL + PAGE_URLS.SCALE,
    title: PAGE_TITLES.SCALE,
  },
  {
    url: BASE_URL + PAGE_URLS.CHORD,
    title: PAGE_TITLES.CHORD,
  },
  {
    url: BASE_URL + PAGE_URLS.OSCILLATOR,
    title: PAGE_TITLES.OSCILLATOR,
  },
  {
    url: BASE_URL + PAGE_URLS.SCORE,
    title: PAGE_TITLES.SCORE,
  },
  {
    url: BASE_URL + PAGE_URLS.IREAL,
    title: PAGE_TITLES.IREAL,
  },
  {
    url: BASE_URL + PAGE_URLS.SET_LIST_SORT,
    title: PAGE_TITLES.SET_LIST_SORT,
  },

];