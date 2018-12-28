import { Users } from './Users';

let currentUser = null;

export function login(username, password) {
    currentUser = Users.find((user) => {
        return user.username === username && user.signUpPassword === password;
    });
}

export function logout() {
    currentUser = null;
}

export function isLoggedIn() {
    return currentUser !== null;
}

export function getCurrentUser() {
    return currentUser;
}