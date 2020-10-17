const customerForm = document.getElementById('customer-info');
const uuid = require('./node_modules/uuid/v1');
let orderObject = {
    'customerInformation': {},
    'orderInformation':{}
}

let loadCart = () => {
    
    let productQty = localStorage.getItem('updateCart');
        
    if (productQty || !document.getElementById('confirmation-page')) {
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
        };
      
    if (inCart != null) {
        if (inCart[products.name] == undefined){
            inCart = {
                ...inCart,
                [products.name]: products
            };
        }
        inCart[products.name].quantity += 1;
    } else {
        products.quantity = 1;
        inCart = {
            [products.name]: products
        };
    }
    localStorage.setItem('inCart', JSON.stringify(inCart));
};

//get color of item selected from dropdown value
const getColor = (items) => {
    let colorSelected = document.getElementById('colorSelection');
    let resultingColor = colorSelected.value;
    let itemColor =  resultingColor;
    localStorage.setItem('color', itemColor);
};

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
    
    if (inCart){
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
};

const calculate = () => {
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let productQty = localStorage.getItem('updateCart');
    productQty = parseInt(productQty);
    let cartDisplay = document.getElementById('numberOfCartItems');
    let itemTotals = localStorage.getItem('itemTotals');
    itemTotals = parseInt(itemTotals);
    let grandTotal = document.getElementById('total');
    let input = 0;
    let totalQty = 0;
    let subTotal = 0;
    
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
};

let removeAll = (items) => {
    let cartItems = localStorage.getItem('inCart');
    let itemTotals = localStorage.getItem('itemTotals');
    let productQty = localStorage.getItem('updateCart');
    if (cartItems, itemTotals, productQty) {
        localStorage.clear();
        location.reload;
    }
    setUpItem(items);
    updateCart();
};
//displaying the items in the cart
let displayCart = (items) => {
    //getting items from localStorage and/or DOM
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart);
    let cartContainer = document.querySelector('.items');
    let itemQuantity = localStorage.getItem('itemsInCart');
    itemQuantity = JSON.parse(itemQuantity);
    let productQty = localStorage.getItem('updateCart');
    productQty = parseInt(productQty);
    let cartTotal = localStorage.getItem('itemTotals');
    cartTotal = JSON.parse(cartTotal);
    
    //Displaying items in the cart
    if (inCart && cartContainer) {
        cartContainer.innerHTML = '';
        Object.values(inCart).map(item => {
            cartContainer.innerHTML += `
                <div class='product-items'>
                    <button type='button' class='removeOne btn btn-danger' onclick='removeItem()'>X</button>
                    <img src='${item.image}'><span> ${item.name}</span>
                </div>
                <div class='price'>
                    $${item.price/100}.00
                </div>
                <div id='inputs' class='quantity'>
                    <input type='number' id='qtyInput + ${item.name}' value='${item.quantity}' class='quantity' min='1'>
                </div>
                <div class='total subtotals' id='subtotal + ${item.name}'>$ ${item.quantity * item.price/100}.00` 
        });
        
        cartContainer.innerHTML += `
            <div class="basketTotalContainer">
            <button type="button" id="update-total" onclick="calculate()" class="main-button">Update Cart</button>
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal" id="total">$${cartTotal}.00</h4>
            </div>
        `;
    }
    createCustomerForm();
};

const order = async (url, data) => {
    console.log(orderObject);
    const response = await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return await response.json();
}

let createCustomerForm = () => {
    if (customerForm){
        //create and get DOM elements
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
    }
    validateForm()
}

 //validation for input elements

    const regExName = /^[A-Za-z] {3,32}$/;
    const regExAddress = /^[A-Za-z0-9 ]{7,32}$/;
    const regExEmail = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const notEmpty = value => value !== "" ? true : false;
    const longEnough = value => value.length >= 2 ? true : false;
    const validEmail = (value) => value.match(regExEmail) ? true : false;
    const validAddress = (value) => value.match(regExAddress);
    const validInput = (value) => notEmpty(value) && longEnough(value);

const validateForm = () => {
    if (firstName.value === ""){
            firstName.style.backgroundColor = 'darkgray';
            firstName.addEventListener('blur', () => {
                if (!validInput(firstName.value)) {
                    firstName.style.border = "medium red solid";
                    console.log("field is empty/entry invalid");
                    } else {
                            firstName.style.border = "medium green solid";
                            localStorage.setItem('fName', firstName.value);
                            console.log(firstName.value);
                            console.log("entry is valid");
                        }  
                    });

}
    if (lastName.value === ""){
                    lastName.style.backgroundColor = 'darkgray';
                    lastName.addEventListener('blur', () => {
                       if (!validInput(lastName.value)) {
                            lastName.style.border = "medium red solid";
                            console.log("field is empty");
                        } else {
                            lastName.style.border = "medium green solid";
                            localStorage.setItem('lName', lastName.value);
                            console.log(lastName.value);
                            console.log("entry is valid");
                        } 
                    });
}
    if (address.value === "") {
                    address.style.backgroundColor = 'darkgray';
                    address.addEventListener('blur', () => {
                        if (!validAddress(address.value) && longEnough(address.value)) {
                            address.style.border = "medium red solid";
                            console.log("field is empty");
                        } else {
                            address.style.border = "medium green solid";
                            localStorage.setItem('address', address.value);
                            console.log(address.value);
                            console.log("entry is valid");
                        }
                    });
}
    if (city.value === "") {
                    city.style.backgroundColor = 'darkgray';
                    city.addEventListener('blur', () => {
                        if (!validInput(city.value)) {
                            city.style.border = "medium red solid";
                            console.log("field is empty");
                        } else {
                            city.style.border = "medium green solid";
                            localStorage.setItem('city', city.value);
                            console.log(city.value);
                            console.log("entry is valid");
                        }
                    });
}
    if (email.value === "") {
            email.style.backgroundColor = 'darkgray';
            email.addEventListener('input', () => {
                if (!validEmail(email.value))  {
                    email.style.border = "medium red solid";
                    console.log("field is empty");
                } else {
                    email.style.border = "medium green solid";
                    localStorage.setItem('email', email.value)
                            console.log(email.value);
                            console.log("entry is valid");
                        }
                    });
}
    
    return orderObject.customerInformation = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
}

let submitOrderBtn = document.getElementById('submit-order');

submitOrderBtn.addEventListener('click', async ($event) =>{
    $event.preventDefault();
    let inCart = localStorage.getItem('inCart');
    inCart = JSON.parse(inCart); 
    
    //get items from localStorage
    let cFirstName = localStorage.getItem('fName');
    let cLastName = localStorage.getItem('lName');
    let cAddress = localStorage.getItem('address');
    let cCity = localStorage.getItem('city');
    let cEmail = localStorage.getItem('email');
    
    orderObject = {
        customerInformation: {
            firstName: cFirstName,
            lastName: cLastName,
            address: cAddress,
            city: cCity,
            email: cEmail
        },
        orderInformation: inCart
    }
    const validForm = validateForm();
    let orderId = uuid();
    if (validForm !== false){
        console.log(orderObject);
        const response = await order('http://localhost:3000/api/teddies/order', orderObject);
        let cartTotal = localStorage.getItem('itemTotals');
        cartTotal = parseInt(cartTotal);
        sessionStorage.setItem('customerOrder', JSON.stringify(response));
        location.href = `order.html?id=${response.orderId}&price=${cartTotal}`;
    }
});

cartTotal();
loadCart();
displayCart();