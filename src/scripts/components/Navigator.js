class Navigator {

    constructor(element) {
        this.dom = {
            main: element
        }

        this.initialSection = this.dom.main.querySelector('section');
        this.targetSection = undefined;
        this.sectionsArray = this.dom.main.querySelectorAll('section');
        this.links = document.querySelectorAll('nav a');

        this.sectionHeader = document.querySelector('.current-section h4');

        this.btnUp = this.dom.main.querySelector('.scroll.up');
        this.btnDown = this.dom.main.querySelector('.scroll.down');
        this.btnTop = this.dom.main.querySelector('.scroll.top');
        this.btnRight = this.dom.main.querySelector('.scroll.right');

        this._state = {
            currentSection: this.initialSection
        };
    }

    init() {
        this.checkVisibleSection();
        this.eventHandler();
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        this._state.currentSection.scrollIntoView({behavior: 'smooth'});
        history.replaceState({}, '', '#' + this._state.currentSection.id);

        // Set the current section id as the currently viewing title on the header
        this.sectionHeader.textContent = this._state.currentSection.id;
    }

    eventHandler() {
        window.addEventListener('load', () => {
            this.setButtonVisibility();
        });

        // Listen to click on the main nav links
        Array.from(this.links).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                let id = e.target.href.split('#')[1];

                this.targetSection = this.dom.main.querySelector('section#' + id);

                this.navigate(this.targetSection);
            });
        });

        // Listen to clicks on the scroll up button
        this.btnUp.addEventListener('click', () => {
            this.targetSection = this._state.currentSection.previousElementSibling;

            this.navigate(this.targetSection);
        });

        // Listen to clicks on the scroll down button
        this.btnDown.addEventListener('click', () => {
            this.targetSection = this._state.currentSection.nextElementSibling;

            this.navigate(this.targetSection);
        });

        // Listen to clicks on the back to top button
        this.btnTop.addEventListener('click', () => {
            this.navigate(this.initialSection);
        });

        // Listen to keypress events
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowUp'||
                e.code === 'ArrowRight' ||
                e.code === 'ArrowLeft' ||
                e.code === 'ArrowDown') {
                    e.preventDefault();
            }

            // If you press up navigate up
            if (e.code === 'ArrowUp' &&
                this._state.currentSection !== this.sectionsArray[0] ||
                e.code === 'KeyW' &&
                this._state.currentSection !== this.sectionsArray[0]) {
                    this.targetSection = this._state.currentSection.previousElementSibling;

                    this.navigate(this.targetSection);
            }

            // If you press down navigate down
            if (e.code === 'ArrowDown' &&
                this._state.currentSection !== this.sectionsArray[this.sectionsArray.length - 1] ||
                e.code === 'KeyS' &&
                this._state.currentSection !== this.sectionsArray[this.sectionsArray.length - 1]) {
                    this.targetSection = this._state.currentSection.nextElementSibling;

                    this.navigate(this.targetSection);
            }

            // If you are on the work section allow left/right navigation
            if (this._state.currentSection.id === 'work') {
                if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                    // Navigate to the left
                }

                if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                    // Navigate to the right
                }
            }
        });

        // Listen to main scroll
        this.dom.main.addEventListener('scroll', () => this.checkVisibleSection());
    }

    navigate(targetSection) {
        this.setState({currentSection: targetSection});
        this.setCurrentLink();
        this.setButtonVisibility();
    }

    setCurrentLink() {
        Array.from(this.links).forEach(link => {
            link.classList.remove('is-current');

            if (link.href.split('#')[1] === this._state.currentSection.id) {
                link.classList.add('is-current');
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
            this.btnTop.classList.remove('is-hidden')
        }
        else {
            this.btnDown.classList.remove('is-hidden');
            this.btnTop.classList.add('is-hidden')
        }

        // Change the up and down button colors if on the about section
        if (this._state.currentSection.id === 'about') {
            this.btnUp.classList.add('on-yellow');
            this.btnDown.classList.add('on-yellow');
        }
        else {
            this.btnUp.classList.remove('on-yellow');
            this.btnDown.classList.remove('on-yellow');
        }

        // Show the button to move right only on the work section
        if (this._state.currentSection.id === 'work') {
            this.btnRight.classList.remove('is-hidden');
        }
        else {
            this.btnRight.classList.add('is-hidden');
        }
    }

    checkVisibleSection() {
        let mainTop = this.dom.main.getBoundingClientRect().top;

        Array.from(this.sectionsArray).forEach(section => {
            let sectionTop = section.getBoundingClientRect().top;

            if (mainTop === sectionTop) this.navigate(section);
        });
    }

}

export default Navigator;
