
const profilePicture = document.querySelector('.profile-image')
function getPicture(picture) {
    var url = picture.value;
    profilePicture.src = url;
}

var vcolors = ["#ffa822", "#ff6150", "#dee0e6"];

function CreateMiniProfile() {

    if (sessionStorage.getItem("loggedUser") == undefined)
        location.replace("/*")
    fetch('http://localhost:3000/dataLogIn2/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
        .then(resp => resp.json())
        .then(resp => {
            const player = document.getElementById("playername");
            player.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser")).loggedName;
            fetch('http://localhost:3000/dataPlayer/' + resp[0].idPlayer)
                .then(resp1 => resp1.json())
                .then(resp1 => {
                    const lvlplayer = document.getElementById("lvlplayer");
                    lvlplayer.textContent = resp[0].PlayerLevel;
                    const experience = document.getElementById("experience");
                    experience.innerHTML = resp1[0].Experience + "/" + resp1[0].ExperienceCap;
                    const experiencebar = document.getElementById("progresslvl");
                    experiencebar.style.width = (resp1[0].Experience * 100 / resp1[0].ExperienceCap) + "%";
                    // experiencebar.style.width = "100%";
                    experiencebar.style.height = "100%";
                    experiencebar.style.backgroundColor = "yellow";
                    // experiencebar.style.borderRadius = "20px";

                })
        })
}

var v = [];
function CreateSliderCategory() {

    console.log(sessionStorage.getItem("loggedUser"))
    fetch("http://localhost:3000/datacategorii")
        .then(resp => resp.json())
        .then(resp => {
            const sliderOptiuni = document.getElementById("sliderCategory")
            leftarrow = document.createElement("button");
            leftarrow.id = "leftarrow"
            leftarrow.className = "arrow"
            leftarrow.textContent = "<"
            leftarrow.addEventListener("click", function handleClick(event) {
                CurentCategory = document.getElementsByClassName("current");
                for (let i = v.length - 1; i >= 0; i--) {
                    if (v[i] == CurentCategory[0].id && i == 0) {
                        CurentCategory[0].classList.add("hide");
                        CurentCategory[0].classList.remove("current");
                        CurentCategory = document.getElementById(v[v.length - 1]);
                        // console.log(CurentCategory.id);
                        CurentCategory.classList.add("current");
                        CurentCategory.classList.remove("hide");
                        break;
                    };
                    if (v[i] == CurentCategory[0].id && i != 0) {
                        CurentCategory[0].classList.add("hide");
                        CurentCategory[0].classList.remove("current");
                        CurentCategory = document.getElementById(v[i - 1]);
                        CurentCategory.classList.add("current");
                        CurentCategory.classList.remove("hide");
                        break;
                    };


                }
            })
            sliderOptiuni.appendChild(leftarrow);
            var nr = 0;
            resp.forEach(element => {
                if (nr > vcolors.length - 1)
                    nr = 0;
                div = document.createElement("div");
                titlu = document.createElement("p");
                button1 = document.createElement("button");
                button2 = document.createElement("button");
                button3 = document.createElement("button");
                titlu.textContent = element.categoryName;
                div.id = element.categoryName;
                div.classList.add('option');
                titlu.id = "titluCategorie";
                button1.textContent = "easy";
                button2.textContent = "medium";
                button3.textContent = "hard";
                button1.className = "tryQuizz";
                button2.className = "tryQuizz";
                button3.className = "tryQuizz";
                div.style.backgroundColor = vcolors[nr];
                nr++;
                button1.addEventListener('click', function handleClick(event) {
                    // alert("ceva")
                    title = document.getElementsByClassName("current");
                    console.log(title[0].id)
                    // sessionStorage.setItem('Category', title[0].id);
                    sessionStorage.setItem('Category', JSON.stringify({ category: title[0].id, dificulty: button1.textContent }));
                    // JSON.stringify({loggedId: findedUser.idUser, loggedName: findedUser.username})
                    location.replace("/quizz");
                });
                button2.addEventListener('click', function handleClick(event) {
                    title = document.getElementsByClassName("current");
                    // sessionStorage.setItem('Category', title[0].id);
                    sessionStorage.setItem('Category', JSON.stringify({ category: title[0].id, dificulty: button2.textContent }));
                    // JSON.stringify({loggedId: findedUser.idUser, loggedName: findedUser.username})
                    location.replace("/quizz");
                });
                button3.addEventListener('click', function handleClick(event) {
                    title = document.getElementsByClassName("current");
                    // sessionStorage.setItem('Category', title[0].id);
                    sessionStorage.setItem('Category', JSON.stringify({ category: title[0].id, dificulty: button3.textContent }));
                    // JSON.stringify({loggedId: findedUser.idUser, loggedName: findedUser.username})
                    location.replace("/quizz");
                });
                div.appendChild(titlu);
                div.appendChild(button1);
                div.appendChild(button2);
                div.appendChild(button3);
                sliderOptiuni.appendChild(div);
                v.push(element.categoryName);
                if (div.id != resp[0].categoryName)
                    div.classList.add('hide');
                else
                    div.classList.add('current');
            });
            rightarrow = document.createElement("button");
            rightarrow.id = "rightarrow"
            rightarrow.className = "arrow"
            rightarrow.textContent = ">"
            rightarrow.addEventListener("click", function handleClick(event) {
                CurentCategory = document.getElementsByClassName('current');
                // console.log(CurentCategory[0].classList)
                for (let i = 0; i < v.length; i++) {
                    if (CurentCategory[0].id == v[i] && i == v.length - 1) {
                        CurentCategory[0].classList.add("hide");
                        CurentCategory[0].classList.remove("current");
                        CurentCategory = document.getElementById(v[0]);
                        CurentCategory.classList.add("current");
                        CurentCategory.classList.remove("hide");
                        break;
                    }
                    if (v[i] == CurentCategory[0].id && i != v.lengh - 1) {
                        CurentCategory[0].classList.add('hide');
                        CurentCategory[0].classList.remove('current');
                        CurentCategory = document.getElementById(v[i + 1]);
                        CurentCategory.classList.add("current");
                        CurentCategory.classList.remove('hide');
                        break;
                    }

                }
            })
            sliderOptiuni.appendChild(rightarrow);
        })
}

function CreateDailyChallange() {

    // localStorage.removeItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    const sliderOptiuni = document.getElementById("sliderDailyChallenge")
    div = document.createElement("div");
    title = document.createElement("p");
    button1 = document.createElement("button");
    timer = document.createElement("p")


    div.id = "Daily";
    div.classList.add('option');
    title.id = "titluCategorie";
    timer.id = "timer";
    button1.id = "buttonDaily"

    title.textContent = "Daily Challenge";
    button1.textContent = "Try Challenge";
    button1.className = "tryQuizz";
    button1.addEventListener('click', function handleClick(event) {
        sessionStorage.setItem("Daily", title.textContent)
        location.replace("/quizz");
    });
    countdown()
    div.appendChild(title);
    div.appendChild(button1);
    div.appendChild(timer);
    sliderOptiuni.appendChild(div);

}

function countdown() {
    var x = setInterval(function () {

        if (localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId) != undefined) {
            var now = new Date();
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            // Find the distance between now and the count down date
            nextday = new Date(JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).year, JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).month, JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).day, JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).hours, JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).minutes, JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).seconds);
            // console.log(JSON.parse(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)).day, day)
            // new Date(year, month, day, hours, minutes, seconds, milliseconds)
            var distance = nextday.getTime() - now.getTime();

            // Time calculations for days, hours, minutes and seconds
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("timer").innerHTML = "Available in: " + hours + "h "
                + minutes + "m " + seconds + "s ";

            // console.log(distance)
            // console.log(now.getTime(),nextday.getTime())
            // If the count down is over, write some text 
            console.log(distance < 0)
            if (now.getTime() > nextday.getTime()) {
                clearInterval(x);
                document.getElementById("timer").classList.add("hide");
                document.getElementById("buttonDaily").disabled = false;
                localStorage.removeItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            }
            else {

                document.getElementById("timer").classList.remove("hide")
                document.getElementById("buttonDaily").disabled = true;
            }
        }
    }, 1000);

}

