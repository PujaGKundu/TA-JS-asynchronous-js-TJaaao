const ul = document.querySelector("ul");
const option = document.querySelector("option");

const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

function fetchData(url, news = "") {
  return new Promise((res, rej) => {
    let xml = new XMLHttpRequest();

    xml.open("GET", url);

    xml.onload = function () {
      let data = res(JSON.parse(xml.response));
      displayData(data, news);
    };

    xml.onerror = function () {
      rej("Something went wrong");
    };

    xml.send();
  });
}

function displayData(datas = [], news = "") {
  ul.innerHTML = "";
  datas.forEach((data) => {
    let li = document.createElement("li");
    li.classList.add("flex");
    let img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.id;
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    h4.innerText = data.newsSite;
    let p = document.createElement("p");
    p.innerText = data.title;
    let button = document.createElement("button");
    let a = document.createElement("a");
    a.href = data.url;
    a.innerText = "Read More";
    button.append(a);
    div.append(h4, p, button);
    li.append(img, div);
    ul.append(li);
  });
}

fetchData(url).then(displayData);

function selectedData() {
  var sel = document.getElementById("news");
  var selectedNews = sel.value;
  fetchData(url, selectedNews).then(displayData);
}
