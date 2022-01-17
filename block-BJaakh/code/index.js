let inputText = document.querySelector("#text");

let root = document.querySelector("ul");

let parent = document.querySelector(".detail");

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

const url = ` https://sleepy-falls-37563.herokuapp.com/api/todo`;

function handleToggle(event) {
  let id = event.target.dataset.id;
  allTodos[id].isDone = !allTodos[id].isDone;
  createUI();
}

function handleDelete(event) {
  let id = event.target.dataset.id;
  allTodos.splice(id, 1);
  createUI();
}

function handleAll() {
  createUI();
}

function handleActive() {
  var arrActive = [];
  for (var i in allTodos) {
    if (!allTodos[i].isDone) {
      arrActive.push(allTodos[i]);
    }
  }
  duplicateUI(arrActive);
}

function handleComplete() {
  var arrComplete = [];
  for (var i in allTodos) {
    if (allTodos[i].isDone) {
      arrComplete.push(allTodos[i]);
    }
  }
  duplicateUI(arrComplete);
}

function UICreation(t, i) {
  let li = document.createElement("li");
  li.classList.add("flex");
  let div = document.createElement("div");
  div.classList.add("flex");
  div.classList.add("justify");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("data-id", i);
  input.checked = t.isDone;
  input.addEventListener("input", handleToggle);
  let p = document.createElement("p");
  p.innerText = t.name;
  let span = document.createElement("span");
  span.innerText = "X";
  span.setAttribute("data-id", i);
  span.addEventListener("click", handleDelete);
  div.append(input, p);
  li.append(div, span);
  root.append(li);
}

function duplicateUI(arr) {
  root.innerHTML = "";
  arr.forEach((todo, index) => {
    UICreation(todo, index);
  });
}

function selectionData() {
  let div2 = document.createElement("div");
  div2.classList.add("flex");
  let p2 = document.createElement("p");
  p2.innerText = allTodos.length + " items left";
  let button1 = document.createElement("button");
  button1.innerText = "ALL";
  button1.addEventListener("click", handleAll);
  let button2 = document.createElement("button");
  button2.innerText = "Active";
  button2.addEventListener("click", handleActive);
  let button3 = document.createElement("button");
  button3.innerText = "Completed";
  button3.addEventListener("click", handleComplete);
  div2.append(p2, button1, button2, button3);
  parent.append(div2);
}

function createUI() {
  root.innerHTML = "";
  parent.innerHTML = "";
  allTodos.forEach((todo, index) => {
    UICreation(todo, index);
  });
  selectionData();
}

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value !== "") {
    let todo = { name: event.target.value, isDone: false };
    allTodos.push(todo);
    event.target.value = "";
    localStorage.setItem("todo", JSON.stringify(allTodos));
    createUI();
  }
}

inputText.addEventListener("keyup", handleInput);

function checkedAll() {
  var c = document.getElementsByName("viju");
  checked = document.getElementById("causelist_month").checked;

  for (var i = 0; i < c.length; i++) {
    c[i].checked = checked;
  }
}

function showVal(frm) {
  var arr = [];
  for (var i in frm.viju) {
    if (frm.viju[i].checked) {
      arr.push(frm.viju[i].value);
    }
  }
  alert(arr);
  return arr;
}
