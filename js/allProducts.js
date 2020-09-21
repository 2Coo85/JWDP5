makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
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
}

createProductBox = (response) => {
    const productListing = document.getElementById('product-listing');
    for (var product of response){
        productListing.innerHTML += "<a id='listItemButton' class='products' href='singleItem.html?id=" + product._id + "'><div id='" + product._id + "'><img src='" + product.imageUrl + "' width='150' height='125'><h4>" + product.name + "</h4><h5>$" + (product.price)/100 + ".00</h5></div></a>";
    }
}

init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        createProductBox(response);
    } catch (error) {
        document.querySelector('main-content').innerHTML = '<h2>' + error + '</h2>';
    }
}

init();