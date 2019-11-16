// IMPORTS

import 'unfetch/polyfill';
import smoothscroll from 'smoothscroll-polyfill';

import {initComponents} from './components/_init';

// INIT SMOOTH SCROLL POLYFILL

smoothscroll.polyfill();

// INIT THE COMPONENTS

window.initComponents = initComponents;

window.addEventListener('load', () => {
    window.initComponents();
});