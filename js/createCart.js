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
        let qtyInputs = document.getElementById('qtyInput' + item.name)
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

const updateCalculation = () => {
    let inCart = localStorage.getItem('inCart');
        inCart = JSON.parse(inCart);
    for (const [key, item] of Object.entries(inCart)) {
        let total = 0;
        let qtyInputs = document.querySelectorAll('input.quantity');
        let itemTotals = localStorage.getItem('itemTotals');
        itemTotals = parseInt(itemTotals);
        let productQty = localStorage.getItem('updateCart');
        productQty = parseInt(productQty);
        
        
        for (let i in qtyInputs){
            productQty = qtyInputs[i].value;
            
            itemTotals = qtyInputs[i].value * inCart[item.name].price / 100;
            break;
        }
            productQty = localStorage.setItem('updateCart', productQty);
    }
    
}


/*let removeItem = (items) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems) {
        localStorage.removeItem(cartItems.name);
    }
    updateCart();
}*/

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
            cartContainer.innerHTML += "<div class='product-items'><button type='button' class='removeOne btn btn-danger' onclick='removeItem()'>X</button><img src='" + item.image + "'><span>" + item.name + "</span></div><div class='price'>$" + item.price/100 + ".00</div><div class='quantity'><input type='number' id='qtyInput " + item.name + "' value='" + item.quantity + "' class='quantity' min='1' onchange='updateCalculation()'></div><div class='total' id='subtotal " + item.name +"'>$" + item.quantity * item.price/100; 
        });
        
        cartContainer.innerHTML += `
            <button type="button" id="update-total" onclick="calculateNewTotal()">Update Cart</button>
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
customerForm.appendChild(firstNameLabel);
customerForm.appendChild(firstName);

lastNameLabel.setAttribute('for', 'lastName');
lastNameLabel.innerHTML = "Last Name";
lastName.setAttribute('type', 'text');
lastName.setAttribute('name', 'lastName');
customerForm.appendChild(lastNameLabel);
customerForm.appendChild(lastName);

addressLabel.setAttribute('for', 'address');
addressLabel.innerHTML = "Address";
address.setAttribute('type', 'text');
address.setAttribute('name', 'address');
customerForm.appendChild(addressLabel);
customerForm.appendChild(address);

cityLabel.setAttribute('for', 'city');
cityLabel.innerHTML = "City";
city.setAttribute('type', 'text');
city.setAttribute('name', 'city');
customerForm.appendChild(cityLabel);
customerForm.appendChild(city);

emailLabel.setAttribute('for', 'email');
emailLabel.innerHTML = "Email";
email.setAttribute('type', 'email');
email.setAttribute('name', 'email');
customerForm.appendChild(emailLabel);
customerForm.appendChild(email);

//validation for input elements
