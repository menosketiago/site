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
        let birth, year;

        birth = 1984;
        year = new Date().getFullYear();

        if (this.dom.year.hasAttribute('data-age')) {
            this.dom.year.innerHTML = year - birth;
        }
        else {
            this.dom.year.innerHTML = year;
        }
    }

}

export default Year;
