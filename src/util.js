import {deleteProductById, getProductById} from "./api/data.js";
// import {showModal} from "./common/modal.js";

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

async function loadProduct(ctx, next) {
    ctx.productPromise = getProductById(ctx.params.id);
    next();
}

async function deleteProduct(ctx) {
    // showModal('Are you sure you want to delete this item?', onSelect);
    //
    // async function onSelect(choice) {
    //     if (choice) {
    //         await deleteProductById(ctx.params.id);
    //         ctx.page.redirect('/home');
    //     }
    // }

}

function isValidUrl(str) {
    let a  = document.createElement('a');
    a.href = str;
    return (a.host && a.host !== window.location.host);
}

function parseQueryString(string) {
    return string
        .split('&')
        .map(p => p.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
}

export {
    getUserData,
    setUserdata,
    clearUserData,
    isLogged,
    loadProduct,
    deleteProduct,
    isValidUrl,
    parseQueryString
};