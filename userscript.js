// ==UserScript==
// @name        FavImportExport4RTPPlay
// @namespace   FavImportExport4RTPPlay
// @match       https://www.rtp.pt/play/
// @grant       none
// @version     1.0
// @description 01/08/2021, 12:54:02
// ==/UserScript==


let favJSON_load;

const file_options = {
    suggestedName: 'RTPPlay_favorites_.json',
    types: [{
      description: 'Ficheiro JSON',
      accept: {'application/json': ['.json']},
    }],
  };

async function saveFavorites() {
  var fav_blob = new Blob([localStorage.RTPPlay_favorites_.toString()], {type: "text/plain;charset=utf-8"});

  const newHandle = await window.showSaveFilePicker(file_options);
  const writableStream = await newHandle.createWritable();
  await writableStream.write(fav_blob);
  await writableStream.close();
}

async function loadFavorites() {
  [favJSON_load] = await window.showOpenFilePicker(file_options);
  const favJSON_file = await favJSON_load.getFile();
  const JSON_text = await favJSON_file.text();
  console.log(JSON_text);
  localStorage.setItem('RTPPlay_favorites_', JSON_text);
  alert("Ficheiro importado com sucesso!");
  location.reload();
}

function setupButtons(){

  const exportfavElement = document.createElement("span");
  exportfavElement.id = "export-fav-button"
  exportfavElement.classList.add("ver-todos")
  exportfavElement.classList.add("text-uppercase")
  exportfavElement.style = "left: 26%; float: right; cursor: pointer;"
  exportfavElement.textContent = "Exportar"
  
  const exportIcon = document.createElement("i");
  exportIcon.classList.add("fal")
  exportIcon.classList.add("fa-file-export")
  
  const importfavElement = document.createElement("span");
  importfavElement.id = "import-fav-button"
  importfavElement.classList.add("ver-todos")
  importfavElement.classList.add("text-uppercase")
  importfavElement.style = "left: 47%; float: right; cursor: pointer;"
  importfavElement.textContent = "Importar"
  
  const importIcon = document.createElement("i");
  importIcon.classList.add("fal")
  importIcon.classList.add("fa-file-import")
  
  
  document.querySelector("#favorites-shelf > h2").appendChild(exportfavElement)
  document.querySelector("#favorites-shelf > h2").appendChild(importfavElement)
  
  document.querySelector("#export-fav-button").appendChild(exportIcon)
  document.querySelector("#import-fav-button").appendChild(importIcon)
  
  
  document.querySelector("#export-fav-button").onclick = function() {saveFavorites()};
  document.querySelector("#import-fav-button").addEventListener('click', async () => { loadFavorites()});
}

let chkTimer = setInterval(checkFavorites, 1000);


function checkFavorites(){
if(document.getElementById("favorites-shelf").style.display != "none"){
  clearInterval(chkTimer);
  console.log("Têm a barra de favoritos");
  setupButtons();
} 
else if (!localStorage.RTPPlay_favorites_ || localStorage.RTPPlay_favorites_ == '{}'){ 
  clearInterval(chkTimer);
  console.log("Não existe barra de favoritos :( ")
  document.getElementById("favorites-shelf").style.display = "block";
  setupButtons();
  document.querySelector("#export-fav-button").style.display = "none";
  document.querySelector("#import-fav-button").style.display = "block";
}
 }

function checkEmpty(){
  if(!localStorage.RTPPlay_favorites_ || localStorage.RTPPlay_favorites_ == '{}'){
  setupButtons();
  document.querySelector("#export-fav-button").style.display = "none";
  document.querySelector("#import-fav-button").style.display = "block";
  }
}



