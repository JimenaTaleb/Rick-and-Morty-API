//variables:
//contenedor
const container = document.getElementById("container");
//contador paginacion
const countPage = document.getElementById("count-actual-page");
const totalPages = document.getElementById("total-pages");
//paginacion
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnFirst = document.getElementById("btn-first");
const btnLast = document.getElementById("btn-last");
//filtros
const femaleList = document.getElementById("list-woman");
const maleList = document.getElementById("list-women");
const genderlessList = document.getElementById("list-genderless");
const unknownList = document.getElementById("list-unknown");

//hago un fetch para traer la info de la api y lo guardo en una funcion. Como
//la funcion es flecha, toma el nombre de la variable donde guardo los datos
//que es getinfocharacters. Lego se debe crear otra funcion para trabajar con
//los datos del fetch. Entonces primero en una funcion guardo los datos y en
//la segunda los proceso. En el segundo then estoy invocando una funcion que
//aun no se creo, entonces hay que definirla mas abajo y esta bien xq es
//asincronico

const getInfoCharacters = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => renderInfoCharacters(data));
};

getInfoCharacters();

//como arriba llame a la funcion renderinfocharacters y no la cree, paso
//a crearla y hago un foreach para que renderice cada personaje ya que
//devuelve un array (results) con los personajes.
//toda la web de character es data, y si yo quiero acceder a results, debo
//llamarlo data.results xq results es una propiedad de data.
//en el foreach entre()va cada elemento que renderizo (individual,
//no plural): character.
//en el caso de container.inner html se usa += para que se sumen y no se
//superpongan y el conainer anterior es para vaciarlo entre vuelta y v

const renderInfoCharacters = (data) => {
  container.innerHTML = "";
  data.results.forEach((character) => {
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

//en boton va la funcion que vamos a crear para ver la card individual del
//personaje y entre () el parametro de la funcion. Lo primero que debe
//hacer la funcion es limpiar el container

const getCardDetail = (characterUrl) => {
  container.innerHTML=""
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = 
      `<div class="character-card">
  <h2>${character.name}</h2>
  <img src="${character.image}" alt="" />
  <p>Episodios: ${character.episode}</p>

<button onclick="getInfoCharacters()">Volver</button>
</div>`
    });
};

