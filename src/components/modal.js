export function openModal(modal) {
  setTimeout(() => {
  modal.classList.add("popup_is-opened");});
  modal.classList.add("popup_is-animated");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 600);
}