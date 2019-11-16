class Navigator {

    constructor(element) {
        this.dom = {
            main: element,
            section: element.querySelector('#work')
        }

        this.sectionsArray = this.dom.main.querySelectorAll('main > section');

        if (location.hash) {
            this.initialSection = this.dom.main.querySelector(location.hash);
        }
        else {
            this.initialSection = this.sectionsArray[0];
        }

        this.targetSection = '';

        this.logo = document.querySelector('header .logo');
        this.links = document.querySelectorAll('nav a');

        this.currentlyViewing = document.querySelector('.current-section h4');

        this.btnUp = this.dom.main.querySelector('.scroll.up');
        this.btnDown = this.dom.main.querySelector('.scroll.down');
        this.btnTop = this.dom.main.querySelector('.scroll.top');

        this.wrappersArray = this.dom.main.querySelectorAll('#work .wrapper');
        this.initialWrapper = this.dom.main.querySelector('#work .wrapper');
        this.targetWrapper = '';

        this.btnRight = this.dom.main.querySelector('.scroll.right');
        this.btnLeft = this.dom.main.querySelector('.scroll.left');

        this._state = {
            currentSection: this.initialSection,
            currentWrapper: this.initialWrapper,
        };
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        // Likely due to racing conditions we need a timeout for the scroll to work
        setTimeout(() => {
            this._state.currentSection.scrollIntoView({behavior: 'smooth'});
        }, 0);

        // Set the currently viewing title on the header
        this.currentlyViewing.textContent = this._state.currentSection.id;

        // Update the URL
        history.replaceState({}, '', '#' + this._state.currentSection.id);
    }

    init() {
        this.eventHandler();
        this.changeSection(this._state.currentSection);
    }

    eventHandler() {
        document.addEventListener('click', (e) => {
            // Listen for logo clicks
            if (e.target === this.logo) {
                e.preventDefault();

                this.targetSection = this.sectionsArray[0];

                this.changeSection(this.targetSection);
            }

            // Listen to click on the main nav links
            Array.from(this.links).forEach(link => {
                if (e.target === link) {
                    e.preventDefault();

                    // Get the targer section from the URL
                    let id = e.target.href.split('#')[1];

                    this.targetSection = this.dom.main.querySelector('#' + id);

                    this.changeSection(this.targetSection);
                }
            });

            // Listen to clicks on the scroll up button
            if (e.target === this.btnUp) {
                this.targetSection = this._state.currentSection.previousElementSibling;

                this.changeSection(this.targetSection);
            }

            // Listen to clicks on the scroll down button
            if (e.target === this.btnDown) {
                this.targetSection = this._state.currentSection.nextElementSibling;

                this.changeSection(this.targetSection);
            }

            // Listen to clicks on the back to top button
            if (e.target === this.btnTop) {
                this.changeSection(this.sectionsArray[0]);
            }

            // Listen to clicks on the navigate right button
            if (e.target === this.btnRight) {
                this.targetWrapper = this._state.currentWrapper.nextElementSibling;

                this.changeWrapper(this.targetWrapper);
            }

            // Listen to clicks on the navigate left button
            if (e.target === this.btnLeft) {
                this.targetWrapper = this._state.currentWrapper.previousElementSibling;

                this.changeWrapper(this.targetWrapper);
            }
        });

        // Listen to keypress events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp'||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowDown') {
                    e.preventDefault();
            }

            // If you press up navigate up
            if (e.key === 'ArrowUp' &&
                this._state.currentSection !== this.sectionsArray[0] ||
                e.key === 'w' &&
                this._state.currentSection !== this.sectionsArray[0]) {
                    this.targetSection = this._state.currentSection.previousElementSibling;

                    this.changeSection(this.targetSection);
            }

            // If you press down navigate down
            if (e.key === 'ArrowDown' &&
                this._state.currentSection !== this.sectionsArray[this.sectionsArray.length - 1] ||
                e.key === 's' &&
                this._state.currentSection !== this.sectionsArray[this.sectionsArray.length - 1]) {
                    this.targetSection = this._state.currentSection.nextElementSibling;

                    this.changeSection(this.targetSection);
            }

            // If you are on the work section allow left/right navigation
            if (this._state.currentSection.id === 'work') {
                if (this._state.currentWrapper !== this.wrappersArray[this.wrappersArray.length - 1] &&
                    e.key === 'ArrowRight' ||
                    this._state.currentWrapper !== this.wrappersArray[this.wrappersArray.length - 1] &&
                    e.key === 'd') {
                        this.targetWrapper = this._state.currentWrapper.nextElementSibling;

                        this.changeWrapper(this.targetWrapper);
                }

                if (this._state.currentWrapper !== this.wrappersArray[0] &&
                    e.key === 'ArrowLeft' ||
                    this._state.currentWrapper !== this.wrappersArray[0] &&
                    e.key === 'a') {
                        this.targetWrapper = this._state.currentWrapper.previousElementSibling;

                        this.changeWrapper(this.targetWrapper);
                }
            }
        });

        // Listen to main scroll
        this.dom.main.addEventListener('scroll', () => this.checkVisibleSection());
    }

    changeSection(targetSection) {
        this.setState({currentSection: targetSection});

        this.setCurrentLink();
        this.setButtonVisibility();
    }

    changeWrapper(targetWrapper) {
        this.setState({currentWrapper: targetWrapper});

        // Navigate to the right work items page
        setTimeout(() => {
            let leftPosition = this._state.currentWrapper.getBoundingClientRect().left;

            this.dom.section.scrollTo({left: leftPosition, behavior: 'smooth'});
            // this._state.currentWrapper.scrollIntoView({behavior: 'smooth'});
        }, 0);

        this.setButtonVisibility();
    }

    setCurrentLink() {
        Array.from(this.links).forEach(link => {
            link.classList.remove('is-current');
            link.tabIndex = 0;

            if (link.href.split('#')[1] === this._state.currentSection.id) {
                link.classList.add('is-current');
                link.tabIndex = -1;
            }
        });
    }

    setButtonVisibility() {
        // Show or hide the up button
        if (this._state.currentSection === this.sectionsArray[0]) {
            this.btnUp.classList.add('is-hidden');
        }
        else {
            this.btnUp.classList.remove('is-hidden');
        }

        // Show or hide the down button and the back to top button
        if (this._state.currentSection === this.sectionsArray[this.sectionsArray.length - 1]) {
            this.btnDown.classList.add('is-hidden');
            this.btnTop.classList.remove('is-hidden');
        }
        else {
            this.btnDown.classList.remove('is-hidden');
            this.btnTop.classList.add('is-hidden');
        }

        // Change the up and down button colors if on the about section
        if (this._state.currentSection.id === 'about') {
            this.btnUp.classList.add('blue');
            this.btnDown.classList.add('blue');
        }
        else {
            this.btnUp.classList.remove('blue');
            this.btnDown.classList.remove('blue');
        }

        // Show the button to move left/right only on the work section
        if (this._state.currentSection.id === 'work') {
            this.btnRight.classList.remove('is-hidden');

            // If the current wrapper is not the first one show the left button
            if (this._state.currentWrapper !== this.wrappersArray[0]) {
                this.btnLeft.classList.remove('is-hidden');
            }

            // If the current wrapper is the first one hide the left button
            if (this._state.currentWrapper === this.wrappersArray[0]) {
                this.btnLeft.classList.add('is-hidden');
            }

            // If the current wrapper is the last one hide the right btn
            if (this._state.currentWrapper === this.wrappersArray[this.wrappersArray.length - 1]) {
                this.btnRight.classList.add('is-hidden');
            }
        }
        else {
            this.btnRight.classList.add('is-hidden');
            this.btnLeft.classList.add('is-hidden');
        }
    }

    checkVisibleSection() {
        let mainTop = this.dom.main.getBoundingClientRect().top;

        Array.from(this.sectionsArray).forEach(section => {
            let sectionTop = section.getBoundingClientRect().top;

            if (mainTop === sectionTop) this.changeSection(section);
        });
    }

}

export default Navigator;