function LogOut() {
    sessionStorage.clear();
    location.replace("/login");
}

function TryQuizz() {

    location.replace("/quizz");
}

function Historypage() {
    location.replace("/history");
}

function ProfilePage() {
    location.replace("/profil");
}
function paginaPrincipala() {
    location.replace("/paginaprincipala");
}

function SaveFeedback() {
    console.log(document.getElementById('feedback').value)
    var currentdate = new Date();
    if ((currentdate.getMonth() + 1) < 10)
        var RDate = currentdate.getDate() + "-"
            + "0" + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear();
    else
        var RDate = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear();
    var RTime = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var review = document.getElementById('feedback').value
    fetch('http://localhost:3000/updateReviews/'+ review +"/"+ RDate + "/" + RTime, { method: 'PUT' })
        .then(resp2 => resp2.json())
        .then(resp2 => {
        })
    fetch('http://localhost:3000/dataReviews/' + RDate + "/" + RTime)
        .then(resp3 => resp3.json())
        .then(resp3 => {
            console.log(resp3[0].idReview);
            fetch('http://localhost:3000/updateComments/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId + "/" + resp3[0].idReview, { method: 'PUT' })
                .then(resp4 => resp4.json())
                .then(resp4 => {

                })
        })

    document.getElementById('feedback').value = "";
    alert("Recenzie adăugată!");
}

CreateMiniProfile();
CreateSliderCategory();
CreateDailyChallange();