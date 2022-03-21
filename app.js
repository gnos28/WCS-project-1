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

nav.addEventListener('click', (e) => hideBurgerMenu())

// ********************* DEBUT CUSTOM BURGER CLASS *********************

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

    this.squarePath1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath1.setAttribute('fill', '#2c5d87')
    this.squarePath1.setAttribute('d', this.squarePath1_draw(0, burgerShow))
    svg.appendChild(this.squarePath1)

    this.squarePath2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath2.setAttribute('fill', '#2c5d87')
    this.squarePath2.setAttribute('d', this.squarePath2_draw(0, burgerShow))
    svg.appendChild(this.squarePath2)

    this.squarePath3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.squarePath3.setAttribute('fill', '#2c5d87')
    this.squarePath3.setAttribute('d', this.squarePath3_draw(0, burgerShow))
    svg.appendChild(this.squarePath3)

    this.burgerPath1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath1.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath1.setAttribute('d', this.burgerPath1_draw(0, burgerShow))
    svg.appendChild(this.burgerPath1)

    this.burgerPath2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath2.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath2.setAttribute('d', this.burgerPath2_draw(0, burgerShow))
    svg.appendChild(this.burgerPath2)

    this.burgerPath3 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    this.burgerPath3.setAttribute('style', this.burgerPath_style(0, burgerShow))
    this.burgerPath3.setAttribute('d', this.burgerPath3_draw(0, burgerShow))
    svg.appendChild(this.burgerPath3)

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

    nav.addEventListener('click', (e) => {
      this.animateBurger(!burgerShow)
    })

    liLinks.forEach((link) =>
      link.addEventListener('click', (e) => {
        this.animateBurger(!burgerShow)
      })
    )

    shadow.appendChild(style)
    shadow.appendChild(svg)
  }

  burgerPath_style(time, reverse) {
    let strokeWidthMin = 5
    let strokeWidthMax = 15

    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const strokeWidth = !reverse
        ? strokeWidthMax - time * (strokeWidthMax - strokeWidthMin)
        : strokeWidthMin + time * (strokeWidthMax - strokeWidthMin)

      return `fill:none;
        stroke:#2c5d87;
        stroke-width:${strokeWidth};
        stroke-linecap:round;
        stroke-linejoin:miter;
        stroke-miterlimit:4;
        stroke-opacity:1;
        stroke-dasharray:none
        ` // stroke:#2c5d87;
    } else return ''
  }

  calcVal(
    reverse,
    time,
    val1start = 0,
    val1end = 0,
    val2start = 0,
    val2end = 0,
    val3start = 0,
    val3end = 0,
    val4start = 0,
    val4end = 0
  ) {
    const val1 = !reverse
      ? val1end - time * (val1end - val1start)
      : val1start + time * (val1end - val1start)
    const val2 = !reverse
      ? val2end - time * (val2end - val2start)
      : val2start + time * (val2end - val2start)
    const val3 = !reverse
      ? val3end - time * (val3end - val3start)
      : val3start + time * (val3end - val3start)
    const val4 = !reverse
      ? val4end - time * (val4end - val4start)
      : val4start + time * (val4end - val4start)

    return [val1, val2, val3, val4]
  }

  burgerPath1_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      const val1start = 6 // 6 > 6
      const val1end = 6
      const val2start = 23 // 23 > 10
      const val2end = 20
      const val3start = 84 // 84 > 84
      const val3end = 84
      const val4start = 23 // 23 > 10
      const val4end = 20

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  burgerPath2_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      // end = burger mode
      const val1start = 4.2 // 6 > 6
      const val1end = 6
      const val2start = 28.8 // 23 > 10
      const val2end = 50
      const val3start = 39.3 // 84 > 84
      const val3end = 84
      const val4start = 99.2 // 23 > 10
      const val4end = 50

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  burgerPath3_draw(time, reverse) {
    if ((time > 0.5 && !reverse) || (time < 0.5 && reverse)) {
      return ``
    } else {
      // end = burger mode
      const val1start = 46.5 // 6 > 6
      const val1end = 6
      const val2start = 97.2 // 23 > 10
      const val2end = 80
      const val3start = 90.3 // 84 > 84
      const val3end = 84
      const val4start = 30.2 // 23 > 10
      const val4end = 80

      if (!reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} ${val3},${val4}`
    }
  }

  squarePath1_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 21.4 // 21.4 >> 0.7
      const val1end = 0.7
      const val2start = 25.4 // 25.4 >> 46.4
      const val2end = 46.4
      const val3start = 0 // 0 >> -20.8
      const val3end = -20.8

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end
      )

      return `M41.3,${val2} c2,1.1,5.2,1.1,7.1,0
    l35.9 ${val3} c2-1.1,2-3,0-4.1
    L48.5,${val1} c-2-1.1-5.2-1.1-7.2,0
    L5.4,21.4 c-2,1.1-2,3,0,4.1
    L41.3,${val2}
    z`
    }
  }

  squarePath2_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 23.8 // 23.8 >> 43.2
      const val1end = 43.2 // 23.8 >> 43.2
      const val2start = 62.5 // 62.5 >> 55.7
      const val2end = 55.7 // 62.5 >> 55.7
      const val3start = 16.8 // 16.8 >> 0.3
      const val3end = 0.3 // 16.8 >> 0.3
      const val4start = 58 // 58 >> 72.2
      const val4end = 72.2 // 58 >> 72.2

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} c0-2.3-1.6-5.1-3.6-6.2
    L4.2,28.8 c-2-1.1-3.6-0.2-3.6,2.1
    L${val3},${val4} c0,2.3,1.6,5.1,3.6,6.2
    L39.3,99.2 c2,1.1,3.6,0.2,3.6-2.1
    L${val1},${val2}
    z`
    }
  }

  squarePath3_draw(time, reverse) {
    if ((time > 0.5 && reverse) || (time < 0.5 && !reverse)) {
      return ``
    } else {
      const val1start = 69.2 // 23.8 >> 43.2
      const val1end = 50.2 // 23.8 >> 43.2
      const val2start = 57.5 // 62.5 >> 55.7
      const val2end = 49.5 // 62.5 >> 55.7
      const val3start = 69.3 // 16.8 >> 0.3
      const val3end = 86.3 // 16.8 >> 0.3
      const val4start = 66 // 58 >> 72.2
      const val4end = 78 // 58 >> 72.2

      if (reverse) time = time * 2
      else time = (time - 0.5) * 2

      const [val1, val2, val3, val4] = this.calcVal(
        !reverse,
        time,
        val1start,
        val1end,
        val2start,
        val2end,
        val3start,
        val3end,
        val4start,
        val4end
      )

      return `M${val1},${val2} c-2,1.1-3.6,3.9-3.6,6.2
    L46.5,97.2 c0,2.3,1.6,3.2,3.6,2.1
    L${val3},${val4} c2-1.1,3.6-3.9,3.6-6.2
    L90.3,30.2 c0-2.3-1.6-3.2-3.6-2.1
    L${val1},${val2}
    z`
    }
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
    this.burgerPath1.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath1.setAttribute('d', this.burgerPath1_draw(progress, reverse))
    this.burgerPath2.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath2.setAttribute('d', this.burgerPath2_draw(progress, reverse))
    this.burgerPath3.setAttribute(
      'style',
      this.burgerPath_style(progress, reverse)
    )
    this.burgerPath3.setAttribute('d', this.burgerPath3_draw(progress, reverse))

    this.squarePath1.setAttribute('d', this.squarePath1_draw(progress, reverse))
    this.squarePath2.setAttribute('d', this.squarePath2_draw(progress, reverse))
    this.squarePath3.setAttribute('d', this.squarePath3_draw(progress, reverse))
  }
}

customElements.define('custom-burger', CustomBurger)

// ********************* FIN CUSTOM BURGER CLASS *********************

const titleDiv = document.querySelector('header > .header-container > div')
const titleH1 = document.querySelector('header > .header-container > div > h1')

const title = titleH1.innerText
const rawWords = title.split(' ')
const words = rawWords.map((word) => [...word])

titleDiv.removeChild(titleH1)

let delay = 0

words.forEach((word) => {
  const wordDiv = document.createElement('div')

  word.forEach((letter, letterIndex) => {
    let subTimer = window.setTimeout(() => {
      const letterDiv = document.createElement('div')
      letterDiv.classList.add('intro')
      let subTimer = window.setTimeout(
        () => letterDiv.classList.remove('intro'),
        10
      )
      const subLetterDiv = document.createElement('div')
      subLetterDiv.innerText = letter
      letterDiv.appendChild(subLetterDiv)
      wordDiv.appendChild(letterDiv)
    }, delay * 140)

    delay++
  })

  titleDiv.appendChild(wordDiv)
})

console.log(words)
