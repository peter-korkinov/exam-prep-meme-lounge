import {getRecordById} from "../api/data.js";

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function setUserdata(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

function isLogged() {
    return !(sessionStorage.getItem('userData') === null);
}

async function loadRecord(ctx, next) {
    ctx.recordPromise = getRecordById(ctx.params.id);
    next();
}

export {
    getUserData,
    setUserdata,
    clearUserData,
    isLogged,
    loadRecord
};