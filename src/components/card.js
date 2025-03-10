export function createCard(data) {
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeElement = cardElement.querySelector(".card__like-button");

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;

  deleteButton.addEventListener("click", () => handleDeleteCard(cardElement));
  likeElement.addEventListener("click", handleLikeButtonClick);

  return cardElement;
}

export function handleLikeButtonClick(event) {
    event.target.classList.toggle("card__like-button_is-active");
  }
  
export function handleDeleteCard(cardElement) {
    cardElement.remove();
  }