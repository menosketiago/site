class BackToTop {

    constructor(element) {
        this.dom = {
            backToTop: element,
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        window.addEventListener('scroll', (e) => this.handleScroll());
    }

    handleScroll() {
        const rootElement = document.documentElement;

        let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

        if ((rootElement.scrollTop / scrollTotal ) > 0.05 ) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    show() {
        this.dom.backToTop.classList.add('is-visible');
    }

    hide() {
        this.dom.backToTop.classList.remove('is-visible');
    }

}

export default BackToTop;
