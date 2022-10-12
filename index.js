let myLibrary = [];
let index = 0

/* state functions */

function isEmpty() {
  if (inputTitle.value !== "" && inputAuth.value !== "" && inputPages.value !== "") {
    return false
  } else {
    return true
  }
}

function resetInputs() {
  inputTitle.value = "";
  inputAuth.value = "";
  inputPages.value = "";
  inputRead.checked = false;
}

function changeReadStatus(card, state) {
  let cardIndex = card.getAttribute("data-index")
  for (let book of myLibrary) {
    if (book.id === +cardIndex) {
      book.read = state
    }
  }
}

function changeStatus(e) {
  let checkCardInput = e.currentTarget
  let cardBookLabel = e.currentTarget.nextElementSibling
  let card = e.currentTarget.parentNode.parentNode
  console.log(card);
  if (checkCardInput.checked === true) {
    cardBookLabel.textContent = "Readed"
    checkCardInput.setAttribute("value", "readed")
    changeReadStatus(card, true)
  } else {
    cardBookLabel.textContent = "Not Readed"
    checkCardInput.setAttribute("value", "not-readed")
    checkCardInput.setAttribute("value", "not-readed")
    changeReadStatus(card, false)
  }
}

// constructor function
function Book (title, auth, pages) {
  this.title = title;
  this.auth = auth;
  this.pages = pages;
  this.id = 0;
  this.read = false
}

// main functions
function addBookToLibrary(book) {
  myLibrary.push(book)
}

function createCardBook(book) {
  let cardContainer = document.createElement("div")
  cardContainer.classList.add("card")
  cardContainer.setAttribute("data-index", book.id)
  cardContainer.innerHTML = `
    <button onclick="deleteCard(event)">X</button>
    <div class="card-info">
      <h3>${book.title}</h3>
      <span>${book.auth}</span>
      <span>${book.pages} pages</span>
    </div>
    <div class="card-status">
      <input type="checkbox" ${book.read === true ? "checked" : ""} name="card-status" id="card-status" value="${book.read === true ? "readed" : "not-readed"}" onclick="changeStatus(event)">
      <label for="card-status">${book.read === true ? "Readed" : "Not Readed"}</label>
    </div>
  `
  mainContainer.appendChild(cardContainer)
}

function createCard() {
  let empty = isEmpty()
  if (!empty) {
    let newBook = new Book(inputTitle.value, inputAuth.value, inputPages.value)
    if (inputRead.checked === true) {
      newBook.read = true
    }
    addBookToLibrary(newBook)
    newBook.id = index
    index++
    createCardBook(newBook)
    formContainer.style.display = "none"
    resetInputs()
  }
}

function deleteCard(e) {
  let card = e.currentTarget.parentNode
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