const outPut = document.querySelector("#outPut");
submit = document.querySelector("button");
var page = 1;

function prevPage() {
  page -= 1;
  outPut.innerHTML = "";
  axios
    .get(`https://api-recados-nk2h.onrender.com/recados?page=${page}`)
    .then(function (response) {
      console.log(response);
      var page = 1;
      response.data.forEach((recado) => {
        outPut.innerHTML += `<div class="recado"><h2>${recado.nome}</h2><h4>${recado.titulo}</h4><p>${recado.descricao}</p></div>`;
      });
    });

  outPut.innerHTML += `<div
          style="display: flex; gap: 50px"
          id="buttons"
          class="hidden align-self-center justify-self-center"
        >
          <button id="prevPage" class="btn btn-primary" onclick="prevPage()">
            Prev
          </button>
          <button id="nextPage" class="btn btn-primary" onclick="nextPage()">
            Next
          </button>`;
}

function nextPage() {
  page += 1;
  outPut.innerHTML = "";
  axios
    .get(`https://api-recados-nk2h.onrender.com/recados?page=${page}`)
    .then(function (response) {
      console.log(response);
      var page = 1;
      response.data.forEach((recado) => {
        outPut.innerHTML += `<div class="recado"><h2>${recado.nome}</h2><h4>${recado.titulo}</h4><p>${recado.descricao}</p></div>`;
      });
    });
  outPut.innerHTML += `<div
          style="display: flex; gap: 50px"
          id="buttons"
          class="hidden align-self-center justify-self-center"
        >
          <button id="prevPage" class="btn btn-primary" onclick="prevPage()">
            Prev
          </button>
          <button id="nextPage" class="btn btn-primary" onclick="nextPage()">
            Next
          </button>`;
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.querySelector("#inputEmail").value;
  const senha = document.querySelector("#inputPassword").value;

  axios
    .post("https://api-recados-nk2h.onrender.com/login", { email, senha })
    .then(function (response) {
      console.log(response);
      outPut.innerHTML = "";
      outPut.innerHTML += `<h1>Bem vindo ${response.data.nome}</h1>
      <p>Essas são as ultimas atualizações da API</p>
      `;

      axios
        .get("https://api-recados-nk2h.onrender.com/recados")
        .then(function (response) {
          console.log(response);

          response.data.forEach((recado) => {
            outPut.innerHTML += `<div class="recado"><h2>${recado.nome}</h2><h4>${recado.titulo}</h4><p>${recado.descricao}</p></div>`;
          });

          outPut.innerHTML += `<div
          style="display: flex; gap: 50px"
          id="buttons"
          class="hidden align-self-center justify-self-center"
        >
          <button id="prevPage" class="btn btn-primary" onclick="prevPage()">
            Prev
          </button>
          <button id="nextPage" class="btn btn-primary" onclick="nextPage()">
            Next
          </button>`;
        });
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
    });
});
