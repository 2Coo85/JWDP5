"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customerForm = document.getElementById('customer-info');

var uuid = require('./node_modules/uuid/v1');

var orderObject = {
  'customerInformation': {},
  'orderInformation': {}
};

var loadCart = function loadCart() {
  var productQty = localStorage.getItem('updateCart');

  if (productQty || !document.getElementById('confirmation-page')) {
    document.getElementById('numberOfCartItems').textContent = productQty;
  }
}; //setting up the shopping cart


var setUpItem = function setUpItem(items, products) {
  var inCart = localStorage.getItem('inCart');
  inCart = JSON.parse(inCart);
  var color = localStorage.getItem('color');
  products = {
    "name": items.name,
    "quantity": 0,
    "color": color,
    "price": items.price,
    "image": items.imageUrl
  };

  if (inCart != null) {
    if (inCart[products.name] == undefined) {
      inCart = _objectSpread({}, inCart, _defineProperty({}, products.name, products));
    }

    inCart[products.name].quantity += 1;
  } else {
    products.quantity = 1;
    inCart = _defineProperty({}, products.name, products);
  }

  localStorage.setItem('inCart', JSON.stringify(inCart));
}; //get color of item selected from dropdown value


var getColor = function getColor(items) {
  var colorSelected = document.getElementById('colorSelection');
  var resultingColor = colorSelected.value;
  var itemColor = resultingColor;
  localStorage.setItem('color', itemColor);
}; //updating order details in the cart


function updateCart(items, products) {
  var productQty = localStorage.getItem('updateCart');
  productQty = parseInt(productQty);

  if (productQty) {
    localStorage.setItem('updateCart', productQty + 1);
    document.getElementById('numberOfCartItems').textContent = productQty + 1;
  } else {
    localStorage.setItem('updateCart', 1);
    document.getElementById('numberOfCartItems').textContent = 1;
  }

  setUpItem(items);
} //getting the total cost in the cart


var cartTotal = function cartTotal(items) {
  var inCart = localStorage.getItem('inCart');
  inCart = JSON.parse(inCart);
  var total = 0;

  if (inCart) {
    for (var _i = 0, _Object$entries = Object.entries(inCart); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          item = _Object$entries$_i[1];

      var subtotal = document.getElementById('subtotal' + item.name);

      var _inCart2 = localStorage.getItem('inCart');

      _inCart2 = JSON.parse(_inCart2);
      var subTotal = {};

      if (subtotal != null) {
        subTotal = _objectSpread({}, "productValue", {
          "productValue": _inCart2[item.name].quantity * item.price / 100
        });
        console.log(subTotal);
      } else {
        subTotal = {
          "productValue": _inCart2[item.name].quantity * item.price / 100
        };
      }

      total += subTotal.productValue;
      localStorage.setItem('itemTotals', JSON.stringify(total));
    }
  }
};

