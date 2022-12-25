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
        <p>This is some text in a paragraph.</p>
        // <p>
        // ${this.sur_name}
        // </p>
        // <p>
        // ${this.students}
        // </p>
        // <p>
        // ${this.rank}
        // </p>
        // <p>
        // ${this.place}
        // </p>
    </article>`;

    }
};

class TopTour {
    constructor(tourUrl) {
        this._tourUrl = tourUrl;
    }

    Download(targetElement) {
        fetch(`${this._tourUrl}/latest`)
            .then(result => {
                result.json().then(jsob => {
                    // filter
                    const filteredTour = jsob.record.filter(filter => filter.top);
                    console.log(filteredTour);
                    gebi(targetElement).insertAdjacentHTML("afterbegin", filteredTour.map(map => {
                        const _map = new Tour(map);
                        return _map.render();
                    }).reduce((p, c) => p + c, "")
                    );

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
const tours = new TopTour("https://api.jsonbin.io/v3/b/63a80d31dfc68e59d570834b");
tours.Download("articles_top");