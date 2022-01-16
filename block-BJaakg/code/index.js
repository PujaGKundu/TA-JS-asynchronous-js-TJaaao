const ul = document.querySelector("ul");
const url = `https://www.anapioficeandfire.com/api/books`;
let isLoading = false;

function handleSpinner() {
  if (isLoading) {
    ul.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
  }
}

function displayData(datas = []) {
  ul.innerHTML = "";
  let index = 0;
  datas.forEach((data) => {
    let li = document.createElement("li");
    li.classList.add("mainChar");
    li.classList.add("flex");
    li.dataset.id = index;
    index++;
    let h2 = document.createElement("h2");
    h2.innerText = data.name;
    let p = document.createElement("p");
    p.innerText = data.authors;
    let h4 = document.createElement("h4");
    h4.innerText = `Number of Pages: ${data.numberOfPages}`;
    let h5 = document.createElement("h5");
    h5.innerText = `Publisher: ${data.publisher}`;
    let h6 = document.createElement("h6");
    h6.innerText = `Country: ${data.country}, Released: ${data.released}`;
    let button = document.createElement("button");
    let a = document.createElement("a");
    a.innerText = `Show Characters (${data.characters.length})`;
    button.append(a);
    li.append(h2, p, h4, h5, h6, button);
    ul.append(li);
  });
}

function init() {
  isLoading = true;
  handleSpinner();
  fetch(url)
    .then((res) => res.json())
    .then((char) => {
      isLoading = false;
      handleSpinner();
      displayData(char);
    });
}

init();
