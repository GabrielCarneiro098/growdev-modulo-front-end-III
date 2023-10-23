const API = "https://rickandmortyapi.com/api/";
const characters = document.getElementById("characters");
const prevBtn = document.querySelectorAll(".prev");
const nextBtn = document.querySelectorAll(".next");
const showAllBtn = document.querySelectorAll(".show-all");
const modal = document.querySelector("#cardModal");
const searchBtn = document.querySelector("#searchBtn");
const logo = document.getElementById("logo");

var prevPage;
var nextPage;

function opacityAnimation() {
  var cards = document.querySelectorAll("#card");
  cards.forEach((card) => {
    card.style.animation = "opacity 1s";
  });
}

function fadeAnimation() {
  var cards = document.querySelectorAll("#card");
  cards.forEach((card) => {
    card.style.animation = "fade 1s";
  });
}

function checkPages() {
  if (prevPage === null) {
    prevBtn.forEach((btn) => {
      btn.classList.add("hideBtn");
    });
  } else if (prevPage !== null) {
    prevBtn.forEach((btn) => {
      btn.classList.remove("hideBtn");
    });
  }

  if (nextPage === null) {
    nextBtn.forEach((btn) => {
      btn.classList.add("hideBtn");
    });
  } else if (nextPage !== null) {
    nextBtn.forEach((btn) => {
      btn.classList.remove("hideBtn");
    });
  }
}

function searchCharacter() {
  var searchBar = document.getElementById("searchBar");
  var searchValue = searchBar.value;
  searchBar.value = "";

  if (searchValue !== "" && searchValue !== null) {
    var cards = document.querySelectorAll("#card");
    cards.forEach((card) => {
      card.style.animation = "opacity 0.5s";
    });
    fadeAnimation();
    setTimeout(() => {
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
    }, 500);

    axios
      .get(`${API}character/?name=${searchValue}`)
      .then(function (response) {
        var filteredCharacters = response.data.results;
        prevPage = response.data.info.prev;
        nextPage = response.data.info.next;

        checkPages();

        setTimeout(() => {
          showAllBtn.forEach((btn) => {
            btn.classList.remove("hideBtn");
          });

          characters.innerHTML = "";
          filteredCharacters.forEach((character) => {
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
          opacityAnimation();
        }, 1500);
      })
      .catch(function (error) {
        var randomNumber = (Math.random() * 10).toFixed(0);
        console.log(randomNumber);
        setTimeout(() => {
          characters.innerHTML = `
        <div id="card" class="container">
        <div class="row g-0">
          <div class="col-12 col-md-5 order-2 order-sm-1">
            <img src="./IMGs_Projeto/error/error${randomNumber}.png" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-12 col-md-5 align-self-center text-center order-1 order-sm-2">
              <h5 class="card-title text-danger fs-1 mb-5 fw-bold">⚠ERROR!!!</h5>
              <p class="card-text fs-3">${error.response.data.error}</p>
          </div>
        </div>
      </div>`;

          showAllBtn[0].classList.remove("hideBtn");

          prevBtn.forEach((btn) => {
            btn.classList.add("hideBtn");
          });

          nextBtn.forEach((btn) => {
            btn.classList.add("hideBtn");
          });
          opacityAnimation();
        }, 1000);
      });
  }
}

function showAllCharacters() {
  showAllBtn.forEach((btn) => {
    btn.classList.add("hideBtn");
  });
  fadeAnimation();

  setTimeout(() => {
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
  }, 500);

  axios.get(`${API}character`).then(function (response) {
    var filteredCharacters = response.data.results;
    prevPage = response.data.info.prev;
    nextPage = response.data.info.next;

    checkPages();

    setTimeout(() => {
      characters.innerHTML = "";
      filteredCharacters.forEach((character) => {
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
      opacityAnimation();
    }, 1500);
  });
}

showAllBtn.forEach((btn) => {
  btn.addEventListener("click", showAllCharacters);
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

searchBtn.addEventListener("click", searchCharacter);
searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchCharacter();
  }
});
logo.addEventListener("click", showAllCharacters);

axios.get(API + "character").then(function (response) {
  const totalCharacters = document.querySelector("#totalCharacters");
  totalCharacters.innerHTML += `<span> ${response.data.info.count}</span>`;
  var apiCharacters = response.data.results;

  nextPage = response.data.info.next;
  prevPage = response.data.info.prev;

  checkPages();

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
  opacityAnimation();
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
    fadeAnimation();

    setTimeout(() => {
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
    }, 500);

    setTimeout(() => {
      axios.get(prevPage).then(function (response) {
        prevPage = response.data.info.prev;
        nextPage = response.data.info.next;

        checkPages();

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
        class="col-6 col-md-4 col-xl-2 p-2 my-card rounded shadow">
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
        opacityAnimation();
      });
    }, 1000);
  });
});

nextBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    fadeAnimation();

    setTimeout(() => {
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
    }, 500);

    setTimeout(() => {
      axios.get(nextPage).then(function (response) {
        prevPage = response.data.info.prev;
        nextPage = response.data.info.next;

        checkPages();

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
        opacityAnimation();
      });
    }, 1000);
  });
});
