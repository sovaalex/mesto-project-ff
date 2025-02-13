const placesContainer = document.querySelector(".places__list");
const cardTemplate = document.getElementById("card-template").content;
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup_type_new-card");
const closeButton = popup.querySelector(".popup__close");
const form = popup.querySelector(".popup__form");

function createCard(data, onDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;

  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  return cardElement;
}

function handleDeleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(cardElement) {
  placesContainer.appendChild(cardElement);
}

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard);
  renderCard(cardElement);
});

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

  const newCard = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value,
  };

  initialCards.push(newCard);
  renderCard(createCard(newCard, handleDeleteCard));
  closePopup;
  form.reset();
});
