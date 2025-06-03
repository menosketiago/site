class Sticker {

    constructor(element) {
        this.dom = {
            sticker: element,
        }

        this.initialMousePosY = 0;
        this.initialMousePosX = 0;
        this.newPosY = 0;
        this.newPosX = 0;
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        this.dom.sticker.addEventListener('mousedown', (e) => this.dragSticker(e));
    }

    dragSticker(e) {
        e.preventDefault();

        this.initialMousePosX = e.clientX;
        this.initialMousePosY = e.clientY;

        // Store bound handlers so they can be removed later
        this.moveHandler = (e) => this.moveSticker(e);
        this.upHandler = (e) => this.dropSticker(e);

        document.addEventListener('mousemove', this.moveHandler);
        document.addEventListener('mouseup', this.upHandler);
    }

    moveSticker(e) {
        e.preventDefault();

        this.newPosY = this.initialMousePosY - e.clientY;
        this.newPosX = this.initialMousePosX - e.clientX;

        // Set the new initial position
        this.initialMousePosX = e.clientX;
        this.initialMousePosY = e.clientY;

        // Set the sticker new position
        this.dom.sticker.style.top = (this.dom.sticker.offsetTop - this.newPosY) + "px";
        this.dom.sticker.style.left = (this.dom.sticker.offsetLeft - this.newPosX) + "px";
    }

    dropSticker(e) {
        document.removeEventListener('mousemove', this.moveHandler);
        document.removeEventListener('mouseup', this.upHandler);
    }

}

export default Sticker;
