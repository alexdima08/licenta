if (sessionStorage.getItem("loggedUser") == undefined)
        location.replace("/*") 
function EditProfil(){
    location.replace("/editareprofil");
}

function Resetare(){
        localStorage.removeItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))
        document.getElementById('data').textContent = "-"
        document.getElementById('tara').textContent = "-"
        document.getElementById('email').textContent = "-"
        document.getElementById('hobby').textContent = "-"
}
console.log(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)))
function UpdateData(){
  
    document.getElementById("username").textContent = JSON.parse(sessionStorage.getItem("loggedUser")).loggedName
    if(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)) != null)
    {
        document.getElementById('data').textContent = JSON.parse(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))).datanasterii
        document.getElementById('tara').textContent = JSON.parse(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))).tara
        document.getElementById('email').textContent = JSON.parse(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))).email
        document.getElementById('hobby').textContent = JSON.parse(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))).hobby
    }

    fetch("http://localhost:3000/countQuestionary/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
        document.getElementById("Qnumber").textContent = resp[0].nrchestionare;
    })

    fetch("http://localhost:3000/sumCorrectAnswers/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
        document.getElementById("Cnumber").textContent = resp[0].nrCorect;
    })

    fetch("http://localhost:3000/sumTotalAnswers/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
        document.getElementById("Tnumber").textContent = resp[0].nrQuestions;
    })

    fetch("http://localhost:3000/oftenCategory/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
        document.getElementById("Ocategory").textContent = resp[0].oftencategory;
    })

    fetch("http://localhost:3000/fullCorectCategory/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
        document.getElementById("Nfullcorrect").textContent = resp[0].nrfullchestionare;
    })

    //
}


UpdateData()