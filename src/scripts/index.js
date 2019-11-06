// COMPONENTS

import Focus from './components/Focus';
import Modal from './components/Modal';
import Navigator from './components/Navigator';
import Year from './components/Year';

const tiago = window.tiago = {
    Focus,
    Modal,
    Navigator,
    Year
};


window.onload = () => {
    // FOCUS
    let focus = new Focus(document);
    focus.init();

    // CURRENT YEAR
    let yearArray = document.querySelectorAll('[data-year]');

    if (yearArray) {
        Array.from(yearArray).forEach(yearDOM => {
            let year = new Year(yearDOM);
            year.init();
        });
    }

    // MODALS
    let modalArray = document.getElementsByClassName('modal');

    if (modalArray) {
        Array.from(modalArray).forEach(modalDOM => {
            let modal = new Modal(modalDOM);
            modal.init();
        });
    }

    // NAVIGATOR
    let main = document.querySelector('main');

    let navigator = new Navigator(main);
    navigator.init();
};