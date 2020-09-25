makeRequest = () => {
    return new Promise((resolve, reject) => {
        const queryString = location.search;
        const urlParameters = new URLSearchParams(queryString);
        const id = urlParameters.get('id');
        
        let apiRequest = new XMLHttpRequest();
        
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/' + id);
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject("API request failed");
                }
            }
        };
        apiRequest.send();
    });
};



createProductBox = (response) => {
    //get DOM elements
    
    const productBox = document.createElement('Article');
    const teddyName = document.createElement('h3');
    const teddyPrice = document.createElement('p');
    const teddyDescription = document.createElement('p');
    const teddyImg = response.imageUrl;
    const image = document.createElement('img');
    const teddyColorsDropDown = document.createElement('select');
    const dropDownLabel = document.createElement('label');
    const form = document.createElement('form');
    const addToCartBtn = document.createElement('button');
    const productDisplay = document.getElementById('productImage-display');
    const detailDisplay = document.getElementById('productDetails');
    const mainDiv = document.createElement('div');
    const asideDiv = document.createElement('div');
    const qtyDropDownLabel = document.createElement('label');
    const qtyDropDown = document.createElement('select');
    
    productDisplay.appendChild(productBox);
    
    mainDiv.classList.add('col-6');
    mainDiv.style.textAlign = 'center';
    productBox.appendChild(mainDiv);
    
    image.setAttribute('src', teddyImg);
    image.classList.add('products');
    image.style.width = '225px';
    image.style.marginTop = '20px';
    mainDiv.appendChild(image);
    mainDiv.innerHTML += '<p style="text-align: center">' + response.description + '</p>';
    
    detailDisplay.appendChild(asideDiv);
    asideDiv.classList.add('col-6');
    asideDiv.style.marginTop = '20px';
    asideDiv.innerHTML += '<h3>' + response.name + '</h3>';
    
    dropDownLabel.innerHTML = "Choose your color: ";
    teddyColorsDropDown.setAttribute('id', 'colorSelection');
    form.appendChild(dropDownLabel);
    form.appendChild(teddyColorsDropDown);
    
    for (let color in response.colors) {
        const selections = document.createElement('option');
        selections.innerHTML = response.colors[color];
        selections.setAttribute('value', response.colors[color]);
        teddyColorsDropDown.appendChild(selections);
    }
    
    asideDiv.innerHTML += '<h5>$' + response.price / 100 + '.00</h5>';
    
    asideDiv.appendChild(form);
    
    addToCartBtn.classList.add('cart-button');
    addToCartBtn.setAttribute('id', 'addToCart');
    addToCartBtn.setAttribute('data-product-id', response._id);
    addToCartBtn.innerHTML = 'Add To Cart';
    
    asideDiv.appendChild(addToCartBtn);
    
    let items = JSON.parse(JSON.stringify(response));
    
    let cartBtn = document.querySelectorAll('.cart-button');
    //click events
    for (let i = 0; i < cartBtn.length; i++) {
        cartBtn[i].addEventListener('click', () => {
            updateCart(items);
            getColor(items);
        });
    }
};

init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        
        createProductBox(response);
    } catch (error) {
        document.getElementById('cart-display').innerHTML = '<h2>' + error + '</h2>';
    }
};

init();
displayCart();