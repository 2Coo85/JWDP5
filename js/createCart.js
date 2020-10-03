let apiRequest = new XMLHttpRequest();
makeRequest = (verb, url, data) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open(verb, url);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if(apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Server is unavailable');
                }
            }
        };
    });
};

init = async () => {
    try {
        const requestPromise = makeRequest('GET', 'http://localhost:3000/api/teddies/');
        const response = await requestPromise;
        
        createCustomerForm(response);
    } catch (error) {
        document.getElementById('customer-info').innerHTML = '<h2>' + error + '</h2>';
    }
};


let items = JSON.parse(JSON.stringify(apiRequest.response));

let products = {};

function loadCart () {
    
    let productQty = localStorage.getItem('updateCart');
        
    if (productQty) {
        document.getElementById('numberOfCartItems').textContent = productQty;
    }
}

//setting up the shopping cart
let setUpItem = (items, products) => {
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let color = localStorage.getItem('color');
    products = 
        {
            "name": items.name, 
            "quantity": 0,
            "color": color,
            "price": items.price,
            "image": items.imageUrl
        }
      
    if (inCart != null) {
        if (inCart[products.name] == undefined){
            inCart = {
                ...inCart,
                [products.name]: products
            }
        }
        inCart[products.name].quantity += 1;
    } else {
        products.quantity = 1;
        inCart = {
            [products.name]: products
        };
    }
    localStorage.setItem('inCart', JSON.stringify(inCart));
}

//get color of item selected from dropdown value
const getColor = (items) => {
    let colorSelected = document.getElementById('colorSelection');
    let resultingColor = colorSelected.value;
    let itemColor =  resultingColor;
    localStorage.setItem('color', itemColor);
}

//updating order details in the cart
function updateCart(items, products) {
    let productQty = localStorage.getItem('updateCart');
    productQty = parseInt(productQty);
        
    if(productQty) {
        localStorage.setItem('updateCart', productQty + 1);
        document.getElementById('numberOfCartItems').textContent = productQty + 1;
    } else {
        localStorage.setItem('updateCart', 1);
         document.getElementById('numberOfCartItems').textContent = 1;
    }
    setUpItem(items);
}

//getting the total cost in the cart
const cartTotal = (items) => {
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let total = 0;
    
    for (const [key, item] of Object.entries(inCart)) {
        let subtotal = document.getElementById('subtotal' + item.name);
        let inCart = localStorage.getItem('inCart');
        inCart = JSON.parse(inCart);
        let subTotal = {};
        if (subtotal != null){
            subTotal = {
                ..."productValue",
                "productValue": inCart[item.name].quantity * item.price / 100,
            };
            console.log(subTotal);
        } else {
            subTotal = {
                "productValue": inCart[item.name].quantity * item.price / 100
            };
        }
        
        total += subTotal.productValue;
        localStorage.setItem('itemTotals', JSON.stringify(total));
        
    }
}

const calculate = () => {
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let productQty = localStorage.getItem('updateCart');
    productQty = parseInt(productQty);
    let cartDisplay = document.getElementById('numberOfCartItems');
    let itemTotals = localStorage.getItem('itemTotals');
    itemTotals = parseInt(itemTotals);
    let grandTotal = document.getElementById('total');
    let total = itemTotals;
    let input = 0;
    let totalQty = 0;
    let subTotal = 0;
    let newSubtotal = 0;
    
    let qtyInputs = document.querySelectorAll('input.quantity');
    let initialSubtotals = document.querySelectorAll('.subtotals');
    let quantities = Object.values(inCart);
    
    console.log(quantities);
    for (let i = 0; i < qtyInputs.length; i++) {
        totalQty += parseInt(qtyInputs[i].value);
        if (quantities[i].quantity <= qtyInputs[i].value || quantities[i].quantity >= qtyInputs[i].value){
            input = qtyInputs[i].value * quantities[i].price / 100;
            subTotal += input;
            initialSubtotals[i].textContent = '$' + input;
        }
        grandTotal.textContent = '$' + subTotal;
        cartDisplay.textContent = totalQty;
        productQty = totalQty;
        localStorage.setItem('updateCart', productQty);
        localStorage.setItem('itemTotals', subTotal);
    }
    //let i = 0;
    /*if (qtyInputs[i].value > inCart.quantity) {
        productQty -= 1;
        cartDisplay -= 1;
    } else {
        productQty += 1;
        cartDisplay += 1;
    }
    
    productQty = localStorage.setItem('updateCart', productQty);*/
    
}

