console.log("start");
class Tour {
    constructor(ob) {
        this.sur_name = ob.sur_name;
        this.students = ob.students;
        this.rank = ob.rank;
        this.place = ob.place;
    }

    render() {
        return `<article>
        // ${this.sur_name}
        // ${this.students}
        // ${this.rank}
        // ${this.place}
    </article>`;

    }
};

class TopTour {
    constructor(tourUrl) {
        this._tourUrl = tourUrl;
    }

    Download(targetElement , id) {
        fetch(`${this._tourUrl}/latest`)
            .then(result => {
                result.json().then(jsob => {
                    // filter
                            const filteredTour = jsob.record.schools[id].filter(filter => filter.top );
                            console.log(filteredTour);
                            gebi(targetElement).insertAdjacentHTML("afterbegin", filteredTour.map(map => {
                                const _map = new Tour(map);
                                return _map.render();
                            }).reduce((p, c) => p + c, "")
                            );
                    // const filteredTour = jsob.record.schools.filter(filter => filter.top);
                    

                })
            })
            .catch(error => {
                console.log(error)
                console.log("error catch")
            }
        )

    }

};
class country  {
    constructor(ob) {
        this.c_name = ob.c_name;
        this.rank = ob.rank;
        this.details = ob.details;
        this.id = ob.id;
    }

    render() {
        return `<article>
        // ${this.c_name}
        <br>
        // ${this.rank}
        <br>
        // ${this.details}
        <button>readmore</button>
        <br><br>
    </article>`;

    }
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => {
            // myCart.AddToCart(this);
            const tours = new TopTour("https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8");
            tours.Download("articles_top", this.id);
            // myCart.color = "#0f0";
        })
    }
};

class countryies {
    constructor(tourUrl) {
        this._tourUrl = tourUrl;
    }

    Download(targetElement) {
        fetch(`${this._tourUrl}/latest`)
            .then(result => {
                result.json().then(jsob => {
                    // filter
                    for (var make in jsob.record.schools) {
                            console.log(make);
                            const filteredTour = jsob.record.schools[make].filter(filter => filter.top == false );
                            console.log(filteredTour);
                            gebi(targetElement).insertAdjacentHTML("afterbegin", filteredTour.map(map => {
                                const _map = new country(map);
                                return _map.render();
                            }).reduce((p, c) => p + c, "")
                            );
                    }
                    // const filteredTour = jsob.record.schools.filter(filter => filter.top);
                    

                })
            })
            .catch(error => {
                console.log(error)
                console.log("error catch")
            }
        )

    }

};

const gebi = id => document.getElementById(id);
// const tours = new TopTour("https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8");

// tours.Download("articles_top");
const countrs = new countryies("https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8");
// names = Object.getOwnPropertyNames(countrs);
// alert(names[0]); // alerts "myArray"
countrs.Download("articles_top");