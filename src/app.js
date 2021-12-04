import {isLogged, loadProduct, deleteProduct, getUserData} from "./common/util.js";
import { page, render } from "./lib.js";
import {logout} from "./api/data.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {guestTemplate, loggedInTemplate} from "./views/navigation.js";


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
    // notify(await logout());
    await logout();
    updateUserNav();
    page('/home');
}

const navBar = document.querySelector('nav');
const root = document.querySelector('main');

page(decorateContext)
page('/home', homePage);
page('/', '/home');
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();