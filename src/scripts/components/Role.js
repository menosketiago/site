class Role {

    constructor(element) {
        this.dom = {
            role: element,
        };
    }

    init() {
        this.cycleRole();
    }

    cycleRole() {
        // Check if users prefer to not have motion
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        const rolesArray = [
            "Product Designer",
            "Design Mentor",
            "Illustrator",
            "Videogamer",
            "Human being",
            "Sitdown comedian"
        ];

        let iterator = 0;

        if (!reducedMotion || reducedMotion.matches) {
            // Do nothing!
        }
        else {
            let interval = setInterval(() => {
                if (iterator < rolesArray.length) {
                    // Show the role string
                    this.dom.role.style.opacity = 1;
                    this.dom.role.innerText = rolesArray[iterator];

                    // Fade the role string
                    setTimeout(() => {
                        this.dom.role.style.opacity = 0;
                    }, 1600);
    
                    iterator++;
                }
                else {
                    iterator = 0;

                    // Show the role string
                    this.dom.role.style.opacity = 1;
                    this.dom.role.innerText = rolesArray[iterator];

                    // Fade the role string
                    setTimeout(() => {
                        this.dom.role.style.opacity = 0;
                    }, 1600);
    
                    iterator++;
                }
            }, 2000);
        }
    }
}

export default Role;