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
const modals = document.querySelectorAll(".popup");

modals.forEach(modal => {
  modal.classList.add("popup_is-animated");
  modal.addEventListener("click", handleModalClose);
});

function openPopup(popup) {
  openModal(popup);
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popup) {
  closeModal(popup);
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup_is-opened");
    openPopups.forEach(popup => closePopup(popup));
  }
}

function createCardPopup(imageSrc, title) {
  popupImage.src = imageSrc;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openPopup(cardPopup);
}

function renderCard(cardElement) {
  placesContainer.appendChild(cardElement);
}

initialCards.forEach(card => {
  const cardElement = createCard(card, handleLikeButtonClick, handleDeleteCard, createCardPopup);
  renderCard(cardElement);
});

addButton.addEventListener("click", () => openPopup(addCardPopup));
editButton.addEventListener("click", () => {
  editProfileForm.elements["name"].value = document.querySelector(".profile__title").textContent;
  editProfileForm.elements["description"].value = document.querySelector(".profile__description").textContent;
  openPopup(editPopup);
});

function handleModalClose(event) {
  const popup = event.target.closest(".popup");
  if (popup && (event.target.classList.contains("popup__close") || event.target === popup)) {
    closePopup(popup);
  }
}

newPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements["link"].value,
  };
  
  const cardElement = createCard(newCard, handleLikeButtonClick, handleDeleteCard, createCardPopup);
  placesContainer.prepend(cardElement);
  
  closePopup(addCardPopup);
  newPlaceForm.reset();
});

function updateProfile({ name, description }) {
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = description;
}

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedProfile = {
    name: editProfileForm.elements["name"].value,
    description: editProfileForm.elements["description"].value,
  };
  updateProfile(updatedProfile);
  closePopup(editPopup);
  editProfileForm.reset();
});