class Cursor {

    constructor(element) {
        this.dom = {
            cursor: element
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        document.addEventListener('mousemove', (e) => this.moveCursor(e));
    }

    moveCursor(e) {
        let mousePosX, mousePosY;

        mousePosX = e.pageX;
        mousePosY = e.pageY;

        this.dom.cursor.style.top = mousePosY + 'px';
        this.dom.cursor.style.left = mousePosX + 'px';
    }

}

export default Cursor;