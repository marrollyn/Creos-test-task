export const getСommentApi = () => {
    return fetch("https://sandbox.creos.me/api/v1/comment/?ordering=-date_created", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
};

export const getIssueApi = () => {
    return fetch("https://sandbox.creos.me/api/v1/issue/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
};

export const getDesignerApi = () => {
    return fetch("https://sandbox.creos.me/api/v1/designer/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
};

export const getProjectApi = () => {
    return fetch("https://sandbox.creos.me/api/v1/project/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
};

export function getNextDesignerApi(url: string | null) {
    if (url) {
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        });
    }
}
