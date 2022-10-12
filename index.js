let myLibrary = [];
let index = 0


// Funcion constructora
function Book (title, auth, pages) {
  this.title = title;
  this.auth = auth;
  this.pages = pages;
  this.id = 0;
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function isEmpty() {
  if (inputTitle.value !== "" && inputAuth.value !== "" && inputPages.value !== "") {
    return false
  } else {
    return true
  }
}

function createCardBook(book) {
  let cardContainer = document.createElement("div")
  cardContainer.classList.add("card")
  cardContainer.setAttribute("data-index", book.id)
  cardContainer.innerHTML = `
    <div class="delete-card">
      <button onclick="deleteCard(event)" ><img src="./img/close.svg" alt="close"></button>
    </div>
    <div class="card-info">
      <span>${book.title}</span>
      <span>${book.auth}</span>
      <span>${book.pages}</span>
    </div>
    <div class="card-status">
      <span></span>
    </div>
  `
  mainContainer.appendChild(cardContainer)
}

// Funciones Principales
function createCard() {
  let empty = isEmpty()
  if (!empty) {
    let newBook = new Book(inputTitle.value, inputAuth.value, inputPages.value)
    addBookToLibrary(newBook)
    newBook.id = index
    index++
    createCardBook(newBook)
    formContainer.style.display = "none"
  }
}

function deleteCard(e) {
  let card = e.currentTarget.parentNode.parentNode
  let cardIndex = card.getAttribute("data-index")
  let libraryUpdate = myLibrary.filter( book => book.id !== +cardIndex )
  myLibrary = libraryUpdate;
  card.remove()
}

// main container
const mainContainer = document.querySelector(".main")

// Inputs
const inputTitle = document.querySelector("#title");
const inputAuth = document.querySelector("#auth");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");

// Form window
const formContainer = document.querySelector(".form-container")

// Buttons
const closeForm = document.querySelector("#close-form")
const headerButton = document.querySelector("#open-form")
const formAddButton = document.querySelector("#add-book")


headerButton.addEventListener("click", () => {
  formContainer.style.display = "flex"
})

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none"
})

formAddButton.addEventListener("click", (e) => {
  e.preventDefault()
  createCard()
})