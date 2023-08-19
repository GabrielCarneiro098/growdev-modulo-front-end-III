boxButton = document.querySelector("#boxButton");
shine = document.querySelector("#shine");
marioOut = document.querySelector(".marioOut");
bullet = document.querySelector(".bullet");
main = document.querySelector("main");
escurecer = document.querySelector(".escurecer");
sinopse = document.querySelector(".sinopse");
date = document.querySelector(".date");
boxSign = document.querySelector(".box-sign");

shine.addEventListener("click", () => {
  boxButton.style.animation = "fly 2s ease-in-out";
  shine.style.animation = "opacity 2s";
  boxSign.style.animation = "opacity 2s";
  sinopse.style.animation = "flyLeft 2s ease-in-out";
  date.style.animation = "flyRight 2s ease-in-out";
  marioOut.style.animation = "opacity 2s";
  bullet.style.animation = "opacity 2s";
  escurecer.style.animation = "escurecer 2s";

  setTimeout(() => {
    boxButton.style.display = "none";
    marioOut.style.display = "none";
    bullet.style.display = "none";
    escurecer.style.opacity = "0.5";
    date.style.display = "none";
    sinopse.style.display = "none";

    main.innerHTML += `<iframe
    class="trailer"
    src="./assets/images/trailer.mp4"
    frameborder="0"
  ></iframe>`;
  }, 2000);
});
