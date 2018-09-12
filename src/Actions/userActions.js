import { login } from '../services';


export function loginUser(username, password) {
    console.log("Asking for login promise");
    return dispatch => {
        console.log("Dispatching request");
        dispatch(request());

        console.log("Running login from services");
        login(username, password)
            .then(user => {
                console.log("Login was successful, dispatching success");
                dispatch(success(user));
            }, error => {
                console.log("Login was unsuccessful, dispatching failure");
                dispatch(failure(JSON.parse(error.body).error));
            })
    };

    function request() { return { type: "LOGIN_ATTEMPT" } }
    function success(user) { return { type: "LOGIN_SUCCESSFUL", payload: user } }
    function failure(error) { return { type: "LOGIN_REJECTED", payload: error } }
}