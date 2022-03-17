const burgerMenu = document.getElementById("burger-menu")
const nav = document.querySelector("nav")

let burgerShow = false

burgerMenu.addEventListener("click",(e) => {
    e.preventDefault()

    if(!burgerShow)
    {
        nav.classList.add("burgerShow")
        nav.classList.add("burgerAnimationIn")
        burgerShow = true
    }
    else
    {
        nav.classList.remove("burgerShow")
        nav.classList.remove("burgerAnimationIn")
        burgerShow = false
    }

    // nav.classList.toggle("burgerAnimation")
})