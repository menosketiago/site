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
        // On tab press add the focus class
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Tab') {
                // Get all elements with key-focus class
                let focusedItemArray = document.getElementsByClassName('has-focus');

                // Remove the focus class from previous element
                Array.from(focusedItemArray).forEach( item => {
                    item.classList.remove('has-focus');
                });

                document.activeElement.classList.add('has-focus');
            }
        });

        // Remove focus on mouse click
        document.addEventListener('mousedown', () => {
            // Check if the key-focus class exists
            let focusedElement = document.querySelector('.has-focus');

            // Remove focus
            if (focusedElement != null) focusedElement.classList.remove('has-focus');
        });
    }

}

export default Focus;