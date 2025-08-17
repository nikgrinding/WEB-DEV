function pressButton(className1, className2, className3) {
    const buttonElement1 = document.querySelector(className1);
    const buttonElement2 = document.querySelector(className2);
    const buttonElement3 = document.querySelector(className3);
    if (buttonElement1.classList.contains('toggle-on')) {
        buttonElement1.classList.remove('toggle-on');
        buttonElement1.classList.add('toggle-off');
    } else {
        buttonElement1.classList.remove('toggle-off');
        buttonElement1.classList.add('toggle-on');
    }
    buttonElement2.classList.remove('toggle-off');
    buttonElement3.classList.remove('toggle-off');
    buttonElement2.classList.add('toggle-on');
    buttonElement3.classList.add('toggle-on');
}