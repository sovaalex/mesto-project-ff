import { openModal } from "./modal";
import * as api from "./api";

const confirmDeleteCardPopup = document.querySelector(
  ".popup_type_delete-card"
);
const confirmDeleteButton =
  confirmDeleteCardPopup.querySelector(".popup__button");
const confirmDeleteForm = document.forms["delete-form"];
let cardElementToDelete;

export function createCard(
  data,
  handleLike,
  handleDelete,
  handleImageClick,
  userId
) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeElement = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".like-count-text");

  likeCount.textContent = data.likes.length;

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;
  cardElement.dataset.id = data._id;

  if (data.likes.some((like) => like._id === userId)) {
    likeElement.classList.add("card__like-button_is-active");
  }

  if (data.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  imgElement.addEventListener("click", () =>
    handleImageClick(data.link, data.name)
  );

  deleteButton.addEventListener("click", () => {
    cardElementToDelete = cardElement;
    handleDelete();
  });

  likeElement.addEventListener("click", (event) =>
    handleLike(event, likeCount, data.likes.length)
  );

  return cardElement;
}

export function handleLikeButtonClick(event, likeCount) {
  const cardId = event.target.closest(".places__item").dataset.id;
  const isLiked = event.target.classList.contains(
    "card__like-button_is-active"
  );

  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((updatedCard) => {
        event.target.classList.remove("card__like-button_is-active");
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error("Ошибка при удалении лайка:", err));
  } else {
    api
      .likeCard(cardId)
      .then((updatedCard) => {
        event.target.classList.add("card__like-button_is-active");
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error("Ошибка при добавлении лайка:", err));
  }
}

export function handleDeleteCard() {
  openModal(confirmDeleteCardPopup);
}

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
