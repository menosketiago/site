// IMPORTS

import {initComponents} from './components/_init';

// INIT JS

window.initComponents = initComponents;
window.modalContentFetched = false;

window.addEventListener('load', () => {
    window.initComponents();
});