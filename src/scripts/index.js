// IMPORTS

import 'unfetch/polyfill';

import {initComponents} from './components/_init';

window.initComponents = initComponents;

// INIT THE COMPONENTS

window.addEventListener('load', () => {
    window.initComponents();
});