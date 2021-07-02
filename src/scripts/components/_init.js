// COMPONENTS

import Focus from './Focus';
import Input from './Input';
import Name from './Name';
import BackToTop from './BackToTop';
import Tooltip from './Tooltip';
import Year from './Year';

const menos = window.menos = {
    Focus,
    Input,
    Name,
    BackToTop,
    Tooltip,
    Year
};

export function initComponents() {
    // FOCUS
    let focus = new Focus(document);

    focus.init();

    // NAME
    let namesArray = document.getElementsByClassName('name');

    if (namesArray) {
        Array.from(namesArray).forEach(nameDOM => {
            let name = new Name(nameDOM);
            
            name.init();
        });
    }

    // INPUTS
    let inputsArray = document.querySelectorAll('.input');

    if (inputsArray) {
        Array.from(inputsArray).forEach(inputDOM => {
            let input = new Input(inputDOM);
            input.init();
        });
    }

    // BACK TO TOP
    let backToTopArray = document.getElementsByClassName('back-to-top');

    if (backToTopArray) {
        Array.from(backToTopArray).forEach(backToTopDOM => {
            let backToTop = new BackToTop(backToTopDOM);

            backToTop.init();
        });
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