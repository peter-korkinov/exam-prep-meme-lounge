import {isLogged, loadProduct, deleteProduct, getUserData} from "./util.js";
import { page, render } from "./lib.js";
import {logout} from "./api/data.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";


function updateUserNav() {
    if (isLogged()) {
        document.querySelector('nav .user').style.display = '';
        document.querySelector('nav .guest').style.display = 'none';
        document.querySelector('nav .user span').textContent = `Welcome, ${getUserData().username}`
    } else {
        document.querySelector('nav .user').style.display = 'none';
        document.querySelector('nav .guest').style.display = '';
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

const root = document.querySelector('main');
document.getElementById('logout-btn').addEventListener('click', onLogout);

page(decorateContext)
page('/home', homePage);
page('/', '/home');
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();