let removeAll = (items) => {
    let cartItems = localStorage.getItem('inCart');
    let itemTotals = localStorage.getItem('itemTotals');
    let productQty = localStorage.getItem('updateCart');
    if (cartItems, itemTotals, productQty) {
        localStorage.clear();
        localStorage.setItem('updateCart', 0);
    }
    setUpItem(items);
    updateCart();
}
//displaying the items in the cart
let displayCart = (items) => {
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let cartContainer = document.querySelector('.items');
    let itemQuantity = localStorage.getItem('itemsInCart');
    itemQuantity = JSON.parse(itemQuantity);
    let productQty = localStorage.getItem('updateCart');
    productQty = parseInt(productQty);
    let cartTotal = localStorage.getItem('itemTotals');
    cartTotal = JSON.parse(cartTotal);
    let qtyInputs = document.querySelectorAll('input.quantity');
    if (inCart && cartContainer) {
        cartContainer.innerHTML = '';
        Object.values(inCart).map(item => {
            cartContainer.innerHTML += "<div class='product-items'><button type='button' class='removeOne btn btn-danger' onclick='removeItem()'>X</button><img src='" + item.image + "'><span>" + item.name + "</span></div><div class='price'>$" + item.price/100 + ".00</div><div id='inputs' class='quantity'><input type='number' id='qtyInput " + item.name + "' value='" + item.quantity + "' class='quantity' min='1'></div><div class='total subtotals' id='subtotal " + item.name +"'>$" + item.quantity * item.price/100; 
        });
        
        cartContainer.innerHTML += `
            <div class="basketTotalContainer">
            <button type="button" id="update-total" onclick="calculate()" class="main-button">Update Cart</button>
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal" id="total">$${cartTotal}.00</h4>
            </div>
        `;
    }
};

const createCustomerForm = (response) => {
    //create and get DOM elements
    const mainDisplay = document.getElementById('cart-display');
    const customerForm = document.getElementById('customer-info');
    const firstNameLabel = document.createElement('label');
    const firstName = document.createElement('input');
    const lastNameLabel = document.createElement('label');
    const lastName = document.createElement('input');
    const addressLabel = document.createElement('label');
    const address = document.createElement('input');
    const cityLabel = document.createElement('label');
    const city = document.createElement('input');
    const emailLabel = document.createElement('label');
    const email = document.createElement('input');
    
    //set attributes and innerHTML for elements
    firstNameLabel.setAttribute('for', 'firstName');
    firstNameLabel.innerHTML = "First Name";
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('name', 'firstName');
    firstName.setAttribute('id', 'firstName');
    firstName.setAttribute('required', 'required');
    firstName.setAttribute('data-value-missing', 'Field is required');
    customerForm.appendChild(firstNameLabel);
    customerForm.appendChild(firstName);

    lastNameLabel.setAttribute('for', 'lastName');
    lastNameLabel.innerHTML = "Last Name";
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('name', 'lastName');
    lastName.setAttribute('id', 'lastName');
    lastName.setAttribute('required', 'required');
    lastName.setAttribute('data-value-missing', 'Field is required');
    customerForm.appendChild(lastNameLabel);
    customerForm.appendChild(lastName);

    addressLabel.setAttribute('for', 'address');
    addressLabel.innerHTML = "Address";
    address.setAttribute('type', 'text');
    address.setAttribute('name', 'address');
    address.setAttribute('id', 'address');
    address.setAttribute('required', 'required');
    address.setAttribute('data-value-missing', 'Field is required');
    customerForm.appendChild(addressLabel);
    customerForm.appendChild(address);

    cityLabel.setAttribute('for', 'city');
    cityLabel.innerHTML = "City";
    city.setAttribute('type', 'text');
    city.setAttribute('name', 'city');
    city.setAttribute('id', 'city');
    city.setAttribute('required', 'required');
    city.setAttribute('data-value-missing', 'Field is required');
    customerForm.appendChild(cityLabel);
    customerForm.appendChild(city);

    emailLabel.setAttribute('for', 'email');
    emailLabel.innerHTML = "Email";
    email.setAttribute('type', 'email');
    email.setAttribute('name', 'email');
    email.setAttribute('id', 'email');
    email.setAttribute('required', 'required');
    email.setAttribute('data-value-missing', 'Field is required');
    customerForm.appendChild(emailLabel);
    customerForm.appendChild(email);

    //validation for input elements
    let isFormValid = customerForm.checkValidity();
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isAddressValid = false;
    let isCityValid = false;
    let isEmailValid = false;
    const regExName = /^[A-Za-z] {3,32}$/;
    const regExAddress = /^[A-Za-z0-9 ]{7,32}$/;
    const regExEmail = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    
    if (firstName.value === ""){
        firstName.style.backgroundColor = 'darkgray';
        firstName.addEventListener('blur', () => {
            if (!firstName.checkValidity() || regExName.test(firstName.value == false)) {
                firstName.style.border = "thin red solid";
                console.log("field is empty/entry invalid");
            } else {
                firstName.style.border = "thin green solid";
                isFirstNameValid = true;
                console.log("entry is valid");
            }  
        })
        
    };
    if (lastName.value === ""){
        lastName.style.backgroundColor = 'darkgray';
        lastName.addEventListener('blur', () => {
           if (!lastName.checkValidity() || regExName.test(lastName.value == false)) {
                lastName.style.border = "thin red solid";
                console.log("field is empty");
            } else {
                lastName.style.border = "thin green solid";
                isLastNameValid = true;
                console.log("entry is valid");
            } 
        })
    };
    if (address.value === "") {
        address.style.backgroundColor = 'darkgray';
        address.addEventListener('blur', () => {
            if (!address.checkValidity() || regExAddress.test(address.value) == false) {
                address.style.border = "thin red solid";
                console.log("field is empty");
            } else {
                address.style.border = "thin green solid";
                isAddressValid = true;
                console.log("entry is valid");
            }
        })
    };
    if (city.value === "") {
        city.style.backgroundColor = 'darkgray';
        city.addEventListener('blur', () => {
            if (!city.checkValidity() || regExName.test(city.value == false)) {
                city.style.border = "thin red solid";
                console.log("field is empty");
            } else {
                city.style.border = "thin green solid";
                isCityValid = true;
                console.log("entry is valid");
            }
        })
    };
    if (email.value === "") {
        email.style.backgroundColor = 'darkgray';
        email.addEventListener('input', () => {
            if (!email.checkValidity() || regExEmail.test(email.value == false)) {
               email.style.border = "thin red solid";
                console.log("field is empty");
            } else {
                email.style.border = "thin green solid";
                isEmailValid = true;
                console.log("entry is valid");
            }
        })
    }
    
    
    let submitOrderBtn = document.getElementById('submit-order');
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    submitOrderBtn.addEventListener('submit', ($event) => {
        $event.preventDefault();
        
        let contactInfo = {
            'fName': firstName.value,
            'lName': lastName.value,
            'custAddress': address.value,
            'custCity': city.value,
            'emailAddress': email.value
        }
        
        const orderObject = {
            'customerInformation': contactInfo,
            'orderInformation': inCart,
            'orderID': Math.round(Math.floor * 10000) + 1
        }
         localStorage.setItem('customerOrder', JSON.stringify(orderObject));
        
        if ((firstName.value !== "") && (lastName.value !== "") && (address.value !== "") && (city.value !== "") && (email.value !== "")) {
            buildOrder(orderObject);   
        } 
    });
}

