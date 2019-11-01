class Year {

    constructor(element) {
        this.dom = {
            year: element,
        }
    }

    init() {
        this.setCurrentYear();
    }

    setCurrentYear() {
        let year = new Date().getFullYear();

        this.dom.year.innerHTML = year;
    }

}

export default Year;
