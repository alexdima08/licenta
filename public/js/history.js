function createHistory(){
    if(sessionStorage.getItem("loggedUser")==undefined)
         location.replace("/*")
    let div = document.getElementById("container");
    console.log(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    fetch('http://localhost:3000/dataHistoryPlayer/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp =>{
        resp.forEach(element => {

            console.log(element)
            let div2 = document.createElement("div");
            p = document.createElement("p");
            p1 = document.createElement("p");
            p2 = document.createElement("p");
            p3 = document.createElement("p");
            p4 = document.createElement("p");

            p.textContent = element.CTitle;
            p1.textContent = element.QDate;
            p2.textContent = element.QTime;
            p3.textContent =  element.QCorrect;
            p4.textContent = element.QNumber;

            div2.id= "continut-chestionar";
            p.classList.add("date")
            p1.classList.add("date");
            p2.classList.add("date");
            p3.classList.add("date");
            p4.classList.add("date");

            div2.appendChild(p);
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3);
            div2.appendChild(p4);
            div.appendChild(div2);
        })
    })
}


createHistory();