// Paginacion, botones:
const container = document.getElementById("container");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnFirstOne = document.querySelector(".btn-firstone");
const btnLastOne = document.querySelector(".btn-lastone");

// Paginacion, contador:
const numberPage = document.querySelector(".number-page");
const totalPages = document.querySelector(".total-pages");
// Filtros:
// const all = document.getElementById('all')
// const female = document.getElementById('female')
// const male = document.getElementById('male')
// const genderless = document.getElementById('genderless')
// const unknown = document.getElementById('unknown')


let currentPage = 1;

const getCharacters = (page) => {
  fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
    .then((res) => res.json())
    .then((data) => renderCharacters(data));
numberPage.innerHTML = currentPage
// totalPages.innerHTML = character.info.pages
};


getCharacters();

const renderCharacters = (data) => {
  container.innerHTML=""
  data.results.forEach((character) => { 
container.innerHTML +=
`<div class="card">
<h2>${character.name}</h2>
<img src="${character.image}" alt="" />
<p>Status: ${character.status}</p>
<p>Species: ${character.species}</p>
<p>Gender: ${character.gender}</p>
<p>Origen: ${character.origin.name}</p>
<p>Location: ${character.location.name}</p>
<button class="button" onclick=verDescripcion("${character.url}")>Ver detalle</button>
</div>`;  
  });
};

const verDescripcion = (characterUrl) => {
    container.innerHTML=""
    fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
    container.innerHTML=
    `<div class="card">
<h2>${character.name}</h2>
<img src="${character.image}" alt="" />
<p>${character.episode}</p>

<button onclick="getCharacters()">Volver</button>
</div>`;
});
};

btnPrev.addEventListener("click", () => {
  currentPage -= 1;

  if (currentPage <= 1){
    btnPrev.setAttribute("disabled", true);
  } 
  getCharacters(currentPage);
});


btnNext.addEventListener("click", () => {
  currentPage += 1;
  getCharacters(currentPage);
  if(currentPage >= 1 && currentPage <= currentPage.info.pages) {
    currentPage +=1
  }
});
  // if (currentPage >= 1){
  //   btnPrev.removeAttribute("disabled", true);
  // } 
  // if(currentPage >= currentPage.info.pages){
  //   btnNext.setAttribute("disabled", true);
  // }



btnFirstOne.addEventListener("click", () =>{
currentPage = 1;
getCharacters(currentPage);
});

btnLastOne.addEventListener("click", () =>{
  currentPage = 42;
  getCharacters(currentPage);
});

























 
