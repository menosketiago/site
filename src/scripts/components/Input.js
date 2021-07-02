class Input {

    constructor(element) {
        this.dom = {
            inputWrapper: element,
            input: element.querySelector('input, textarea')
        };

        this._state = {
            hasValue: this.dom.input.value
        };
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        if (this._state.hasValue) {
            this.dom.input.classList.add('has-value');
        }
        else {
            this.dom.input.classList.remove('has-value');
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        this.dom.input.addEventListener('blur', () => {
            this.checkValidity();
        });

        this.dom.input.addEventListener("keyup", () => {
            this.checkValue();
        });
    }

    checkValidity() {
        if (this.dom.input.validity.valid) {
            this.dom.input.classList.add('is-valid');
        }

        if (!this.dom.input.validity.valid) {
            this.dom.input.classList.add('is-invalid');
        }
    }

    checkValue() {
        if (this.dom.input.value) {
            this.setState({hasValue: true});
        }
        else {
            this.setState({hasValue: false});
        }
    }

}

export default Input;