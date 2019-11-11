class Tooltip {

    constructor(element) {
        this.dom = {
            trigger: element,
            content: element.getAttribute('data-tooltip')
        };

        this.tooltip = document.querySelector('.tooltip');
        this.main = document.querySelector(`main`);

        this._state = {
            isVisible: this.tooltip.classList.contains('is-visible')
        };
    }

    setState(props) {
        this._state = Object.assign(this._state, props);
        this._updateDom();
    }

    _updateDom() {
        if (this._state.isVisible) {
            this.tooltip.classList.add('is-visible');
        }
        else {
            this.tooltip.classList.remove('is-visible');
            this.tooltip.removeAttribute('style');
        }
    }

    init() {
        this.eventHandler();
    }

    eventHandler() {
        this.dom.trigger.addEventListener('mouseover', (e) => this.setTooltipContent());

        this.dom.trigger.addEventListener('mouseout', () => this.hide());
    }

    setTooltipContent() {
        // Set the tooltip content according to the data-tooltip content
        this.tooltip.innerHTML = this.dom.content;

        // Position the tooltip
        this.positionTooltip();
    }

    positionTooltip() {
        let trigger, tooltip, distance, margin, triggerRect, top, left, offsetTop, offsetRight, offsetLeft;

        trigger = this.dom.trigger;
        tooltip = this.tooltip;
        distance = 4;
        margin = 12;

        // Get the trigger location
        triggerRect = this.dom.trigger.getBoundingClientRect();

        // Store the calculated positions
        top = 0;
        left = 0;

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
        this.tooltip.innerHTML = '';
    }

}

export default Tooltip;
