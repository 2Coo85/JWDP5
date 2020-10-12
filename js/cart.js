makeRequest = () => {
    return new Promise((resolve, reject) => {
        let order = () => {
            return contact;
            return productArray;
            return orderID;
        }
        let apiRequest = new XMLHttpRequest();
        
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject("API request failed");
                }
            }
        };
        apiRequest.setRequestHeader('Content-Type', 'application/json');
        apiRequest.send();
    });
};



//submit form data

async  submitForm = (createCustomerCard) => {
    try {
        const requestPromise = makeRequest(createCustomerCard);
        const response = await requestPromise;
        
        confirmationDisplay(response);
    } catch (error){
        document.querySelector('main-content').innerHTML = '<h2>'+ error + '</h2>';
    }
}




createCustomerCard = (response) => {
    const customerFirstName = document.createElement('input');
    const customerLastName = document.createElement('input');
    const paymentBox = document.getElementById('customer-info');
    const customerEmail = document.createElement('input');
    const customerAddress = document.createElement('input');
    const customerCity = document.createElement('input');
    const customerInput = document.getElementById('customer-info');
    
    customerFirstName.setAttribute('type' 'text');
    customerLastName.setAttribute('type', 'text');
    customerAddress.setAttribute('type', 'text');
    customerCity.setAttribute('type', 'text');
    customerEmail.setAttribute('type', 'email');
    
    customerInput.appendChild(customerFirstName);
    customerInput.appendChild(customerLastName);
    customerInput.appendChild(customerAddress);
    customerInput.appendChild(customerCity);
    customerInput.appendChild(customerEmail);
};

init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        
        createCustomerCard(response);
    } catch (error) {
        document.getElementById('customer-info').innerHTML = '<h2>' + error + '</h2>';
    }
};

init();