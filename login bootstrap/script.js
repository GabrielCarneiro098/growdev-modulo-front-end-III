submit = document.querySelector("button");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.querySelector("#inputEmail").value;
  const senha = document.querySelector("#inputPassword").value;

  const user = {
    email: email,
    senha: senha,
  };

  axios
    .get("https://api-recados-nk2h.onrender.com/login", { params: user })
    .then(function (response) {
      console.log(response);
    });

  console.log(user);
});
