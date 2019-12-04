// IMPORTS

import 'unfetch/polyfill';
import smoothscroll from 'smoothscroll-polyfill';

import {initComponents} from './components/_init';

// INIT SMOOTH SCROLL POLYFILL

smoothscroll.polyfill();

// INIT THE COMPONENTS AND SENTRY

window.initComponents = initComponents;
window.modalContentFetched = false;

window.addEventListener('load', () => {
    window.initComponents();

    // Sentry.init({
    //     dsn: 'https://71704ea997d14762a9e711b9136cdca4@sentry.io/1844808',
    //     integrations: [
    //         new Sentry.Integrations.Breadcrumbs({ console: true })
    //     ]
    // });
});