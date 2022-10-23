function CreateCategoryZone() {

} fetch("http://localhost:3000/datacategorii")
    .then(resp => resp.json())
    .then(resp => {
        const sectiune = document.getElementById("descriere_categorii");
        resp.forEach(element => {
            div = document.createElement("div");
            titlu = document.createElement("p");
            descriere = document.createElement("h3");

            titlu.textContent = element.categoryName;
            descriere.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed nec metus id tellus maximus dictum. Cras aliquam urna nec euismod condimentum. 
            Nulla velit felis, consequat sit amet vulputate et, consequat non odio. Praesent rhoncus venenatis commodo. 
            Vivamus consequat tortor nec tincidunt molestie. Vestibulum molestie erat a egestas tempus. 
            Phasellus aliquam pellentesque tellus eleifend convallis. Ut ligula odio, finibus nec posuere quis, viverra at lacus. 
            Vestibulum viverra, arcu in rhoncus eleifend, sapien tortor mattis ligula, sed ultrices sapien nisl sed augue. 
            Integer auctor pellentesque neque, eget volutpat tellus ultricies id. 
            Nam id elit fringilla, hendrerit nisl et, condimentum odio. Nulla in dolor at purus sagittis rutrum id sit amet purus.

            Morbi suscipit ante ac faucibus finibus. Pellentesque faucibus metus sit amet finibus viverra. 
            Proin ultrices dui libero, vel egestas quam tincidunt sit amet. 
            Etiam venenatis, turpis id scelerisque molestie, dolor velit pharetra ex, vitae ornare nulla arcu id tortor. 
            Proin sed augue at felis blandit faucibus eu eu nisi. Vivamus in posuere lacus. 
            Nulla ultricies, nunc a aliquam facilisis, massa dui lobortis tellus, non commodo libero erat ac leo. 
            Ut et accumsan lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Quisque auctor nisi erat, vitae egestas dui bibendum ut. Aliquam vitae velit malesuada, dictum dolor sed, sagittis nisi. 
            Curabitur egestas imperdiet laoreet. Duis in viverra mauris, et molestie tellus. 
            Phasellus lobortis elit mi, id pulvinar odio ultricies non.

            Cras vitae rhoncus sem. Proin at posuere nulla. 
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
            Maecenas tempus dui laoreet, scelerisque eros in, varius lacus. 
            Quisque ullamcorper arcu eget odio finibus laoreet. Cras ut magna eu quam iaculis lacinia non eu orci. 
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
            Cras magna lacus, dapibus luctus orci at, elementum posuere elit. Morbi eros nibh, placerat..`;
            div.id = "div_descriere_categorii";
            titlu.id = "titlu_descriere_categorii";
            descriere.id = "h3_descriere_categorii";
            div.appendChild(titlu);
            div.appendChild(descriere);
            sectiune.appendChild(div);
        });
    })


function CreateReviewZone(){
    fetch('http://localhost:3000/dataReviewzone')
        .then(resp => resp.json())
        .then(resp => {
            const section = document.getElementById("allreviews")
            resp.forEach(element =>{
                var details = document.createElement("details")
                var summary = document.createElement("summary")
                var p = document.createElement("p")

                details.classList.add("details")
                summary.classList.add("reviewtitle")
                p.id = "review"

                summary.textContent=  element.username + " " + element.RDate+" "+ element.RTime;
                p.textContent =  element.review

                details.appendChild(summary)
                details.appendChild(p)
                section.appendChild(details)
            })
        })
}
CreateCategoryZone();
CreateReviewZone();
