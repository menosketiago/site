class Modal {

    constructor(element) {
        this.dom = {
            modal: element,
            id: element.id
        }

        this.triggers = document.querySelectorAll(`[data-trigger="${this.dom.id}"]`);

        this._state = {
            isVisible: this.dom.modal.classList.contains('is-visible')
        };

        this.events = {
            closeModalEvent: new CustomEvent('closeModal', {detail: {id: this.id}}),
            showModalEvent: new CustomEvent('showModal', {detail: {id: this.id}})
        };
    }

    init() {
        this.eventHandler();
        this.fetchContent();
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        if (this._state.isVisible) {
            this.dom.modal.classList.add('is-visible');
            this.dom.modal.dispatchEvent(this.events.showModalEvent);
        }
        else {
            this.dom.modal.classList.remove('is-visible');
            this.dom.modal.dispatchEvent(this.events.closeModalEvent);
        }
    }

    eventHandler() {

    }

    show() {
        this.setState({isVisible: true});

        // Close Dialog on Esc keypress
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Escape') this.hide();
        }, { once: true });
    }

    hide() {
        this.setState({isVisible: false});
    }

    fetchContent() {
        async function fetchHtmlAsText(url) {
            return await (await fetch(url)).text();
        }

        async function fetch() {
            const fetchTarget = document.getElementById('fetch-target');

            fetchTarget.innerHTML = await fetchHtmlAsText('work/test.html');
        }
    }

}

export default Modal;
