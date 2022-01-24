let todoItems = [];
let currentChange;
let flag = true;

function apply() {
  if (flag) {
    document.getElementById("blur2").style.display = "none";
    document.getElementById("blur1").style.display = "block";
  } else {
    document.getElementById("blur1").style.display = "none";
    document.getElementById("blur2").style.display = "block";
  }
  if (todoItems.length === 0) {
    console.log(document.getElementById("no-item"));
    console.log(todoItems);
    document.getElementById("no-item").style.display = "block";
  } else {
    console.log("inside");
    document.getElementById("no-item").style.display = "none";
  }
}
apply();

function renderTodo(todo) {
  apply();
  const list = document.querySelector(".flex-row-list");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < todoItems.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", todoItems[i].id);
    node.innerHTML = `<p class="card-heading" onclick="redirect(this)">${todoItems[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='footer-1'>
          <button class='butn-completed' onclick="remove(this)"><i class="fa fa-trash" aria-hidden="true"></i></button> 
          <p class = 'butn-add' onclick="toggleAddItem(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(node.childNodes);
    list.append(node);
    let currentTodo = todoItems[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}

function markCompleted(element) {
  let classToPut = flag
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      for (let j = 0; j < todoItems[i].subTask.length; j++) {
        if (todoItems[i].subTask[j].id == subTaskId) {
          todoItems[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}

function addTodo() {
  let heading = document.getElementById("list-heading").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    todoItems.push(todo);
    toggle();
    goBack();
  }
}

function addSubTodo() {
  let taskHeading = document.getElementById("sub-list-heading").value;
  if (taskHeading !== "") {
    let list;
    if (flag) {
      list = currentChange.parentNode.parentNode.childNodes[2];
    } else {
      list = currentChange.parentNode.parentNode.childNodes[3];
    }
    console.log(currentChange.parentNode, currentChange.parentNode.parentNode);
    let id = currentChange.parentNode.parentNode.getAttribute("data-key");
    console.log(currentChange.parentNode.parentNode);

    const node = document.createElement("li");
    node.setAttribute("class", flag ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

    let currentTodo;
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == id) {
        todoItems[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }
    list.append(node);
    toggleAddItem();
  }
  console.log(todoItems);
}

function remove(element) {
  let tempElement = element.parentNode.parentNode;
  console.log(tempElement);

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == tempElement.getAttribute("data-key")) {
      todoItems.splice(i, 1);
    }
  }
  if (!flag) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    apply();
  }
}

function toggle() {
  var blur;
  if (flag) {
    blur = document.getElementById("blur1");
  } else {
    blur = document.getElementById("blur2");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("pop");
  popup.classList.toggle("active");
}

function goBack() {
  flag = true;
  renderTodo();
}

function toggleAddItem(item) {
  currentChange = item;
  var blur;
  if (flag) {
    blur = document.getElementById("blur1");
  } else {
    blur = document.getElementById("blur2");
  }
  blur.classList.toggle("active");

  var popup = document.getElementById("popAddItem");
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      currentTodo = todoItems[i];
    }
  }
  flag = false;
  apply();
  document.getElementById("currentHeading-1").textContent = currentTodo.heading;
  document.getElementById("currentHeading-2").textContent = currentTodo.heading;
  document
    .getElementById("currentHeading-2")
    .parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("single-list");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}