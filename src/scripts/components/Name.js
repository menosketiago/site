class Name {

    constructor(element) {
        this.dom = {
            name: element,
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        this.dom.name.addEventListener('click', (e) => this.playName());
    }

    playName() {
        const name = new Howl({
            src: ['./files/name.mp3']
        });

        name.play();
    }

}

export default Name;
