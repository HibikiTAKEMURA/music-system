export const BASE_URL = '/music-system/#/';

export const BASE_URL_NO_SLASH = '/music-system/#';

export const PAGE_URLS = {
    SCALE : 'scale',
    CHORD : 'chord',
    OSCILLATOR : 'frequency',
    SCORE : 'score',
};

export const URLS = [
    {
        url: BASE_URL + PAGE_URLS.SCALE,
        title: 'Scale',
    },
    {
        url: BASE_URL + PAGE_URLS.CHORD,
        title: 'Chord',
    },
    {
        url: BASE_URL + PAGE_URLS.OSCILLATOR,
        title: 'Oscillator',
    },
    {
        url: BASE_URL + PAGE_URLS.SCORE,
        title: 'Score',
    },
];