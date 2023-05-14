import axios from "axios";

const api = process.env.REACT_APP_API_LINK

export async function getRequestWithAuth(link) {
    return (await axios.get(api + '/auth' + link,
        { headers: {"Authorization": localStorage.getItem('authToken') }
    }) ).data
}

export async function getRequest(link) {
    return (await axios.get(api + link) ).data
}

export async function putRequestWithAuth(link, data) {
    return (await axios.put(api + '/auth' + link, data, {
        headers:
            {"Authorization": localStorage.getItem('authToken')}
    }) ).data
}

export async function postParamsRequest(link) {
    return (await axios.post(api + link) ).data
}


export async function postBodyRequest(link, data) {
    return (await axios.post(api + link, data) ).data
}

export async function postBodyRequestWithAuth(link, data) {
    return (await axios.post(api + '/auth' + link, data,
        {
            headers: {"Authorization": localStorage.getItem('authToken')}
        })
    ).data
}

export async function deleteRequestWithAuth(link) {
    return (await axios.delete(api + '/auth' + link,
            {
                headers: {"Authorization": localStorage.getItem('authToken')}
            })
    ).data
}




