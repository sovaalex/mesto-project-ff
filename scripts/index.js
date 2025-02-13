const placesContainer = document.querySelector(".places__list");
const cardTemplate = document.getElementById("card-template").content;
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup_type_new-card");
const closeButton = popup.querySelector(".popup__close");
const form = popup.querySelector(".popup__form");

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  imgElement.src = card.link;
  titleElement.textContent = card.name;

  deleteButton.addEventListener("click", () => {
    initialCards.splice(initialCards.indexOf(card), 1);
    renderCards();
  });

  return cardElement;
}

function renderCards() {
  placesContainer.innerHTML = "";
  initialCards.forEach((card) => {
    placesContainer.appendChild(createCard(card));
  });
}

function openPopup() {
  popup.classList.add("popup_is-opened");
}

function closePopup() {
  popup.classList.remove("popup_is-opened");
}

addButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = form.elements["place-name"].value;
  const placeLink = form.elements["link"].value;

  initialCards.push({ name: placeName, link: placeLink });

  renderCards();
  closePopup();
  form.reset();
});

renderCards();