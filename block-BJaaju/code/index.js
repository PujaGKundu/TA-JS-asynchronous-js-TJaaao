const input = document.querySelector("input");
const div = document.querySelector("div");
let xml = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", () => {
  xml.open(
    "GET",
    "https://api.unsplash.com/photos/random/?client_id=B35Yfev5LFw9Yb4AbH7L8fS5N7mx9sxOphz7eKmTskw"
  );

  xml.onload = function () {
    let imageData = JSON.parse(xml.response);
    for (let i = 0; i < 7; i++) {
      let img = document.createElement("img");
      img.src = imageData.urls.small;
      div.append(img);
    }
  };

  xml.send();
});

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    xml.open("GET", `https://api.unsplash.com/photos/${event}`);

    xml.onload = function () {
      let imageData = JSON.parse(xml.response);
      for (let i = 0; i < 7; i++) {
        let img = document.createElement("img");
        img.src = imageData.urls.small;
        div.append(img);
      }
    };

    xml.send();
    input.value = "";
  }
});
