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