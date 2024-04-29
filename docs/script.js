let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

let formElement = document
  .querySelector("form")
  .addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();
  let rubrique =
    document.querySelector("select").options[
      document.querySelector("select").selectedIndex
    ].text;
  let description = document.getElementById("description").value;
  let echeance = document.getElementById("echeance").value;
  let statut = true;
  echeance =
    echeance.substring(8, 10) +
    "/" +
    echeance.substring(5, 7) +
    "/" +
    echeance.substring(0, 4) +
    " - " +
    echeance.substring(11, 16);
  let new_tasks = {
    rubrique: rubrique,
    description: description,
    echeance: echeance,
    statut: statut,
  };

  document.querySelector("tbody").innerHTML = "";
  tasks.push(new_tasks);
  createTasks();
}

let taskElement;

function addTask(obj, index) {
  taskElement = document.createElement("tr");
  taskElement.setAttribute("id", index);
  for (let index in obj) {
    if (index != "statut") {
      let dataElement = document.createElement("td");
      if (obj["statut"] == false) {
        dataElement.classList.add("bg-secondary-subtle", "text-secondary");
      }
      dataElement.textContent = obj[index];
      taskElement.insertAdjacentElement("beforeend", dataElement);
    }
  }
  if (obj["statut"] == true) {
    taskElement.insertAdjacentHTML(
      "beforeend",
      '<td><div id="hey" class="btn-group" role="group"><button onclick = statut(this) class="btn btn-success">désactiver</button><button class="btn btn-warning">modifier</button><button onclick = supprimer(this) class="btn btn-danger">supprimer</button></div></td>'
    );
  } else {
    taskElement.insertAdjacentHTML(
      "beforeend",
      '<td class="bg-secondary-subtle text-secondary"><div class="btn-group" role="group"><button onclick = statut(this) class="btn btn-success">activer</button><button class="btn btn-warning">modifier</button><button onclick = supprimer(this) class="btn btn-danger">supprimer</button></div></td>'
    );
  }
  document
    .querySelector("tbody")
    .insertAdjacentElement("beforeend", taskElement);
}

function statut(elem) {
  let id = elem.parentNode.parentNode.parentNode.id;
  tasks[id]["statut"] = !tasks[id]["statut"];
  document.querySelector("tbody").innerHTML = "";
  createTasks();
}

function supprimer(elem) {
  let id = elem.parentNode.parentNode.parentNode.id;
  tasks.splice(id, 1);
  document.querySelector("tbody").innerHTML = "";
  createTasks();
}

function createTasks() {
  for (index in tasks) {
    addTask(tasks[index], index);
  }
}

function sauvegarder() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

createTasks();
