let addToy = false;
const toyUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const toyName = addToyForm.elements["name"].value;
    const toyImage = addToyForm.elements["image"].value;
    fetch(toyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(toy => {renderToy(toy.name,toy.image,toy.likes,toy.id)});
  });
  fetchToys();
});


function fetchToys() {
  fetch(toyUrl)
    .then((resp) => resp.json())
    .then((Toys) => renderToys(Toys));
}

function renderToys(Toys) {
  Toys.forEach(toy => {renderToy(toy.name,toy.image,toy.likes,toy.id)});
}

function renderToy(toyName,toyImage,toyLikes,toyId) {
  const toyCollection = document.getElementById("toy-collection");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button");
  div.classList.add("card");
  h2.innerText = toyName;
  img.src = toyImage;
  img.classList.add("toy-avatar");
  p.innerText = toyLikes + " likes";
  button.classList.add("like-btn");
  button.id = toyId;
  button.innerText = "Like ❤️";
  toyCollection.appendChild(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  button.addEventListener("click", () => {
    const newNumberOfLike = toyLikes + 1
    fetch(toyUrl + "/" + toyId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newNumberOfLike
      })
    })
    .then(data => {
      p.innerText = newNumberOfLike + " likes";
    });
  });
}

