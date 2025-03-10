import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, handleLikeButtonClick, handleDeleteCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";

const placesContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const closeButtons = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function createCardPopup(imageSrc, title) {
  const cardPopup = document.querySelector(".popup_type_image");
  const popupImage = cardPopup.querySelector(".popup__image");
  const popupCaption = cardPopup.querySelector(".popup__caption");
  popupImage.src = imageSrc;
  popupCaption.textContent = title;
  openModal(cardPopup);
}

function renderCard(cardElement) {
  placesContainer.appendChild(cardElement);
}

initialCards.forEach(card => {
  const cardElement = createCard(card);
  const imgElement = cardElement.querySelector(".card__image");

  imgElement.addEventListener("click", () => createCardPopup(card.link, card.name));

  renderCard(cardElement);
});

addButton.addEventListener("click", () => openModal(addCardPopup));

editButton.addEventListener("click", () => {
  document.forms["edit-profile"].elements["name"].value = profileTitle.textContent;
  document.forms["edit-profile"].elements["description"].value = profileDescription.textContent;
  openModal(editPopup);
});

function handleModalClose(event) {
  if (event.target.classList.contains("popup__close")) {
    closeModal(event.target.closest(".popup"));
  }

  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }

  if (event.key === "Escape") {
    document.querySelectorAll(".popup_is-opened").forEach(popup => closeModal(popup));
  }
}

closeButtons.forEach(button => {
  button.addEventListener("click", handleModalClose);
});
document.addEventListener("click", handleModalClose);
document.addEventListener("keydown", handleModalClose);

document.forms["new-place"].addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: event.target.elements["place-name"].value,
    link: event.target.elements["link"].value,
  };
  initialCards.unshift(newCard);
  const cardElement = createCard(newCard);
  const imgElement = cardElement.querySelector(".card__image");

  imgElement.addEventListener("click", () => createCardPopup(newCard.link, newCard.name));

  renderCard(cardElement);
  closeModal(addCardPopup);
  event.target.reset();
});

function updateProfile({ name, description }) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

document.forms["edit-profile"].addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedProfile = {
    name: event.target.elements["name"].value,
    description: event.target.elements["description"].value,
  };
  updateProfile(updatedProfile);
  closeModal(editPopup);
  event.target.reset();
});