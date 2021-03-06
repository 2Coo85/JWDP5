//get DOM elements from confirmation page
const orderInfo = window.location.search.substr(1).split('&');
const orderId = orderInfo[0].replace('id=', '');
const orderTotal = orderInfo[1].replace('price=', '');
let orderNumber = document.getElementById('order-number');   let orderCost = document.getElementById('order-cost');

const createOrderPage = (response) => {
    response = sessionStorage.getItem('customerOrder');
    localStorage.clear();
    let orderIdNumber = response.orderId;
    orderNumber.textContent = 'Order# ' + orderId;
    orderCost.textContent = 'Order Total: $' + orderTotal;
}

createOrderPage();
