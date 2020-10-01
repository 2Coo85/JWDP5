const createOrderPage = (response) => {
    //get DOM elements from confirmation page
    let orderNumber = document.getElementById('order-number');
    let orderCost = document.getElementById('order-cost');
    let customerContent = document.getElementById('customer-content');
    let orderContent = document.getElementById('order-content');
    
    const inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    const cartTotal = localStorage.getItem('itemTotals');
    cartTotal = parseInt(cartTotal);
    const customerOrderInfo = localStorage.getItem('customerInfo');
    customerOrderInfo = JSON.parse(customerOrderInfo);
    let confirmOrderPage = document.getElementById('confirmation');
        
    if (confirmOrderPage) {
        orderNumber.textContent = 'Order# ' +  Math.floor(Math.random() * 100000000) + 1;
        orderCost.textContent = "$" + cartTotal;
    }
}
 const createOrder = async (orderObject) => {
    try {
        const confirmationPromise = makeRequest(orderObject);
        const orderResponse = await confirmationPromise;
        
        createOrderPage(orderResponse);
        
    } catch (error) {
         document.getElementById('confirmation').innerHTML = '<h2>' + error + '</h2>';
    }
}
createOrderPage();