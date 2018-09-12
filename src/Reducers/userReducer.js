export default function reducer(state = {
    user: {
        username: "",
        notifications: [],
    },
    fetched: false,
    fetching: false,
    error: null,
}, action) {

    switch (action.type) {

        case "LOGIN_ATTEMPT": {
            return {...state, fetching: true}
        }

        case "LOGIN_SUCCESSFUL": {
            return {...state, fetched: true, user: action.payload, fetching: false}
        }

        case "LOGIN_REJECTED": {
            return {...state, error: action.payload, fetching: false}
        }

        default: return {...state}

    }

}