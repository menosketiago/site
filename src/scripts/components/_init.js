// COMPONENTS

import Avatar from './Avatar';
import BackToTop from './BackToTop';
import Cursor from './Cursor';
import Focus from './Focus';
import Input from './Input';
import Name from './Name';
import Role from './Role';
import Tooltip from './Tooltip';
import Year from './Year';

const menos = window.menos = {
    Avatar,
    BackToTop,
    Cursor,
    Focus,
    Input,
    Name,
    Role,
    Tooltip,
    Year
};

export function initComponents() {
    // AVATAR
    let avatarsArray = document.getElementsByClassName('avatar');

    if (avatarsArray) {
        Array.from(avatarsArray).forEach(avatarDOM => {
            let avatar = new Avatar(avatarDOM);

            avatar.init();
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

    // CURSOR
    let cursorArray = document.getElementsByClassName('cursor');

    if (cursorArray) {
        Array.from(cursorArray).forEach(cursorDOM => {
            let cursor = new Cursor(cursorDOM);

            cursor.init();
        });
    }

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

    // NAME
    let namesArray = document.querySelectorAll('[data-name]');

    if (namesArray) {
        Array.from(namesArray).forEach(nameDOM => {
            let name = new Name(nameDOM);
            
            name.init();
        });
    }

    // ROLE
    let rolesArray = document.getElementsByClassName('role');

    if (rolesArray) {
        Array.from(rolesArray).forEach(roleDOM => {
            let role = new Role(roleDOM);

            role.init();
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