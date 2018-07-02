const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT'; //hehe
const DELETE = 'DELETE'//hehe

export const myFetch = async (service, requestConfig, requestParams) => {
    let requestData = getRequestData(requestConfig, requestParams);
    console.log('Request to be made', requestData);
    let promise = new Promise((resolve, reject) => {
        fetch(service, requestData).then(response => {
            if (response.ok) {
                console.log('Request ok response', response);
                return response.json();
            } else {
                console.log('Response not ok', response);
                reject(response);
            }
        }).then(responseJson => {
            resolve(responseJson);
        }).catch(error => {
            let _error = 'Error parsing json' + error;
            reject(_error);
        });
    });
    let result = await promise;
    return result;
}

const getRequestData = (requestConfig, requestParams) => {
    if (requestConfig) {
        if (requestConfig.method == GET) {
            let response = Object.assign({}, defaultRequestConfig);
            return { ...response, method: GET };
        } else if (requestConfig.method == POST) {
            let response = Object.assign({}, defaultRequestConfig);
            return { ...response, method: POST, body: JSON.stringify(requestParams) };
        }
    }
}

const defaultRequestConfig = {
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
}