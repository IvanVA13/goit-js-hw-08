import gallery from "./gallery-items.js";

const imagesList = document.querySelector(".js-gallery")
const modalWindow = document.querySelector("div.lightbox")
const modalWindowImage = modalWindow.querySelector("img.lightbox__image")
const createImagesEl = ({ preview, original, description }) => {
 return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`
}

imagesList.innerHTML = gallery.map(createImagesEl).join("")

const openModalWindow = () => {
  event.preventDefault()
  window.addEventListener("keydown", closeModalWindow)
  window.addEventListener("keydown", slideImagesInModalWindow)
  modalWindowImage.removeAttribute("src")
  modalWindowImage.removeAttribute("alt")
  modalWindow.classList.toggle("is-open")
  modalWindowImage.setAttribute("src", event.target.dataset.source)
  modalWindowImage.setAttribute("alt", event.target.alt)
}

const closeModalWindow = (event) => {
  
  if (event.target.classList.contains("lightbox__overlay") || event.target.classList.contains("lightbox__button") || event.code === "Escape" && modalWindow.classList.contains("is-open")) {
    window.removeEventListener("keydown", closeModalWindow)
    window.removeEventListener("keydown", slideImagesInModalWindow)
    modalWindow.classList.toggle("is-open")
  }
}

const slideImagesInModalWindow = (event) => {
  if (modalWindow.classList.contains("is-open")) {
    const arrGalleryLinks = [...imagesList.querySelectorAll(".gallery__link")];
    let item = 0
    const lastItem = arrGalleryLinks.length - 1
    arrGalleryLinks.find((el, i) => {
      if (el.getAttribute("href") === modalWindowImage.src)
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
    modalWindowImage.setAttribute("src", arrGalleryLinks[item].getAttribute("href"))
    modalWindowImage.setAttribute("alt", arrGalleryLinks[item].getAttribute("alt"))
  }

}


imagesList.addEventListener("click", openModalWindow)
modalWindow.addEventListener("click", closeModalWindow)
