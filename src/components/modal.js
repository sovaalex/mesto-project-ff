export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup_is-opened");
    openPopups.forEach((popup) => closeModal(popup));
  }
}

export function handleModalClose(event) {
  const popup = event.target.closest(".popup");
  if (
    popup &&
    (event.target.classList.contains("popup__close") || event.target === popup)
  ) {
    closeModal(popup);
  }
}
