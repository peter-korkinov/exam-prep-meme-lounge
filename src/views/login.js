import {html} from '/src/lib.js';
import {login} from "../api/data.js";
import {notify} from "../common/notify.js";


function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email && password) {
            try {
                await login(email, password);
                ctx.updateNavBar();
                ctx.page.redirect('/home');
            } catch (err) {
                notify('error', err);
            }
        } else {
            notify('error', 'All fields are required!');
        }
    }
}



const loginTemplate = (onSubmit) => html`
    <section id="login">
        <form id="login-form" @submit=${onSubmit}>
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

export {
    loginPage
};