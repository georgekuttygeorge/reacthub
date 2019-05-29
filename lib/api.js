import axios from 'axios'

export default function request(type, url, params) {

    switch (type) {
        case 'get':
            return axios.get(url, { params: params, })
                .then(function (response) {
                    console.log("Get Response", response)
                    return response.data
                })
                .catch(function (error) {
                    console.log("Server Error", error)
                    console.log("Server response", error.response)
                    return error.response.data
                })
            break;
        case 'post':
            return axios.post(url, params)
                .then(function (response) {
                    console.log("Post response", response)
                    return response.data
                })
                .catch(function (error) {
                    console.log("Server Error", error)
                    console.log("Server response", error.response)
                    return error.response.data
                })
            break;
        default:
            break;
    }
}