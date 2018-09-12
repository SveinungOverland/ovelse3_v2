import { login } from '../services';


export function loginUser(username, password) {
    console.log("Asking for login promise");
    return dispatch => {
        dispatch(request());

        login(username, password)
            .then(user => {
                dispatch(success(user));
            }, error => {
                dispatch(failure(error.toString()));
            })
    };

    function request() { return { type: "LOGIN_ATTEMPT" } }
    function success(user) { return { type: "LOGIN_SUCCESSFUL", payload: user } }
    function failure(error) { return { type: "LOGIN_REJECTED", payload: error } }
}