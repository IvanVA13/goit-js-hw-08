import gallery from "./gallery-items.js";

const imagesList = document.querySelector(".js-gallery")
const modalWindow = document.querySelector("div.lightbox")
const createImagesEl = ({ preview, original, description }) => {
 return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`
}

imagesList.innerHTML = gallery.map(createImagesEl).join("")

const openModalWindow = () => {
  event.preventDefault()
  modalWindow.querySelector("img.lightbox__image").src = ""
  modalWindow.querySelector("img.lightbox__image").alt = ""
  modalWindow.classList.toggle("is-open")
  modalWindow.querySelector("img.lightbox__image").src = event.target.dataset.source
  modalWindow.querySelector("img.lightbox__image").alt = event.target.alt
}

const closeModalWindow = (event) => {
  
  if (event.target.classList.contains("lightbox__overlay") || event.target.classList.contains("lightbox__button") || event.code === "Escape" && modalWindow.classList.contains("is-open")) {
    modalWindow.classList.toggle("is-open")
  }
}

const slideImagesInModalWindow = (event) => {
  if (modalWindow.classList.contains("is-open")) {
    const arrGalleryLinks = [...imagesList.querySelectorAll(".gallery__link")];
    let item = 0
    const lastItem = arrGalleryLinks.length - 1
    arrGalleryLinks.find((el, i) => {
      if (el.getAttribute("href") === modalWindow.querySelector("img.lightbox__image").src)
        {
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
      modalWindow.querySelector("img.lightbox__image").src = arrGalleryLinks[item].getAttribute("href")
      modalWindow.querySelector("img.lightbox__image").alt = arrGalleryLinks[item].getAttribute("alt")
  }

}


imagesList.addEventListener("click", openModalWindow)
modalWindow.addEventListener("click", closeModalWindow)
document.addEventListener("keydown", closeModalWindow)
document.addEventListener("keydown", slideImagesInModalWindow)
 