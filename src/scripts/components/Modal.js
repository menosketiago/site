class Modal {

    constructor(element) {
        this.dom = {
            modal: element,
        }
    }

    init() {
        this.eventHandler();

        this.test();
    }

    eventHandler() {

    }

    test() {
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
