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

    Download(targetElement) {
        fetch(`${this._tourUrl}/latest`)
            .then(result => {
                result.json().then(jsob => {
                    // filter
                    for (var make in jsob.record.schools) {
                            const filteredTour = jsob.record.schools[make].filter(filter => filter.top);
                            console.log(filteredTour);
                            gebi(targetElement).insertAdjacentHTML("afterbegin", filteredTour.map(map => {
                                const _map = new Tour(map);
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
const tours = new TopTour("https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8");
tours.Download("articles_top");