/*let orderObject = localStorage.getItem('customerOrder');
let xhr = new XMLHttpRequest();
let url = 'http://localhost:3000/api/teddies/';
let params = orderObject;
xhr.open('GET', url + '?' + params);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
    }
}
xhr.send();

let order = 'order=1&name=LastName';
let newUrl = url + order;
xhr.open('POST', newUrl);

xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
        console.log(order);
        console.log(xhr.responseText);
        createOrderPage();
    }
}
xhr.send(params);*/

const buildOrder = async (orderObject) => {
    try {
        //const queryString = location.search;
        //const urlParameters = new URLSearchParams(queryString);
        //const order = urlParameters.get('order');
        const orderPromise = orderRequest(orderObject);
        const orderResponse = await orderPromise;
        return orderResponse;
        
        console.log(orderPromise, orderResponse, orderObject);

        createOrderPage(orderResponse);
    } catch (e) {
         document.getElementById('cart-display').innerHTML = '<h2>' + e + '</h2>';
    }
}

orderRequest = (verb, url, data) => {
    if (!document.getElementById('cart-display')) {
    return new Promise ((resolve, reject) => {
        let customerOrder = localStorage.getItem('customerOrder');
        customerOrder = JSON.parse(customerOrder);
        let orderApiRequest = new XMLHttpRequest();
        let url = 'confirm.html';
        let order = 'customer' + customerOrder.customerInformation[1] + '&amp;=' + customerOrder.orderId;
        orderApiRequest.open("POST", url);
        orderApiRequest.setRequestHeader('Content-Type', 'application/json');
        orderApiRequest.send(order);
        orderApiRequest.onreadystatechange = () => {
            if (orderApiRequest.readyState === 4) {
                if (orderApiRequest.status === 200 || orderApiRequest.status === 201) {
                    resolve(JSON.parse(orderApiRequest.response));
                } else {
                    reject(orderApiRequest.statusText);
                }
            }
        }
    })
    }
}

const createOrderPage = (response) => {
    //get DOM elements from confirmation page
    let orderNumber = document.getElementById('order-number');
    let orderCost = document.getElementById('order-cost');
    let customerOrder = localStorage.getItem('customerOrder');
    customerOrder = JSON.parse;
    
    const cartTotal = localStorage.getItem('itemTotals');
    cartTotal = parseInt(cartTotal);
    const customerOrderInfo = localStorage.getItem('customerInfo');
    customerOrderInfo = JSON.parse(customerOrderInfo);
    let confirmOrderPage = document.getElementById('confirmation');
        
    if (confirmOrderPage) {
        sessionStorage.setItem('customerOrder', JSON.stringify(customerOrder));
        console.log(customerOrder);
        localStorage.clear();
        orderNumber.textContent = 'Order# ' +  Math.floor(Math.random() * 100000000) + 1;
        orderCost.textContent = "$" + cartTotal;
    }
}

cartTotal();
loadCart();
displayCart();

init()