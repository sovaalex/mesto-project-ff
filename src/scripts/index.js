import "../pages/index.css";
import { createCard, handleLikeButtonClick } from "../components/card";
import { openModal, closeModal, handleModalClose } from "../components/modal";
import { enableValidation, clearValidation, validationConfig } from "../components/validation";
import * as api from "../components/api.js";

const placesContainer = document.querySelector(".places__list");
const addCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const changeAvatarPopup = document.querySelector(".popup_type_avatar");
const cardPopup = document.querySelector(".popup_type_image");
const confirmDeleteCardPopup = document.querySelector(
  ".popup_type_delete-card"
);
const popupImage = cardPopup.querySelector(".popup__image");
const popupCaption = cardPopup.querySelector(".popup__caption");
const modals = document.querySelectorAll(".popup");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const formEditButton = editPopup.querySelector(".popup__button");
const avatar = document.querySelector(".profile__image");
const changeAvatarButton = changeAvatarPopup.querySelector(".popup__button");
const createCardButton = addCardPopup.querySelector(".popup__button");
const confirmDeleteButton =
  confirmDeleteCardPopup.querySelector(".popup__button");

const changeAvatarForm = document.forms["avatar"];
const avatarLinkInput = changeAvatarForm.elements["avatar-link"];
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const confirmDeleteForm = document.forms["delete-form"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["about"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
let cardElementToDelete;

confirmDeleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cardElementToDelete) {
    confirmDeleteButton.textContent = "Удаляем...";
    const cardId = cardElementToDelete.dataset.id;
    api
      .deleteCard(cardId)
      .then(() => {
        cardElementToDelete.remove();
        cardElementToDelete = null;
        confirmDeleteCardPopup.classList.remove("popup_is-opened");
      })
      .catch((err) => console.error("Ошибка при удалении карточки:", err))
      .finally(() => {
        confirmDeleteButton.textContent = "Да";
      });
  }
});

function handleDelete(cardElement) {
  cardElementToDelete = cardElement;
  openModal(confirmDeleteCardPopup);
}

api
  .loadUserDataAndCards()
  .then(({ userInfo, cards }) => {
    avatar.style.backgroundImage = `url(${userInfo.avatar})`;

    updateProfile({ name: userInfo.name, about: userInfo.about });

    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        handleLikeButtonClick,
        handleDelete,
        createCardPopup,
        userInfo._id
      );
      renderCard(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке карточек:", err);
  });

changeAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  changeAvatarButton.textContent = "Сохраняем...";
  const newAvatarLink = avatarLinkInput.value;
  api
    .updateUserAvatar(newAvatarLink)
    .then(() => {
      avatar.style.backgroundImage = `url(${newAvatarLink})`;
      closeModal(changeAvatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      changeAvatarButton.textContent = "Сохранить";
    });
});

avatar.addEventListener("click", () => {
  avatarLinkInput.value = "";
  clearValidation(changeAvatarForm, validationConfig);
  openModal(changeAvatarPopup);
});

enableValidation(validationConfig);

modals.forEach((modal) => {
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

addButton.addEventListener("click", () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(addCardPopup);
});

newPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCardButton.textContent = "Сохраняем...";
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  api
    .addCard(newCard.name, newCard.link)
    .then((card) => {
      const cardElement = createCard(
        card,
        handleLikeButtonClick,
        handleDelete,
        createCardPopup,
        card.owner._id
      );
      placesContainer.prepend(cardElement);
      closeModal(addCardPopup);
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      createCardButton.textContent = "Сохранить";
    });
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editPopup);
});

function updateProfile({ name, about }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
}

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formEditButton.textContent = "Сохраняем...";

  const updatedProfile = {
    name: nameInput.value,
    about: descriptionInput.value,
  };

  api
    .updateUserInfo(updatedProfile.name, updatedProfile.about)
    .then(() => {
      updateProfile(updatedProfile);
      closeModal(editPopup);
      editProfileForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      formEditButton.textContent = "Сохранить";
    });
});
