// IMPORTS
import './global/fetch';

// COMPONENTS
import Modal from './components/Modal';

const tiago = window.tiago = {
    Modal,
};

window.onload = () => {
    // MODALS
    let modalArray = document.getElementsByClassName('modal');

    if (modalArray) {
        Array.from(modalArray).forEach(modalDOM => {
            let modal = new Modal(modalDOM);
            modal.init();
        });
    }
};