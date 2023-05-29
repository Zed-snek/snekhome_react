import api from "./apiConfiguration"


export async function getRequestWithAuth(link) {
    return (await api.get('/auth' + link,
        { headers: {"Authorization": localStorage.getItem('authToken') }
    }) ).data
}

export async function getRequest(link) {
    return (await api.get(link) ).data
}

export async function putRequestWithAuth(link, data) {
    return (await api.put('/auth' + link, data, {
        headers:
            {"Authorization": localStorage.getItem('authToken')}
    }) ).data
}

export async function postParamsRequest(link) {
    return (await api.post(link) ).data
}


export async function postBodyRequest(link, data) {
    return (await api.post(link, data) ).data
}

export async function postBodyRequestWithAuth(link, data) {
    return (await api.post('/auth' + link, data,
        {
            headers: {"Authorization": localStorage.getItem('authToken')}
        })
    ).data
}

export async function deleteRequestWithAuth(link) {
    return (await api.delete('/auth' + link,
            {
                headers: {"Authorization": localStorage.getItem('authToken')}
            })
    ).data
}




