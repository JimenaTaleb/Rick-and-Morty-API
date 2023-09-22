//variables:
//contenedor
const container = document.getElementById("container");
//contador paginacion
const countPage = document.getElementById("count-actual-page");
const totalPage = document.getElementById("total-pages");
let currentPage = 1;
let totalPages = 0;
let currentGender = "";
//paginacion
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnFirst = document.getElementById("btn-first");
const btnLast = document.getElementById("btn-last");
const pageInput = document.getElementById("page-input");
const goToPageButton = document.getElementById("go-to-page");
//filtros
const btnAll = document.getElementById("list-all");
const btnWomen = document.getElementById("list-women");
const btnMen = document.getElementById("list-men");
const btnGenderless = document.getElementById("list-genderless");
const btnUnknown = document.getElementById("list-unknown");

// Primero hago un fetch para traer la info de la api. Creo la funcion para 
// guardar la info. Despues sumo tambien la funcion de la paginacion y genero

const getInfoCharacters = (pageNumber, gender = "") => {
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}&gender=${gender}`)
    .then((res) => res.json())
    .then((data) => {
      renderInfoCharacters(data.results)
      totalPages = data.info.pages;
      updatePaginationInfo();
    })
    document.querySelector('nav').classList.remove('hidden');
}

getInfoCharacters(currentPage, currentGender);

// creo la funcion y hago un foreach para que renderice cada personaje.

const renderInfoCharacters = (characters) => {
  // container.innerHTML = "";
  characters.forEach((character) => {
    container.innerHTML += `<div class="character-card">
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="personaje" />
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origen: ${character.origin.name}</p>
    <p>Location: ${character.location.name}</p>
    <button class="button" onclick=getCardDetail("${character.url}")>Ver detalle</button>
    </div>`;
  });
};

//aca creo una nueva funcion para ver el detalle de cada personaje, que en este caso
//quiero mostrar una lista con el/los numero/s de episodio/s en el/los que aparece el 
//personaje. Lo que hago es tomar los ultimos digitos del url que son los numeros
//del episodio

const getCardDetail = (characterUrl) => {
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      const episodeNumbers = character.episode.map((episodeUrl) => {
        const parts = episodeUrl.split("/");
        return parts[parts.length - 1];
      });

      container.innerHTML = 
      `<div class="character-card">
          <h2>${character.name}</h2>
          <h3>El personaje aparece en los episodios:</h3>
          <ul>
            ${episodeNumbers.map((episodeNumber) => `<li>${episodeNumber}</li>`).join('')}
          </ul>
          <button onclick="getInfoCharacters()">Volver</button>
        </div>`;

        document.querySelector('nav').classList.add('hidden');
    });
};

// Creo un evento para avanzar a la siguiente pagina

btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    getInfoCharacters(currentPage, currentGender);
  }
});


// Creo un evento para regresar a la pagina anterior
btnPrev.addEventListener("click", () => {
  if (currentPage <= 1){
    btnPrev.setAttribute("disabled", true)
  } else if (currentPage > 1 && currentPage <= totalPages){
    currentPage--;
    btnNext.removeAttribute("disabled", true)
    btnPrev.removeAttribute("disabled", true)
  }
  else {
    btnNext.setAttribute("disabled", true)
    currentPage--;
  }

  getInfoCharacters(currentPage, currentGender);
});

// Creo un evento para ir a la primera pagina

btnFirst.addEventListener("click", () => {
  currentPage = 1;
  getInfoCharacters(currentPage, currentGender);
  btnPrev.setAttribute("disabled", true);
});

// Creo un evento para ir a la ultima pagina

btnLast.addEventListener("click", () => {
  currentPage = totalPages;
  getInfoCharacters(currentPage, currentGender);
  btnNext.setAttribute("disabled", true);
});


// Agrego una funcion para actualizar la informacion de la paginacion en pantalla
// (para mostrar la pagina actual y el total de paginas)

const updatePaginationInfo = () => {
  countPage.innerHTML = `Página actual: ${currentPage}`;
  totalPage.innerHTML = `Total: ${totalPages}`;
};


// Creo una funcion para que el usuario seleccione un numero de pagina "X"
//y lo redirija a ese numero de pagina

goToPageButton.addEventListener("click", () => {
  const pageNumber = parseInt(pageInput.value);
  if (pageNumber >= 1 && pageNumber <= totalPages) {
    currentPage = pageNumber;
    updatePaginationInfo();
    getInfoCharacters(currentPage, currentGender);
    pageInput.value = "";
  }
});

// Comienzo con los filtros

// Creo los eventos para aplicar los filtros de genero (todos, mujeres, hombres, sin genero
// y desconocido)

btnAll.addEventListener("click", () => {
  currentGender = "";
  getInfoCharacters(currentPage, currentGender);
});

btnWomen.addEventListener("click", () => {
  currentGender = "female";
  getInfoCharacters(currentPage, currentGender);
});

btnMen.addEventListener("click", () => {
  currentGender = "male";
  getInfoCharacters(currentPage, currentGender);
});

btnGenderless.addEventListener("click", () => {
  currentGender = "genderless";
  getInfoCharacters(currentPage, currentGender);
});

btnUnknown.addEventListener("click", () => {
  currentGender = "unknown";
  getInfoCharacters(currentPage, currentGender);
});
















 


