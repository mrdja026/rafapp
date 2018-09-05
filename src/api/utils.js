const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT'; //hehe
const DELETE = 'DELETE'//hehe

export const myFetch = async (service, requestConfig, requestParams) => {
    let requestData = getRequestData(requestConfig, requestParams);
    console.log('Request to be made', service, requestData);
    try {
        let promise = new Promise((resolve, reject) => {
            fetch(service, requestData).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                }
            }).then(responseJson => {
                resolve(responseJson);
            }).catch((error) => {
                reject(error);
            });
        });
        let result = await promise;
        return result;
    } catch (error) {
        throw Error(error);
    }
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