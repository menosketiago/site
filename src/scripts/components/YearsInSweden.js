class YearsInSweden {

    constructor(element) {
        this.dom = {
            year: element,
        }
    }

    init() {
        this.calculateYear();

        console.log("years in sweden ran")
    }

    calculateYear() {
        let move, year;

        move = 2014;
        year = new Date().getFullYear();

        if (this.dom.year.hasAttribute('data-years-sweden')) {
            this.dom.year.innerHTML = year - move;
        }
    }

}

export default YearsInSweden;