var calculate = function calculate() {
  var inCart = localStorage.getItem('inCart');
  inCart = JSON.parse(inCart);
  var productQty = localStorage.getItem('updateCart');
  productQty = parseInt(productQty);
  var cartDisplay = document.getElementById('numberOfCartItems');
  var itemTotals = localStorage.getItem('itemTotals');
  itemTotals = parseInt(itemTotals);
  var grandTotal = document.getElementById('total');
  var input = 0;
  var totalQty = 0;
  var subTotal = 0;
  var qtyInputs = document.querySelectorAll('input.quantity');
  var initialSubtotals = document.querySelectorAll('.subtotals');
  var quantities = Object.values(inCart);
  console.log(quantities);

  for (var i = 0; i < qtyInputs.length; i++) {
    totalQty += parseInt(qtyInputs[i].value);

    if (quantities[i].quantity <= qtyInputs[i].value || quantities[i].quantity >= qtyInputs[i].value) {
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

var removeAll = function removeAll(items) {
  var cartItems = localStorage.getItem('inCart');
  var itemTotals = localStorage.getItem('itemTotals');
  var productQty = localStorage.getItem('updateCart');

  if (cartItems, itemTotals, productQty) {
    localStorage.clear();
    location.reload;
  }

  setUpItem(items);
  updateCart();
}; //displaying the items in the cart


var displayCart = function displayCart(items) {
  //getting items from localStorage and/or DOM
  var inCart = localStorage.getItem('inCart');
  inCart = JSON.parse(inCart);
  var cartContainer = document.querySelector('.items');
  var itemQuantity = localStorage.getItem('itemsInCart');
  itemQuantity = JSON.parse(itemQuantity);
  var productQty = localStorage.getItem('updateCart');
  productQty = parseInt(productQty);
  var cartTotal = localStorage.getItem('itemTotals');
  cartTotal = JSON.parse(cartTotal); //Displaying items in the cart

  if (inCart && cartContainer) {
    cartContainer.innerHTML = '';
    Object.values(inCart).map(function (item) {
      cartContainer.innerHTML += "\n                <div class='product-items'>\n                    <button type='button' class='removeOne btn btn-danger' onclick='removeItem()'>X</button>\n                    <img src='".concat(item.image, "'><span> ").concat(item.name, "</span>\n                </div>\n                <div class='price'>\n                    $").concat(item.price / 100, ".00\n                </div>\n                <div id='inputs' class='quantity'>\n                    <input type='number' id='qtyInput + ").concat(item.name, "' value='").concat(item.quantity, "' class='quantity' min='1'>\n                </div>\n                <div class='total subtotals' id='subtotal + ").concat(item.name, "'>$ ").concat(item.quantity * item.price / 100, ".00");
    });
    cartContainer.innerHTML += "\n            <div class=\"basketTotalContainer\">\n            <button type=\"button\" id=\"update-total\" onclick=\"calculate()\" class=\"main-button\">Update Cart</button>\n                <h4 class=\"basketTotalTitle\">Basket Total</h4>\n                <h4 class=\"basketTotal\" id=\"total\">$".concat(cartTotal, ".00</h4>\n            </div>\n        ");
  }

  createCustomerForm();
};

var order = function order(url, data) {
  var response;
  return regeneratorRuntime.async(function order$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(orderObject);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createCustomerForm = function createCustomerForm() {
  if (customerForm) {
    //create and get DOM elements
    var firstNameLabel = document.createElement('label');

    var _firstName = document.createElement('input');

    var lastNameLabel = document.createElement('label');

    var _lastName = document.createElement('input');

    var addressLabel = document.createElement('label');

    var _address = document.createElement('input');

    var cityLabel = document.createElement('label');

    var _city = document.createElement('input');

    var emailLabel = document.createElement('label');

    var _email = document.createElement('input'); //set attributes and innerHTML for elements


    firstNameLabel.setAttribute('for', 'firstName');
    firstNameLabel.innerHTML = "First Name";

    _firstName.setAttribute('type', 'text');

    _firstName.setAttribute('name', 'firstName');

    _firstName.setAttribute('id', 'firstName');

    _firstName.setAttribute('required', 'required');

    _firstName.setAttribute('data-value-missing', 'Field is required');

    customerForm.appendChild(firstNameLabel);
    customerForm.appendChild(_firstName);
    lastNameLabel.setAttribute('for', 'lastName');
    lastNameLabel.innerHTML = "Last Name";

    _lastName.setAttribute('type', 'text');

    _lastName.setAttribute('name', 'lastName');

    _lastName.setAttribute('id', 'lastName');

    _lastName.setAttribute('required', 'required');

    _lastName.setAttribute('data-value-missing', 'Field is required');

    customerForm.appendChild(lastNameLabel);
    customerForm.appendChild(_lastName);
    addressLabel.setAttribute('for', 'address');
    addressLabel.innerHTML = "Address";

    _address.setAttribute('type', 'text');

    _address.setAttribute('name', 'address');

    _address.setAttribute('id', 'address');

    _address.setAttribute('required', 'required');

    _address.setAttribute('data-value-missing', 'Field is required');

    customerForm.appendChild(addressLabel);
    customerForm.appendChild(_address);
    cityLabel.setAttribute('for', 'city');
    cityLabel.innerHTML = "City";

    _city.setAttribute('type', 'text');

    _city.setAttribute('name', 'city');

    _city.setAttribute('id', 'city');

    _city.setAttribute('required', 'required');

    _city.setAttribute('data-value-missing', 'Field is required');

    customerForm.appendChild(cityLabel);
    customerForm.appendChild(_city);
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerHTML = "Email";

    _email.setAttribute('type', 'email');

    _email.setAttribute('name', 'email');

    _email.setAttribute('id', 'email');

    _email.setAttribute('required', 'required');

    _email.setAttribute('data-value-missing', 'Field is required');

    customerForm.appendChild(emailLabel);
    customerForm.appendChild(_email);
  }

  validateForm();
}; //validation for input elements


var regExName = /^[A-Za-z] {3,32}$/;
var regExAddress = /^[A-Za-z0-9 ]{7,32}$/;
var regExEmail = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

var notEmpty = function notEmpty(value) {
  return value !== "" ? true : false;
};

var longEnough = function longEnough(value) {
  return value.length >= 2 ? true : false;
};

var validEmail = function validEmail(value) {
  return value.match(regExEmail) ? true : false;
};

var validAddress = function validAddress(value) {
  return value.match(regExAddress);
};

var validInput = function validInput(value) {
  return notEmpty(value) && longEnough(value);
};

var validateForm = function validateForm() {
  if (firstName.value === "") {
    firstName.style.backgroundColor = 'darkgray';
    firstName.addEventListener('blur', function () {
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

  if (lastName.value === "") {
    lastName.style.backgroundColor = 'darkgray';
    lastName.addEventListener('blur', function () {
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
    address.addEventListener('blur', function () {
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
    city.addEventListener('blur', function () {
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
    email.addEventListener('input', function () {
      if (!validEmail(email.value)) {
        email.style.border = "medium red solid";
        console.log("field is empty");
      } else {
        email.style.border = "medium green solid";
        localStorage.setItem('email', email.value);
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
  };
};

var submitOrderBtn = document.getElementById('submit-order');
submitOrderBtn.addEventListener('click', function _callee($event) {
  var inCart, cFirstName, cLastName, cAddress, cCity, cEmail, validForm, orderId, response, _cartTotal;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          $event.preventDefault();
          inCart = localStorage.getItem('inCart');
          inCart = JSON.parse(inCart); //get items from localStorage

          cFirstName = localStorage.getItem('fName');
          cLastName = localStorage.getItem('lName');
          cAddress = localStorage.getItem('address');
          cCity = localStorage.getItem('city');
          cEmail = localStorage.getItem('email');
          orderObject = {
            customerInformation: {
              firstName: cFirstName,
              lastName: cLastName,
              address: cAddress,
              city: cCity,
              email: cEmail
            },
            orderInformation: inCart
          };
          validForm = validateForm();
          orderId = uuid();

          if (!(validForm !== false)) {
            _context2.next = 20;
            break;
          }

          console.log(orderObject);
          _context2.next = 15;
          return regeneratorRuntime.awrap(order('http://localhost:3000/api/teddies/order', orderObject));

        case 15:
          response = _context2.sent;
          _cartTotal = localStorage.getItem('itemTotals');
          _cartTotal = parseInt(_cartTotal);
          sessionStorage.setItem('customerOrder', JSON.stringify(response));
          location.href = "order.html?id=".concat(response.orderId, "&price=").concat(_cartTotal);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});
cartTotal();
loadCart();
displayCart();