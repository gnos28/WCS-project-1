const burgerMenu = document.getElementById('burger-menu')
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const lis = [...document.querySelectorAll('nav > ul > li')]
const liLinks = [...document.querySelectorAll('nav > ul > li a')]

let burgerShow = false

const hideBurgerMenu = () => {
  nav.classList.remove('burgerAnimationIn')
  main.classList.remove('blur')

  let timer = window.setTimeout(() => {
    nav.classList.remove('burgerShow')
  }, 400)

  lis.forEach((li) => li.classList.remove('liAnimationIn'))
  burgerShow = false

  console.log('hide burger Menu')
}

burgerMenu.addEventListener('click', (e) => {
  e.preventDefault()

  if (!burgerShow) {
    nav.classList.add('burgerShow')
    main.classList.add('blur')
    let timer = window.setTimeout(
      () => nav.classList.add('burgerAnimationIn'),
      10
    )
    timer = window.setTimeout(() => {
      lis.forEach((li, index) => {
        let subTimer = window.setTimeout(() => {
          li.classList.add('liAnimationIn')
        }, 50 * index)
      })
    }, 100)

    burgerShow = true
  } else hideBurgerMenu()

  // nav.classList.toggle("burgerAnimation")
})

liLinks.forEach((link) =>
  link.addEventListener('click', (e) => {
    hideBurgerMenu()
  })
)

// CUSTOM BURGER CLASS

let strToDom = (str) =>
  document.createRange().createContextualFragment(str).firstChild

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

class CustomBurger extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const svg = strToDom(`<svg viewBox="0 0 100 100">
        </svg>`)

    this.path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.path1.setAttribute('fill', '#2c5d87') // c2,1.1,5.2,1.1,7.1,0
    this.path1.setAttribute(
      'd',
      this.path1_draw(0)
    )
    svg.appendChild(this.path1)

    this.path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.path2.setAttribute('fill', '#2c5d87')
    this.path2.setAttribute(
      'd',
      this.path2_draw(0)
    )
    svg.appendChild(this.path2)

    this.path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.path3.setAttribute('fill', '#2c5d87')
    this.path3.setAttribute(
      'd',
      this.path3_draw(0)
    )
    svg.appendChild(this.path3)

    const style = document.createElement('style')
    style.innerHTML = `
            :host{
                display:block;
                position:relative;
            }
            svg{
                height:calc(0.8 * var(--header-height));
            }
            path{
                cursor:pointer;
            }
        `

    svg.addEventListener('click', (e) => {
      this.animateBurger(burgerShow)
    })
    shadow.appendChild(style)
    shadow.appendChild(svg)
  }

  path1_draw(time, reverse) {
    const val1start = 21.4 // 21.4 >> 0.7
    const val1end = 0.7
    const val2start = 25.4 // 25.4 >> 46.4
    const val2end = 46.4
    const val3start = 0 // 0 >> -20.8
    const val3end = -20.8

    const val1 = reverse?val1end - time * (val1end - val1start)
    :val1start + time * (val1end - val1start)
    const val2 = reverse?val2end - time * (val2end - val2start)
    :val2start + time * (val2end - val2start)
    const val3 = reverse?val3end - time * (val3end - val3start)
    :val3start + time * (val3end - val3start)

    return `M41.3,${val2} c2,1.1,5.2,1.1,7.1,0
    l35.9 ${val3} c2-1.1,2-3,0-4.1
    L48.5,${val1} c-2-1.1-5.2-1.1-7.2,0
    L5.4,21.4 c-2,1.1-2,3,0,4.1
    L41.3,${val2}
    z`
  }
  
  path2_draw(time, reverse) {
    const val1start = 23.8 // 23.8 >> 43.2
    const val1end = 43.2 // 23.8 >> 43.2
    const val2start = 62.5 // 62.5 >> 55.7
    const val2end = 55.7 // 62.5 >> 55.7
    const val3start = 16.8 // 16.8 >> 0.3
    const val3end = 0.3 // 16.8 >> 0.3
    const val4start = 58 // 58 >> 72.2
    const val4end = 72.2 // 58 >> 72.2

    const val1 = reverse?val1end - time * (val1end - val1start)
    :val1start + time * (val1end - val1start)
    const val2 = reverse?val2end - time * (val2end - val2start)
    :val2start + time * (val2end - val2start)
    const val3 = reverse?val3end - time * (val3end - val3start)
    :val3start + time * (val3end - val3start)
    const val4 = reverse?val4end - time * (val4end - val4start)
    :val4start + time * (val4end - val4start)

    return `M${val1},${val2} c0-2.3-1.6-5.1-3.6-6.2
    L4.2,28.8 c-2-1.1-3.6-0.2-3.6,2.1
    L${val3},${val4} c0,2.3,1.6,5.1,3.6,6.2
    L39.3,99.2 c2,1.1,3.6,0.2,3.6-2.1
    L${val1},${val2}
    z`
  }
  
  path3_draw(time, reverse) {
    
    const val1start = 69.2 // 23.8 >> 43.2
    const val1end = 50.2 // 23.8 >> 43.2
    const val2start = 57.5 // 62.5 >> 55.7
    const val2end = 49.5 // 62.5 >> 55.7
    const val3start = 69.3 // 16.8 >> 0.3
    const val3end = 86.3 // 16.8 >> 0.3
    const val4start = 66 // 58 >> 72.2
    const val4end = 78 // 58 >> 72.2

    const val1 = reverse?val1end - time * (val1end - val1start)
    :val1start + time * (val1end - val1start)
    const val2 = reverse?val2end - time * (val2end - val2start)
    :val2start + time * (val2end - val2start)
    const val3 = reverse?val3end - time * (val3end - val3start)
    :val3start + time * (val3end - val3start)
    const val4 = reverse?val4end - time * (val4end - val4start)
    :val4start + time * (val4end - val4start)

    return `M${val1},${val2} c-2,1.1-3.6,3.9-3.6,6.2
    L46.5,97.2 c0,2.3,1.6,3.2,3.6,2.1
    L${val3},${val4} c2-1.1,3.6-3.9,3.6-6.2
    L90.3,30.2 c0-2.3-1.6-3.2-3.6-2.1
    L${val1},${val2}
    z`
  }

  animateBurger(reverse) {
    const now = Date.now()
    const duration = 2000

    const drawCallback = () => {

      let t = (Date.now() - now) / duration
      
      if (t < 1) {
        this.draw(easeOutExpo(t), reverse)
        window.requestAnimationFrame(drawCallback)
      } else {
        this.draw(1, reverse)
      }
    }
    window.requestAnimationFrame(drawCallback)
  }

  draw(progress = 1, reverse = false) {
    this.path1.setAttribute(
      'd',
      this.path1_draw(progress, reverse)
    )
    this.path2.setAttribute(
      'd',
      this.path2_draw(progress, reverse)
    )
    this.path3.setAttribute(
      'd',
      this.path3_draw(progress, reverse)
    )
  }
}

customElements.define('custom-burger', CustomBurger)
