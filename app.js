const key = "WfeEEN7ndJFdpHAskqmQE5_PNP9eyVGimOW3fuPxUsA";
const formGallery = document.querySelector("form");
const inputGallery = document.getElementById("search");
const gallery = document.querySelector(".gallery");
const loadButton = document.getElementById("load-btn");

let inputSearch = "";
let page = 1;
let isRandom = true;

async function searchPhoto() {
  if (isRandom) {
    const url = `https://api.unsplash.com/photos/random?count=10&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    displayPhotos(data);
  } else {
    inputSearch = inputGallery.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputSearch}&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    displayPhotos(data.results);
    page++;
    if (page > 1) {
      loadButton.style.display = "block";
    }
  }
}

function displayPhotos(results) {
  if (page === 1) {
    gallery.innerHTML = "";
  }

  results.forEach((result) => {
    const photoWrapper = document.createElement("div");
    photoWrapper.classList.add("gallery_results");
    const photo = document.createElement("img");
    photo.src = result.urls.small;
    photo.alt = result.alt_description;
    const photoLink = document.createElement("a");
    photoLink.href = result.links.html;
    photoLink.target = "_blank";
    photoLink.textContent = result.alt_description;

    photoWrapper.appendChild(photo);
    photoWrapper.appendChild(photoLink);
    gallery.appendChild(photoWrapper);
  });
}

window.onload = function () {
  searchPhoto();
};

formGallery.addEventListener("submit", (event) => {
  event.preventDefault();
  isRandom = false; // Установите isRandom в false при поиске.
  page = 1;
  searchPhoto();
});

loadButton.addEventListener("click", () => {
  searchPhoto();
});
