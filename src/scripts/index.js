// IMPORTS

import 'unfetch/polyfill';
import smoothscroll from 'smoothscroll-polyfill';

import {initComponents} from './components/_init';
import {checkWebPSupport} from './components/_webp';

// INIT SMOOTH SCROLL POLYFILL

smoothscroll.polyfill();

// INIT JS

window.initComponents = initComponents;
window.modalContentFetched = false;

window.addEventListener('load', () => {
    window.initComponents();

    checkWebPSupport(function(support) {
        if (!support) document.querySelector('html').classList.add('no-webp');
    });
});