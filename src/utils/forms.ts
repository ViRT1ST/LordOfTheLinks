export const dispathSubmitEventToBody = () => {
  const body = document.querySelector('body');
      
  body?.dispatchEvent(new Event('submit', {
    bubbles: true,
    cancelable: true
  }));
};