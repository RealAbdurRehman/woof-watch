const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");
let imgArea = document.querySelector(".doggos");
let loader = document.querySelector(".loader");

fetch(BREEDS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement("option");
            option.value = breedsArray[i];
            option.innerText = breedsArray[i].charAt(0).toUpperCase() + breedsArray[i].slice(1);
            option.style.textTransform = "capitalize";
            select.appendChild(option);
        }
    })

function imageLoader(url) {
    loader.style.display = "block";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const img = document.createElement("img");
            img.src = data.message;
            document.querySelector(".doggos").appendChild(img);
            img.addEventListener("load", function() {
                loader.style.display = "none";
                img.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.75)";
            })
        })
        
}

select.addEventListener("change", function(event) {
    let dogUrl = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

    if (imgArea.lastChild) {
        imgArea.removeChild(imgArea.lastChild);
    }

    imageLoader(dogUrl);
})
