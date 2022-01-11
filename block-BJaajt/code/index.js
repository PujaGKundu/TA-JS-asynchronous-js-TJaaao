const img = document.querySelector("img .cat");
const reload = document.querySelector("button");

reload.addEventListener("click", () => {
  let xml = new XMLHttpRequest();

  xml.open(
    "GET",
    "https://api.thecatapi.com/v1/images/search?limit=1&size=full"
  );

  xml.onload = function () {
    let imageData = JSON.parse(xml.response);
    img.src = imageData.url;
  };

  xml.send();
});

let xml = new XMLHttpRequest();
const image = document.querySelector("img");
const name = document.querySelector("h2");
const p = document.querySelector("p");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");
const input = document.querySelector("input");

function displayUI(data) {
  image.src = data.avatar_url;
  name.innerText = data.name;
  p.innerText = data.company;
  following.src = `https://api.github.com/users/${data}/following`;
  followers.src = `https://api.github.com/users/${data}/followers`;
}

function handleChange(event) {
  if (event.keyCode === 13) {
    xml.open("GET", `https://api.github.com/users/${event.target.value}`);

    xml.onload = function () {
      let userData = JSON.parse(xml.response);
      displayUI(userData);
    };

    xml.onerror = function () {
      console.log("Something went wrong");
    };

    xml.send();
    event.target.value = "";
  }
}

input.addEventListener("keyup", handleChange);
