import gallery from "./gallery-items.js";

const imagesList = document.querySelector(".js-gallery")
const modalWindow = document.querySelector("div.lightbox")
const modalWindowImage = modalWindow.querySelector("img.lightbox__image")
let item = 0
const lastItem = gallery.length - 1
const createImagesEl = ({ preview, original, description }) => {
 return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`
}

imagesList.innerHTML = gallery.map(createImagesEl).join("")

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
