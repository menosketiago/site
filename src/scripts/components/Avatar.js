class Avatar {

    constructor(element) {
        this.dom = {
            avatar: element
        };

        this.picturesArray = this.dom.avatar.getElementsByTagName('picture');
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        // Check if users prefer to not have motion
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!reducedMotion || reducedMotion.matches) {
            // Do nothing!
        }
        else {
            this.dom.avatar.addEventListener('mouseenter', (e) => this.showPictures());
            // this.dom.avatar.addEventListener('click', (e) => this.showPictures());
        }
    }

    showPictures() {
        let delay = 0;

        Array.from(this.picturesArray).forEach(picture => {
            setTimeout(() => {
                picture.style.opacity = 1;
            }, delay);

            delay += 400;
        });

        // Listen to the mouseout or second touch
        this.dom.avatar.addEventListener('mouseleave', (e) => this.hidePictures());
        // this.dom.avatar.addEventListener('click', (e) => this.hidePictures());
    }

    hidePictures() {
        const originalPicture = this.picturesArray[0];

        Array.from(this.picturesArray).forEach(picture => {
            if (picture !== originalPicture) {
                picture.style.opacity = 0;
            }
        });
    }
}

export default Avatar;