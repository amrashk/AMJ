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
//functions addto wishlist , removefrom withlist, then renderin in wishlist 
var wishlist = [];
function addto(obj){
    if(obj.access == 0){
      obj.access = 1;
      wishlist.push(obj);
      reload("wishlist");
    }else{
      return
    }
}
function reload(targetElement){
        var array;
        for(var i = 0 ; i < wishlist.length ; i++){
          array = array + convert(wishlist[i])
        }
        document.getElementById("hello").innerHTML = array;
}
function convert(obj){
  return `
        <section>
            <div class="card">
                <div class="thumb"></div>
                <div class="infos">
                <h2 class="titles"> ${this.sur_name}<span class="flag"></span></h2>
                <h3 class="date">Rank: ${this.rank}</h3>
                <p class="txt">
                    asdf
                </p>
                <div>
                    <h3 class="details2">ДЭЛГЭРЭНГҮЙ</h3>
                    <button role="button" id="" class = "details" onclick="addto(${this.rank})">REMOVE</button>
                    <h3 class="details2">★</h3>
                </div>
                </div>
            </div>
        </section> `
}
//class of schools with btn that insertin to wishlist 
    class surguuli {
    constructor(ob) {
        this.sur_name = ob.sur_name;
        this.students = ob.students;
        this.rank = ob.rank;
        this.place = ob.place;
        this.access = 0;
    }

    render() {
        return `
        <section>
            <div class="card">
                <div class="thumb"></div>
                <div class="infos">
                <h2 class="titles"> ${this.sur_name}<span class="flag"></span></h2>
                <h3 class="date">Rank: ${this.rank}</h3>
                <p class="txt">
                    asdf
                </p>
                <div>
                    <h3 class="details2">ДЭЛГЭРЭНГҮЙ</h3>
                    <button role="button" id="" class = "details" onclick="addto(${this})">more</button>
                    <h3 class="details2">★</h3>
                </div>
                </div>
            </div>
        </section> `;
    }
};
// gettin datas from firebase db into students
    var students = [];
    function GetalldataOnce(targetElement){
        const dbref = ref(db);
        get(child (dbref,  "schools"))
        .then((snapshot)=>{
            snapshot.forEach(childSnapshot =>{
                students.push(childSnapshot.val());
            });
                    for (var make in students) {
                            const filteredTour = students[make].filter(filter => filter.top);
                            console.log(filteredTour);
                            gebi(targetElement).insertAdjacentHTML("afterbegin", filteredTour.map(map => {
                                const _map = new surguuli(map);
                                return _map.render();
                            }).reduce((p, c) => p + c, "")
                            );
                    }
        })
    }                
    window.onload=GetalldataOnce("articles_top");