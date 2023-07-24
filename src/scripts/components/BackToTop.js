class BackToTop {

    constructor(element) {
        this.dom = {
            backToTop: element,
        }

        this.themeToggleFlag = document.querySelector('[data-toggle-theme]');
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

        if (this.themeToggleFlag) {
            this.themeToggleFlag.classList.add('theme-white');
        }
    }

    hide() {
        this.dom.backToTop.classList.remove('is-visible');

        if (this.themeToggleFlag) {
            this.themeToggleFlag.classList.remove('theme-white');
        }
    }

}

export default BackToTop;
