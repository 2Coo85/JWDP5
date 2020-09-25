let apiRequest = new XMLHttpRequest();
makeRequest = (verb, data) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if(apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Server is unavailable');
                }
            }
        };
        let order = {};
        
        if (verb === "POST") {
            apiRequest.setRequestHeader('Content-Type', 'application/json');
            apiRequest.open('POST', 'http://localhost:3000/api/teddies/' + order);
            apiRequest.send(JSON.stringify(data));
        } else {
            apiRequest.send();
        }
    });
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
    console.log(itemColor);
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
        localStorage.removeItem('inCart');
        localStorage.removeItem('itemTotals');
        localStorage.removeItem('updateCart');
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
    
    
    let order = {
        'productsInOrder': inCart,
        'totalOrderCost': cartTotal
    }
    console.log(order);
    
    
    if (inCart && cartContainer) {
        cartContainer.innerHTML = '';
        Object.values(inCart).map(item => {
            cartContainer.innerHTML += "<div class='product-items'><button type='button' class='removeOne btn btn-danger' onclick='removeItem()'>X</button><img src='" + item.image + "'><span>" + item.name + "</span></div><div class='price'>$" + item.price/100 + ".00</div><div id='inputs' class='quantity'><input type='number' id='qtyInput " + item.name + "' value='" + item.quantity + "' class='quantity' min='1'></div><div class='total subtotals' id='subtotal " + item.name +"'>$" + item.quantity * item.price/100; 
        });
        
        cartContainer.innerHTML += `
            <button type="button" id="update-total" onclick="calculate()">Update Cart</button>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal" id="total">$${cartTotal}.00</h4>
            </div>
        `;
    }
};
cartTotal();
loadCart();
displayCart();

//display customer form
const createCustomerForm = (response) => {
    //create and get DOM elements
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
    customerForm.appendChild(firstNameLabel);
    customerForm.appendChild(firstName);

    lastNameLabel.setAttribute('for', 'lastName');
    lastNameLabel.innerHTML = "Last Name";
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('name', 'lastName');
    lastName.setAttribute('id', 'lastName');
    customerForm.appendChild(lastNameLabel);
    customerForm.appendChild(lastName);

    addressLabel.setAttribute('for', 'address');
    addressLabel.innerHTML = "Address";
    address.setAttribute('type', 'text');
    address.setAttribute('name', 'address');
    address.setAttribute('id', 'address');
    customerForm.appendChild(addressLabel);
    customerForm.appendChild(address);

    cityLabel.setAttribute('for', 'city');
    cityLabel.innerHTML = "City";
    city.setAttribute('type', 'text');
    city.setAttribute('name', 'city');
    city.setAttribute('id', 'city');
    customerForm.appendChild(cityLabel);
    customerForm.appendChild(city);

    emailLabel.setAttribute('for', 'email');
    emailLabel.innerHTML = "Email";
    email.setAttribute('type', 'email');
    email.setAttribute('name', 'email');
    email.setAttribute('id', 'email');
    customerForm.appendChild(emailLabel);
    customerForm.appendChild(email);

    //validation for input elements
    let customerInputs = document.querySelectorAll('#customer-info.input');    

    let customerFirstName = document.getElementById('firstName');
    let customerLastName = document.getElementById('lastName');
    let customerAddress = document.getElementById('address');
    let customerCity = document.getElementById('city');
    let customerEmail = document.getElementById('email');

    console.log(customerFirstName.textContent);
    customerFirstName.addEventListener('blur', () => {
    
        if (!customerFirstName.textContent){
            customerFirstName.style.border = 'thick red solid';
            customerFirstName.style.backgroundColor = 'red';
        } else {
            customerFirstName.style.border = "thick green solid";
            customerFirstName.style.backgroundColor = 'white';
        }
    });
    
    customerLastName.addEventListener('blur', () => {
    
        if (!customerLastName.textContent){
            customerLastName.style.border = "thick red solid";
            customerLastName.style.backgroundColor = 'red';
        } else {
            customerLastName.style.border = "thick green solid";
            customerLastName.style.backgroundColor = 'white';
        }
    });
    customerAddress.addEventListener('blur', () => {
    
        if (!customerAddress.textContent){
            customerAddress.style.border = "thick red solid";
            customerAddress.style.backgroundColor = 'red';
        } else {
            customerAddress.style.border = "thick green solid";
            customerAddress.style.backgroundColor = 'white';
        }
    });
    
    customerCity.addEventListener('blur', () => {
    
        if (!customerCity.textContent){
            customerCity.style.border = "thick red solid";
            customerCity.style.backgroundColor = 'red';
        } else {
            customerCity.style.border = "thick green solid";
            customerCity.style.backgroundColor = 'white';
        }
    });
    
    customerEmail.addEventListener('blur', () => {
    
        if (!customerEmail.textContent){
            customerEmail.style.border = "thick red solid";
            customerEmail.style.backgroundColor = 'red';
        } else {
            customerEmail.style.border = "thick green solid";
            customerEmail.style.backgroundColor = 'white';
        }
    });

}

init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        
        createCustomerForm(response);
    } catch (error) {
        document.getElementById('customer-info').innerHTML = '<h2>' + error + '</h2>';
    }
};

init()