// COMPONENTS

import Focus from './Focus';
import Input from './Input';
import Modal from './Modal';
import Name from './Name';
import Navigator from './Navigator';
import Tooltip from './Tooltip';
import Year from './Year';

const menos = window.menos = {
    Focus,
    Input,
    Modal,
    Name,
    Navigator,
    Tooltip,
    Year
};

export function initComponents() {
    // FOCUS
    let focus = new Focus(document);

    focus.init();

    // INPUTS
    let inputsArray = document.querySelectorAll('.input');

    if (inputsArray) {
        Array.from(inputsArray).forEach(inputDOM => {
            let input = new Input(inputDOM);
            input.init();
        });
    }

    // MODAL
    const workDOM = document.getElementById('modal');

    if (workDOM) {
        const modal = new Modal(workDOM);
        modal.init();
    }

    // NAME
    let namesArray = document.getElementsByClassName('name');

    if (namesArray) {
        Array.from(namesArray).forEach(nameDOM => {
            let name = new Name(nameDOM);
            name.init();
        });
    }

    // NAVIGATOR
    const mainDOM = document.querySelector('main');

    if (mainDOM) {
        const navigator = new Navigator(mainDOM);
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

    // CURRENT YEAR
    let yearArray = document.querySelectorAll('[data-year]');

    if (yearArray) {
        Array.from(yearArray).forEach(yearDOM => {
            let year = new Year(yearDOM);
            year.init();
        });
    }
}