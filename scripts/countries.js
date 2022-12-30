console.log("start");
class Tour {
  constructor(ob) {
    this.sur_name = ob.sur_name;
    this.students = ob.students;
    this.rank = ob.rank;
    this.place = ob.place;
  }

  render() {
    return `
        <article>
        // ${this.sur_name}
        // ${this.students}
        // ${this.rank}
        // ${this.place}
        
    </article>`;
  }
}

class TopTour {
  constructor(tourUrl) {
    this._tourUrl = tourUrl;
  }

  Download(targetElement, id) {
    console.log(id);
    fetch(`${this._tourUrl}/latest`)
      .then((result) => {
        result.json().then((jsob) => {
          // filter

          const filteredTour = jsob.record.schools[id].filter(
            (filter) => filter.top
          );
          console.log(filteredTour);
          gebi(targetElement).insertAdjacentHTML(
            "afterbegin",
            filteredTour
              .map((map) => {
                const _map = new Tour(map);
                return _map.render();
              })
              .reduce((p, c) => p + c, "")
          );
          // const filteredTour = jsob.record.schools.filter(filter => filter.top);
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error catch");
      });
  }
}
class country {
  constructor(ob) {
    this.c_name = ob.c_name;
    this.rank = ob.rank;
    this.details = ob.details;
    this.id = ob.id;
  }

  render() {
    return `
        <section>
            <div class="card">
                <div class="thumb"></div>
                <div class="infos">
                <h2 class="titles"> ${this.c_name}<span class="flag"></span></h2>
                <h3 class="date">Rank: ${this.rank}</h3>
                <p class="txt">
                    ${this.details}
                </p>
                <div>
                    <button role="button" id="${this.id}" class = "details" onclick="someFunction(this)">readmore</button>
                    <h3 class="details2">ДЭЛГЭРЭНГҮЙ</h3>
                </div>
                </div>
            </div>
        </section> `;
  }
}
function someFunction(obj, abc) {
  alert(obj.id);
  const tours = new TopTour(
    "https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8"
  );
  tours.Download("articles_top", obj.id);
}
class countryies {
  constructor(tourUrl) {
    this._tourUrl = tourUrl;
  }

  Download(targetElement) {
    fetch(`${this._tourUrl}/latest`)
      .then((result) => {
        result.json().then((jsob) => {
          // filter
          for (var make in jsob.record.schools) {
            console.log(make);
            const filteredTour = jsob.record.schools[make].filter(
              (filter) => filter.top == false
            );
            console.log(filteredTour);
            gebi(targetElement).insertAdjacentHTML(
              "afterbegin",
              filteredTour
                .map((map) => {
                  const _map = new country(map);
                  return _map.render();
                })
                .reduce((p, c) => p + c, "")
            );
          }
          // const filteredTour = jsob.record.schools.filter(filter => filter.top);
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error catch");
      });
  }
}

const gebi = (id) => document.getElementById(id);
const countrs = new countryies(
  "https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8"
);
countrs.Download("articles_top");
