document.addEventListener("DOMContentLoaded", () => { 
    let h2 = document.querySelectorAll('.item'); 

    for (let i = 0; i < h2.length; ++i) { 
        h2[i].addEventListener("click", function () { 
            if (h2[i].classList.contains("visible")) { 
                h2[i].classList.remove("visible") 
            } 
            else { 
                let active = document.querySelectorAll(".visible"); 
                active.forEach(e => e.classList.toggle("visible"));
                h2[i].classList.add("visible");
            } 
        }) 
    } 
})