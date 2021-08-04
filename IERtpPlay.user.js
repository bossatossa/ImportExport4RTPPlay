// ==UserScript==
// @name        ImportExport4RTPPlay
// @namespace   ImportExport4RTPPlay
// @match       https://www.rtp.pt/play/
// @grant       none
// @version     1.0
// @description Um userscript para exportar e importar a lista de favoritos/progresso de programas
// ==/UserScript==

let favJSON_load;
let progJSON_load;

const file_fav_options = {
  suggestedName: "RTPPlay_favorites_.json",
  types: [
    {
      description: "Ficheiro JSON",
      accept: { "application/json": [".json"] },
    },
  ],
};

const file_prog_options = {
  suggestedName: "RTPPlay_telemetry_.json",
  types: [
    {
      description: "Ficheiro JSON",
      accept: { "application/json": [".json"] },
    },
  ],
};



async function saveFav() {
  var fav_blob = new Blob([localStorage.RTPPlay_favorites_.toString()], {
    type: "text/plain;charset=utf-8",
  });

  const newHandle = await window.showSaveFilePicker(file_fav_options);
  const writableStream = await newHandle.createWritable();
  await writableStream.write(fav_blob);
  await writableStream.close();
}

async function loadFav() {
  [favJSON_load] = await window.showOpenFilePicker(file_fav_options);

  const favJSON_file = await favJSON_load.getFile();
  const JSON_text = await favJSON_file.text();
  localStorage.setItem("RTPPlay_favorites_", JSON_text);
  alert("Lista de favoritos importado com sucesso!");
  location.reload();
}

async function saveProg() {
  var prog_blob = new Blob([localStorage.RTPPlay_telemetry_.toString()], {
    type: "text/plain;charset=utf-8",
  });

  const newHandle = await window.showSaveFilePicker(file_prog_options);
  const writableStream = await newHandle.createWritable();
  await writableStream.write(prog_blob);
  await writableStream.close();
}

async function loadProg() {
  [progJSON_load] = await window.showOpenFilePicker(file_prog_options);

  const progJSON_file = await progJSON_load.getFile();
  const JSON_text = await progJSON_file.text();
  localStorage.setItem("RTPPlay_telemetry_", JSON_text);
  alert("Progresso de programas importado com sucesso!");
  location.reload();
}


function setupFavButtons() {
  const exportfavElement = document.createElement("span");
  exportfavElement.id = "export-fav-button";
  exportfavElement.classList.add("ver-todos");
  exportfavElement.classList.add("text-uppercase");
  exportfavElement.style =
    "left: 26%; float: right; cursor: pointer; margin-right: 40%;";
  exportfavElement.textContent = "Exportar";

  const exportIcon = document.createElement("i");
  exportIcon.classList.add("fal");
  exportIcon.classList.add("fa-file-export");

  const importfavElement = document.createElement("span");
  importfavElement.id = "import-fav-button";
  importfavElement.classList.add("ver-todos");
  importfavElement.classList.add("text-uppercase");
  importfavElement.style =
    "left: 47%; float: right; cursor: pointer; margin-right: 40%;";
  importfavElement.textContent = "Importar";

  const importIcon = document.createElement("i");
  importIcon.classList.add("fal");
  importIcon.classList.add("fa-file-import");

  document.querySelector("#favorites-shelf > h2").appendChild(exportfavElement);
  document.querySelector("#favorites-shelf > h2").appendChild(importfavElement);

  document.querySelector("#export-fav-button").appendChild(exportIcon);
  document.querySelector("#import-fav-button").appendChild(importIcon);

  document
    .querySelector("#export-fav-button")
    .addEventListener("click", async () => {
      saveFav();
    });
  document
    .querySelector("#import-fav-button")
    .addEventListener("click", async () => {
      loadFav();
    });
}

function setupProgButtons() {
  const exportprogElement = document.createElement("span");
  exportprogElement.id = "export-prog-button";
  exportprogElement.classList.add("ver-todos");
  exportprogElement.classList.add("text-uppercase");
  exportprogElement.style =
    "left: 26%; float: right; cursor: pointer; margin-right: 40%;";
  exportprogElement.textContent = "Exportar";

  const exportprogIcon = document.createElement("i");
  exportprogIcon.classList.add("fal");
  exportprogIcon.classList.add("fa-file-export");

  const importprogElement = document.createElement("span");
  importprogElement.id = "import-prog-button";
  importprogElement.classList.add("ver-todos");
  importprogElement.classList.add("text-uppercase");
  importprogElement.style =
    "left: 47%; float: right; cursor: pointer; margin-right: 40%;";
  importprogElement.textContent = "Importar";

  const importprogIcon = document.createElement("i");
  importprogIcon.classList.add("fal");
  importprogIcon.classList.add("fa-file-import");

  document.querySelector("#watching-shelf > h2").appendChild(exportprogElement);
  document.querySelector("#watching-shelf > h2").appendChild(importprogElement);

  document.querySelector("#export-prog-button").appendChild(exportprogIcon);
  document.querySelector("#import-prog-button").appendChild(importprogIcon);

  document
    .querySelector("#export-prog-button")
    .addEventListener("click", async () => {
      saveProg();
    });
  document
    .querySelector("#import-prog-button")
    .addEventListener("click", async () => {
      loadProg();
    });
}

let chkTimer = setInterval(checkFavorites, 1000);

function checkFavorites() {
  if (document.getElementById("favorites-shelf").style.display != "none") {
    clearInterval(chkTimer);
    setupFavButtons();
  }

  if (document.getElementById("watching-shelf").style.display != "none") {
    clearInterval(chkTimer);
    setupProgButtons();
  }

  if (
    !localStorage.RTPPlay_favorites_ ||
    localStorage.RTPPlay_favorites_ == "{}"
  ) {
    clearInterval(chkTimer);
    document.getElementById("favorites-shelf").style.display = "block";
    setupFavButtons();
    document.querySelector("#export-fav-button").style.display = "none";
    document.querySelector("#import-fav-button").style.display = "block";
  }

  if (
    !localStorage.RTPPlay_telemetry_ ||
    localStorage.RTPPlay_telemetry_ == "{}"
  ) {
    clearInterval(chkTimer);
    document.getElementById("watching-shelf").style.display = "block";
    setupProgButtons();
    document.querySelector("#export-prog-button").style.display = "none";
    document.querySelector("#import-prog-button").style.display = "block";
  }
}
