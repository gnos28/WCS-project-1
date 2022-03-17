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
    }, 100);

    burgerShow = true;
  } else {
    nav.classList.remove("burgerAnimationIn");
    main.classList.remove("blur");
    
    let timer = window.setTimeout(() => {nav.classList.remove("burgerShow");}, 400)

    lis.forEach((li) => li.classList.remove("liAnimationIn"));
    burgerShow = false;
  }

  // nav.classList.toggle("burgerAnimation")
});
