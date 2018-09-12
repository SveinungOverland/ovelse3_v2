
export async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log("Attempting fetch");
    return fetch('/login', requestOptions)
            .then(handleResponse)
            .then(user => {
                // Login fungerer hvis det følger med en JWT token
                if (user.jwt) {
                    // Lagre bruker i localStorage
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return user;
            });
}

export function logout() {
    // Fjern bruker fra localstorage
    localStorage.removeItem('user');
}

function handleResponse(res) {
    console.log("Handling response", res);
    return res.text().then(text => {
        const data = text && JSON.parse(text);
        if (!res.ok) {
            if (res.status === 401) {
                // log ut if 401 (not authorized) blir returnert
                logout();
            }

            return Promise.reject(data.error);
        }

        return data;
    })
}