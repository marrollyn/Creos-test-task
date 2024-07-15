export const getСommentApi = () => {
    return fetch(('https://sandbox.creos.me/api/v1/comment/'), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
    return res.json();
    })
    .then((res) => console.log(res));
}
//getСommentApi ();

export const getIssueApi = () => {
    return fetch(('https://sandbox.creos.me/api/v1/issue/'), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
    return res.json();
    })
    .then((res) => console.log(res));
}
//getIssueApi ();

export const getDesignerApi = () => {
    return fetch(('https://sandbox.creos.me/api/v1/designer/'), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
    return res.json();
    })
    .then((res) => console.log(res));
}
//getDesignerApi();

export const getProjectApi = () => {
    return fetch(('https://sandbox.creos.me/api/v1/project/'), {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
    return res.json();
    })
    .then((res) => console.log(res));
}
//getProjectApi();