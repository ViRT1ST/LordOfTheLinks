export const getModalContainerElement = () => {
  return document.getElementById('modal-container') as HTMLElement;
};

export const setScrollbarVisibility = (isSetVisible: boolean) => {
  if (isSetVisible) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
};
