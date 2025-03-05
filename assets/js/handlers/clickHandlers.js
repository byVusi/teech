export function handleModalCloseClick() {
    document.querySelector('.modal').remove();
    document.querySelector('.modal-overlay').remove();
    document.body.style.overflow = 'visible';
}