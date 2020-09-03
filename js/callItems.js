makeRequest = () => {
    return new Promise((resolve, reject) => {
        const queryString = location.search;
        const urlParameters = new URLSearchParams(queryString);
        const id = urlParameters.get('id');
        
        let apiRequest = new XMLHttpRequest();
        
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject("API request failed");
                }
            }
        };
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
    const productDisplay = document.getElementById('singleProduct-display');
    
    productDisplay.appendChild(productBox);
    
    image.setAttribute('src', teddyImg);
    image.style.width = '300px';
    image.style.marginTop = '20px';
    productBox.appendChild(image);
    
    productBox.innerHTML += '<h3>' + response.name + '</h3>';
    
    dropDownLabel.innerHTML = "Choose your color:";
    form.appendChild(dropDownLabel);
    form.appendChild(teddyColorsDropDown);
    
    for (let color in response.colors) {
        const selections = document.createElement('option');
        selections.innerHTML = response.colors[color];
        selections.setAttribute('value', response.colors[color]);
        teddyColorsDropDown.appendChild(selections);
    }
    productBox.appendChild(form);
    
    productBox.innerHTML += '<p>$' + response.price / 100 + '.00</p>';
    productBox.innerHTML += '<p>' + response.description + '</p>';
    
    addToCartBtn.classList.add('cart-button');
    addToCartBtn.innerHTML = 'Add To Cart';
    
    productBox.appendChild(addToCartBtn);
};

init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        
        createProductBox(response);
    } catch (error) {
        document.getElementById('singleProduct-display').innerHTML = '<h2>' + error + '</h2>';
    }
};

init();