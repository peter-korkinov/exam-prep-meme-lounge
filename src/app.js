import {isLogged, loadRecord, deleteProduct, getUserData} from "./common/util.js";
import { page, render } from "./lib.js";
import {logout} from "./api/data.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {guestTemplate, loggedInTemplate} from "./views/navigation.js";
import {notify} from "./common/notify.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";


function updateUserNav() {
    if (isLogged()) {
        render(loggedInTemplate(getUserData().username, onLogout), navBar);
    } else {
        render(guestTemplate(), navBar);
    }
}

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

async function onLogout() {
    try {
        const message = await logout();
        updateUserNav();
        page('/home');
        notify('info', message);
    } catch (err) {
        notify('error', err);
    }
}

const navBar = document.querySelector('nav');
const root = document.querySelector('main');

page(decorateContext)
page('/home', homePage);
page('/', '/home');
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', loadRecord, detailsPage);
page('/edit/:id', loadRecord, editPage);

updateUserNav();
page.start();