const input = document.querySelector("input");
const div = document.querySelector("div");
const url = `https://api.unsplash.com/photos/?client_id=B35Yfev5LFw9Yb4AbH7L8fS5N7mx9sxOphz7eKmTskw`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=B35Yfev5LFw9Yb4AbH7L8fS5N7mx9sxOphz7eKmTskw`;

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = function () {
    console.error("Something went wrong");
  };

  xhr.send();
}

function display(images) {
  div.innerHTML = "";
  images.forEach((image) => {
    let img = document.createElement("img");
    img.src = image.urls.thumb;
    div.append(img);
  });
}

fetch(url, display);

function handleSearch(event) {
  if (event.keyCode == 13 && input.value) {
    fetch(
      getSearchUrl(input.value, (search) => {
        display(search.reasults);
      })
    );
    input.value = "";
  }
}

input.addEventListener("keyup", handleSearch);
