function handleCostKeyDown(event) {
    if (event.key === 'Enter') {
        calculateTotal();
    }
}
function subscribe() {
    const buttonElement = document.querySelector('.js-subscribe-button')
    if (buttonElement.innerText === 'Subscribe') {
        buttonElement.innerHTML = 'Subscribed';
        buttonElement.classList.add('is-subscribed');
    } else {
        buttonElement.innerHTML = 'Subscribe';
        buttonElement.classList.remove('is-subscribed');
    }
}
function calculateTotal() {
    const inputElement = document.querySelector('.js-cost-input');
    const costElement = document.querySelector('.js-total-cost');
    let cost = Number(inputElement.value);
    if (cost < 0) {
        costElement.innerHTML = `Error: cost cannot be less than $0`;
        costElement.classList.add('red');
    }
    else {
        if (cost < 40) {
            cost += 10;
        }
        costElement.classList.remove('red');
        costElement.innerHTML = `$${cost}`;
    }
}