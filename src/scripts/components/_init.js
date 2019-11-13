// COMPONENTS

import Focus from './Focus';
import Modal from './Modal';
import Navigator from './Navigator';
import Tooltip from './Tooltip';
import Year from './Year';

const menos = window.menos = {
    Focus,
    Modal,
    Navigator,
    Tooltip,
    Year
};

export function initComponents() {
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

    if (main) {
        let navigator = new Navigator(main);
        navigator.init();
    }

    // TOOLTIPS
    let tooltipsArray = document.querySelectorAll('[data-tooltip]');

    if (tooltipsArray) {
        Array.from(tooltipsArray).forEach(tooltipDOM => {
            let tooltip = new Tooltip(tooltipDOM);
            tooltip.init();
        });
    }
}