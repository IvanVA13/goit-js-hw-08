import gallery from "./gallery-items.js";
let item = 0
const lastItem = gallery.length - 1
const imagesList = document.querySelector(".js-gallery")
const modalWindow = document.querySelector("div.lightbox")
const modalWindowImage = modalWindow.querySelector("img.lightbox__image")
const createImagesEl = ({ preview, original, description }) => {
 return `<li class="gallery__item"><a class="gallery__link" href=${original}><img loading="lazy" class="gallery__image lazyload" data-src=${preview} data-source=${original} alt=${description} width="400" height="340"/></a></li>`
}
imagesList.insertAdjacentHTML("beforeend", gallery.map(createImagesEl).join(""))

if ("loading" in HTMLImageElement.prototype) {
  console.log(imagesList.querySelectorAll("img[class='gallery__image lazyload']"));
  imagesList.querySelectorAll("img[class='gallery__image lazyload']").forEach(img => img.src = img.dataset.src)
} else {
  const script = document.createElement('script')
  script.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js")
  script.setAttribute("integrity", "sha512-JrL1wXR0TeToerkl6TPDUa9132S3PB1UeNpZRHmCe6TxS43PFJUcEYUhjJb/i63rSd+uRvpzlcGOtvC/rDQcDg==")
  script.setAttribute("crossorigin", "anonymous")
  document.body.appendChild(script)
  }

// trying add random foto cats in new gallery
// const createNewimagesEl = (num) => {
//   const arrElements = []
  
//   for (let i = 0; i < num; i += 1) {
//     let randomNumber = parseInt(Math.random()*50)
//     let randomCat = randomNumber < 10 ? `https://loremflickr.com/64${randomNumber}/48${randomNumber}/cat`: `https://loremflickr.com/6${randomNumber}/4${randomNumber+40}/cat`
//     arrElements[i] = `<li class="gallery__item"><a class="gallery__link" href=${randomCat}><img class="gallery__image" src=${randomCat} data-source=${randomCat} alt= "Котик-${i+1}"/></a></li>`
//   }
//   return arrElements.join("")
// }
// imagesList.insertAdjacentHTML("beforeend", createNewimagesEl(48))

const openModalWindow = () => {
  event.preventDefault()
  if (!event.target.classList.contains("gallery__image")) {
    return
  }
  modalWindowImage.setAttribute("src", event.target.dataset.source)
  modalWindowImage.setAttribute("alt", event.target.alt)
  window.addEventListener("keydown", closeModalWindow)
  window.addEventListener("keydown", slideImagesInModalWindow)
  modalWindow.classList.toggle("is-open")
}

const closeModalWindow = (event) => {
  if (event.target.classList.contains("lightbox__overlay") || event.target.classList.contains("lightbox__button") || event.code === "Escape") {
    window.removeEventListener("keydown", closeModalWindow)
    window.removeEventListener("keydown", slideImagesInModalWindow)
    modalWindow.classList.toggle("is-open")
    setTimeout(removeImageAttr, 250)
  }
}

const removeImageAttr = () => {
  modalWindowImage.removeAttribute("src")
  modalWindowImage.removeAttribute("alt")
}

const slideImagesInModalWindow = (event) => {
    gallery.find((el, i) => {
      if (el.original === modalWindowImage.src) {
          item = i
        }
     })
    if (event.code === "ArrowLeft") {
      if (item > 0) {
        item -= 1
      } else {
        item = lastItem
      }
     }
    if (event.code === "ArrowRight") {
      if (item < lastItem) {
        item += 1
      } else {
        item = 0
      }
    }
    modalWindowImage.setAttribute("src", gallery[item].original)
    modalWindowImage.setAttribute("alt", gallery[item].description)
}

imagesList.addEventListener("click", openModalWindow)
modalWindow.addEventListener("click", closeModalWindow)

// create Animation
const onImageLoaded = (evt) => {
  evt.target.classList.add("animation")
  console.log("Img loaded")
}

const arrLazyImages = imagesList.querySelectorAll("img[class='gallery__image lazyload']")
arrLazyImages.forEach(img => {
  img.addEventListener('load', onImageLoaded, {once: true})
});