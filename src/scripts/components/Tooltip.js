class Tooltip {

    constructor(element) {
        this.dom = {
            trigger: element,
            content: element.getAttribute('data-tooltip') || false,
            tooltip: document.querySelector('.tooltip')
        };

        this.main = document.querySelector(`main`);
        this.isBlue = this.dom.trigger.hasAttribute('data-blue');

        this._state = {
            isVisible: this.dom.tooltip.classList.contains('is-visible')
        };
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        if (this._state.isVisible) {
            this.dom.tooltip.classList.add('is-visible');
        }
        else {
            this.dom.tooltip.classList.remove('is-visible');
            this.dom.tooltip.removeAttribute('style');
        }
    }

    init() {
        if (this.dom.content) this.eventHandler();
    }

    eventHandler() {
        this.dom.trigger.addEventListener('mouseover', (e) => this.setTooltipContent());

        this.dom.trigger.addEventListener('mouseout', () => this.hide());

        window.addEventListener('scroll', () => this.hide(), true);
    }

    setTooltipContent() {
        // Set the tooltip content according to the data-tooltip content
        this.dom.tooltip.innerHTML = this.dom.content;

        if (this.isBlue) {
            this.dom.tooltip.classList.add('blue');
        }
        else {
            this.dom.tooltip.classList.remove('blue');
        }

        // Position the tooltip
        this.positionTooltip();
    }

    positionTooltip() {
        let trigger, tooltip, margin, triggerRect, top, left, offsetTop, offsetRight, offsetLeft;

        trigger = this.dom.trigger;
        tooltip = this.dom.tooltip;
        margin = 8;

        // Get the trigger location
        triggerRect = this.dom.trigger.getBoundingClientRect();

        offsetTop = triggerRect.top - tooltip.offsetHeight;
        offsetRight = triggerRect.left - tooltip.offsetWidth;
        offsetLeft = window.innerWidth - (triggerRect.left + tooltip.offsetWidth);

        top = parseInt(triggerRect.bottom) - trigger.offsetHeight - tooltip.offsetHeight - margin;
        left = parseInt(triggerRect.left) + (trigger.offsetWidth / 2) - (tooltip.offsetWidth / 2);

        tooltip.style.top = top + pageYOffset + 'px';
        tooltip.style.left = left + pageXOffset + 'px';

        // Show the tooltip
        this.show();
    }

    show() {
        this.setState({isVisible: true});
    }

    hide() {
        this.setState({isVisible: false});

        // Empty the tooltip
        this.dom.tooltip.innerHTML = '';
    }

}

export default Tooltip;
