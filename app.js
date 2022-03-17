const burgerMenu = document.getElementById("burger-menu");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const lis = [...document.querySelectorAll("nav > ul > li")];

let burgerShow = false;

burgerMenu.addEventListener("click", (e) => {
  e.preventDefault();

  if (!burgerShow) {
    nav.classList.add("burgerShow");
    main.classList.add("blur");
    let timer = window.setTimeout(
      () => nav.classList.add("burgerAnimationIn"),
      10
    );
    timer = window.setTimeout(() => {
      lis.forEach((li, index) => {
        let subTimer = window.setTimeout(
          () => {
                li.classList.add("liAnimationIn");
            },
          50*index
        );
      });
    }, 400);

    burgerShow = true;
  } else {
    nav.classList.remove("burgerShow");
    main.classList.remove("blur");
    nav.classList.remove("burgerAnimationIn");
    lis.forEach((li) => li.classList.remove("liAnimationIn"));
    burgerShow = false;
  }

  // nav.classList.toggle("burgerAnimation")
});
