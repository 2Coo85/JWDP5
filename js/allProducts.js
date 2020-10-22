createProductBox = (response) => {
    const productListing = document.getElementById('product-listing');
    for (var product of response) {
        productListing.innerHTML += "<a id='listItemButton' class='products' href='singleItem.html?id=" + product._id + "'><div id='" + product._id + "'><img src='" + product.imageUrl + "' width='120' height='100'><h4 style='font-size: 1.1em'>" + product.name + "</h4><h5 style='font-size: 1em'>$" + (product.price) / 100 + ".00</h5></div></a>";
    }
}

const init = async () => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        createProductBox(response);
    } catch (error) {
        document.querySelector('.main-content').innerHTML = '<h2>' + error + '</h2>';
    }
}

init();
