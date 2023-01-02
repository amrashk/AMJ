    
//database begin    
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
    const firebaseConfig = {
      apiKey: "AIzaSyDZ8p81tya9X8xVm0K5D2DYany7ORFZiZg",
      authDomain: "amj-1-a3092.firebaseapp.com",
      databaseURL: "https://amj-1-a3092-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "amj-1-a3092",
      storageBucket: "amj-1-a3092.appspot.com",
      messagingSenderId: "133019365322",
      appId: "1:133019365322:web:cb9be862557345fe19e933",
      measurementId: "G-ZPPMSZPRBT"
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    import {getDatabase , ref, child , onValue , get}
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
    const db = getDatabase();
    const gebi = id => document.getElementById(id);
//database end
// gettin datas from firebase db into students
export  var wishlist = [];
var list = [];
var students = [];
function GetalldataOnce(targetElement){
    const dbref = ref(db);
    get(child (dbref,  "schools"))
    .then((snapshot)=>{
            var exp_ren  = "";
        snapshot.forEach(childSnapshot =>{
                students.push(childSnapshot.val());
                // console.log(childSnapshot.val());
            })  
            for (var make in students) {
                const filteredTour =students[make].filter((filter) => filter.top == true);
                console.log(filteredTour.length);
                for(var  i = 0 ; i< filteredTour.length ; i++){
                    if(filteredTour[i].top == true){
                        var _map = new surguuli(filteredTour[i]);
                        ;
                        exp_ren = exp_ren +"<div>"+  _map.render()+ "</div>";
                    }
                }
              }
              exp_ren += "</div>"
                console.log(list)
              document.getElementById(targetElement).innerHTML = exp_ren;
    })
}   
function App(arr, target){
    console.log("workins")
    let exp_ren = "";
    for(var  i = 0 ; i< arr.length ; i++){
        console.log(arr.length)
        if(arr[i].top == false){
            console.log(arr[i]);
            let exp = new Exp(element);
            exp_ren+=exp.render();
            document.querySelector(target).insertAdjacentHTML("afterbegin", exp_ren);
        }
    }
  }
window.onload=GetalldataOnce("articles_top");


//functions addto wishlist , removefrom withlist, then renderin in wishlist 
function reload(_targetElement){
        var array ="a";
        for(var i = 0 ; i < wishlist.length ; i++){
          array = array + convert(wishlist[i]);
        }
        document.getElementById(_targetElement).innerHTML = array;
}
//class of schools with btn that insertin to wishlist 
    class surguuli {
    constructor(ob) {
        this.object = this;
        this.sur_name = ob.sur_name;
        this.students = ob.students;
        this.rank = ob.rank;
        this.place = ob.place;
        this.access = 0;
        this.render = ()=>{
            return `
        <exp-product-list 
            sur_name = "${this.sur_name}"
            rank = "${this.rank}" 
            access = "${this.access}" 
        </exp-product-list>
        `;
        }

    }
};
class ExpProductList extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      this.innerHTML = 
      ` 
          <section>
            <div class="">
                <div class="thumb"></div>
                <div class="infos">
                <h2 class="titles">${this.getAttribute('sur_name')}<span class="flag"></span></h2>
                <div>
                    <button role="button" class="details2">★</button>
                </div>
                </div>
            </div>
        </section> 
      `;

//       <section>
//       <div class="card">
//           <div class="thumb"></div>
//           <div class="infos">
//           <h2 class="titles">${this.getAttribute('sur_name')}<span class="flag"></span></h2>
//           <h3 class="date">Rank: ${this.getAttribute('rank')}</h3>
//           <p class="txt">
//               asdf
//           </p>
//           <div>
//               <button role="button" class="details2">★</button>
//               <h3 class="details" button>readmore</h3>
//           </div>
//           </div>
//       </div>
//   </section> 

    }
    connectedCallback() {
        this.querySelector("button").addEventListener("click", () => {
            var k = 0;
            for(var i = 0 ; i< wishlist.length ; i++){
                if(wishlist[i].getAttribute('sur_name') == this.getAttribute('sur_name')){
                    return
                }
                k=1;
            }
            
                wishlist.push(this);
                console.log(wishlist);
                
                print();
            
            
        })
    }
    disconnectedCallback() {
      
      console.log("connectedCallback")
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
  
    }
  }
function print(){
    var array="";
    for(var i = 0 ; i < wishlist.length ; i++){
        // console.log(wishlist[i].outerHTML)    
        // console.log(wishlist[i].sur_name)
       array = array + wishlist[i].outerHTML;
    }
    // console.log(array)
    document.getElementById("hello").innerHTML = array;
}
  window.customElements.define('exp-product-list', ExpProductList);