const API = "https://rickandmortyapi.com/api/";
const characters = document.getElementById("characters");
const prevBtn = document.querySelectorAll(".prev");
const nextBtn = document.querySelectorAll(".next");
const modal = document.querySelector("#cardModal");

var prevPage;
var nextPage;

axios.get(API + "character").then(function (response) {
  const totalCharacters = document.querySelector("#totalCharacters");
  totalCharacters.innerHTML += `<span> ${response.data.info.count}</span>`;
  nextPage = response.data.info.next;
  apiCharacters = response.data.results;

  apiCharacters.forEach((character) => {
    var status;
    switch (character.status) {
      case "Alive":
        status = "🟢Alive";
        break;
      case "Dead":
        status = "🔴Dead";
        break;

      default:
        status = "⚫Unknow";
        break;
    }

    characters.innerHTML += `<article data-character-id=${character.id} onclick="handleClick(this)"
    id="card"
    data-bs-toggle="modal"
    data-bs-target="#cardModal"
    class="col-6 col-md-4 col-xl-2 p-2 my-card rounded shadow"
  >
    <figure>
      <img
        class="img-fluid rounded shadow"
        src=${character.image}
        alt=""
      />
    </figure>
    <aside>
      <div>
        <p class="text-success fw-bold fs-5">${character.name}</p>
        <div class="status mb-3">
          <p class="fw-bold">${status} - ${character.species}</p>
        </div>
      </div>
      <p class="fw-bold">Last known location:</p>
      <p>${character.location.name}</p>
    </aside>
  </article>`;
  });
});

axios.get(API + "location").then(function (response) {
  const totalLocations = document.querySelector("#totalLocations");
  totalLocations.innerHTML += `<span> ${response.data.info.count}</span>`;
});

axios.get(API + "episode").then(function (response) {
  const totalEpisodes = document.querySelector("#totalEpisodes");
  totalEpisodes.innerHTML += `<span> ${response.data.info.count}</span>`;
});

prevBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    characters.innerHTML = `<div
      style="
        height: 75vh;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
    </div>`;

    setTimeout(() => {
      axios.get(prevPage).then(function (response) {
        prevPage = response.data.info.prev;
        nextPage = response.data.info.next;
        apiCharacters = response.data.results;
        characters.innerHTML = "";

        apiCharacters.forEach((character) => {
          var status;
          switch (character.status) {
            case "Alive":
              status = "🟢Alive";
              break;
            case "Dead":
              status = "🔴Dead";
              break;

            default:
              status = "⚫Unknow";
              break;
          }
          characters.innerHTML += `<article data-character-id=${character.id} onclick="handleClick(this)"
        id="card"
        data-bs-toggle="modal"
        data-bs-target="#cardModal"
        class="col-6 col-md-4 col-xl-2 p-2 my-card rounded shadow"
      >
        <figure>
          <img
            class="img-fluid rounded shadow"
            src=${character.image}
            alt=""
          />
        </figure>
        <aside>
          <div>
            <p class="text-success fw-bold fs-5">${character.name}</p>
            <div class="status mb-3">
              <p class="fw-bold">${status} - ${character.species}</p>
            </div>
          </div>
          <p class="fw-bold">Last known location:</p>
          <p>${character.location.name}</p>
        </aside>
      </article>`;
        });
      });
    }, 700);
  });
});

nextBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    characters.innerHTML = `<div
    style="
      height: 75vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="three-body">
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
      <div class="three-body__dot"></div>
    </div>
  </div>`;

    setTimeout(() => {
      axios.get(nextPage).then(function (response) {
        prevPage = response.data.info.prev;
        nextPage = response.data.info.next;
        apiCharacters = response.data.results;
        characters.innerHTML = "";

        apiCharacters.forEach((character) => {
          var status;
          switch (character.status) {
            case "Alive":
              status = "🟢Alive";
              break;
            case "Dead":
              status = "🔴Dead";
              break;

            default:
              status = "⚫Unknow";
              break;
          }
          characters.innerHTML += `<article data-character-id=${character.id} onclick="handleClick(this)"
        id="card"
        data-bs-toggle="modal"
        data-bs-target="#cardModal"
        class="col-6 col-md-4 col-xl-2 p-2 my-card rounded shadow"
      >
        <figure>
          <img
            class="img-fluid rounded shadow"
            src=${character.image}
            alt=""
          />
        </figure>
        <aside>
          <div>
            <p class="text-success fw-bold fs-5">${character.name}</p>
            <div class="status mb-3">
              <p class="fw-bold">${status} - ${character.species}</p>
            </div>
          </div>
          <p class="fw-bold">Last known location:</p>
          <p>${character.location.name}</p>
        </aside>
      </article>`;
        });
      });
    }, 800);
  });
});

function handleClick(article) {
  // Obtenha o valor do atributo data-character-id
  const characterId = article.getAttribute("data-character-id");

  // Faça o que você quiser com o valor de characterId
  axios.get(API + "character/" + characterId).then(function (response) {
    var status;
    switch (response.data.status) {
      case "Alive":
        status = "🟢Alive";
        break;
      case "Dead":
        status = "🔴Dead";
        break;

      default:
        status = "⚫Unknow";
        break;
    }

    const modalName = document.querySelector("#modalName");
    const modalImage = document.querySelector("#modalImage");
    const modalStatus = document.querySelector("#modalStatus");
    const modalGender = document.querySelector("#modalGender");
    const modalOrigin = document.querySelector("#modalOrigin");
    const modalLocation = document.querySelector("#modalLocation");

    modalName.innerHTML = response.data.name;
    modalImage.setAttribute("src", `${response.data.image}`);
    modalStatus.innerHTML = `${status} - ${response.data.species}`;
    modalGender.innerHTML = `Gender: ${response.data.gender}`;
    modalOrigin.innerHTML = `Origin: ${response.data.origin.name}`;
    modalLocation.innerHTML = `Last location: ${response.data.location.name}`;
  });
}
