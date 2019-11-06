class Focus {

    constructor(element) {
        this.dom = {
            document: element,
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        // Remove focus on mouse click
        document.addEventListener('mousedown', () => {
            document.activeElement-blur();
        });
    }

}

export default Focus;