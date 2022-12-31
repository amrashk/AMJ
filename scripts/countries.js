console.log("start");
const overlay = document.getElementById('overlay')
function someFunction(obj) {
const openModalButtons = document.getElementById(obj)
const closeModalButtons = document.querySelectorAll('[data-close-button]')
openModal(openModalButtons)

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) 
  {
    return console.log("null bna")
  }
   else{
    modal.classList.add('active')
    overlay.classList.add('active')
   }

}
function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
//-------------------------------------------------------
}
class Tour {
  constructor(ob) {
    this.sur_name = ob.sur_name;
    this.students = ob.students;
    this.rank = ob.rank;
    this.place = ob.place;
  }

  render() {
    return `
    <p>
      //${this.sur_name}
      //${this.students}
      //${this.rank}
      //${this.place}
    </p>  
      `;
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
          gebi(targetElement).insertAdjacentHTML("afterbegin",filteredTour.map((map) => {
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
          
            <div  class="modal" id="${this.rank}">
              <div  class="${this.rank}" >
              <div class="modal-header">
                <div class="title">${this.c_name}</div>
                <button data-close-button class="close-button">&times;</button>
              </div>
              <div id="${this.c_name}">

              </div>
              </div>
            </div>   
            <div class="card">
                <div class="thumb"></div>
                <div class="infos">
                <h2 class="titles"> ${this.c_name}<span class="flag"></span></h2>
                <h3 class="date">Rank: ${this.rank}</h3>
                <p class="txt">
                    ${this.details}
                </p>
                <div>
                    <button data-modal-target="#modal" role="button" id="${this.id}" class = "details" onclick="someFunction(${this.rank})">readmore</button>
                    <h3 class="details2">ДЭЛГЭРЭНГҮЙ</h3>
                </div>
                </div>
               
            </div>
         
        </section> 

        `;
  }
}
// ${tours.Download('modal-body' , this.id)}

const tours = new TopTour(
  "https://api.jsonbin.io/v3/b/63a8496c01a72b59f238f0e8"
);
var len = 0;

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
            const filteredTour = jsob.record.schools[make].filter((filter) => filter.top == false);
            console.log(filteredTour);
            gebi(targetElement).insertAdjacentHTML("afterbegin",filteredTour.map((map) => {
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
  popup(targetElement) {
    fetch(`${this._tourUrl}/latest`)
      .then((result) => {
        result.json().then((jsob) => {
          // filter
          for (var make in jsob.record.schools) {
            console.log(make);
            const filteredTour = jsob.record.schools[make].filter((filter) => filter.top == false);
            console.log(filteredTour);
            gebi(targetElement).insertAdjacentHTML("afterbegin",filteredTour.map((map) => {
                  const _map = new country(map);
                  return tours.Download(map.c_name , map.id);
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
countrs.popup("articles_top");