import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, handleLikeButtonClick, handleDeleteCard } from "../components/card";
import { openModal, closeModal } from "../components/modal";

const placesContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_image");
const popupImage = cardPopup.querySelector(".popup__image");
const popupCaption = cardPopup.querySelector(".popup__caption");

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];

const modals = document.querySelectorAll(".popup");

modals.forEach(modal => {
  modal.classList.add("popup_is-animated");
  modal.addEventListener("click", handleModalClose);
});

function createCardPopup(imageSrc, title) {
  popupImage.src = imageSrc;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openModal(cardPopup);
}

function renderCard(cardElement) {
  placesContainer.appendChild(cardElement);
}

initialCards.forEach(card => {
  const cardElement = createCard(card, handleLikeButtonClick, handleDeleteCard, createCardPopup);
  renderCard(cardElement);
});

addButton.addEventListener("click", () => openModal(addCardPopup));
editButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(".profile__description").textContent;
  openModal(editPopup);
});

function handleModalClose(event) {
  const popup = event.target.closest(".popup");
  if (popup && (event.target.classList.contains("popup__close") || event.target === popup)) {
    closeModal(popup);
  }
}

newPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  
  const cardElement = createCard(newCard, handleLikeButtonClick, handleDeleteCard, createCardPopup);
  placesContainer.prepend(cardElement);
  
  closeModal(addCardPopup);
  newPlaceForm.reset();
});

function updateProfile({ name, description }) {
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = description;
}

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedProfile = {
    name: nameInput.value,
    description: descriptionInput.value,
  };
  updateProfile(updatedProfile);
  closeModal(editPopup);
  editProfileForm.reset();
});