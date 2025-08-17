const buttonElement = document.querySelector('.js-button');

function pressButton() {
    if (buttonElement.classList.contains('toggle-on')) {
        buttonElement.classList.remove('toggle-on');
        buttonElement.classList.add('toggle-off');
    } else {
        buttonElement.classList.remove('toggle-off');
        buttonElement.classList.add('toggle-on');
    }
} 