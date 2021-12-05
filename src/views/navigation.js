import {html} from '/src/lib.js';


const loggedInTemplate = (username, onLogout) => html`
    <a href="/catalog">All Memes</a>
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${username}</span>
            <a href="/my-profile">My Profile</a>
            <a id="logout-btn" href="javascript:void(0)" @click=${onLogout}>Logout</a>
        </div>
    </div>
`;

const guestTemplate = () => html`    
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/home">Home Page</a>
    </div>
    <a href="/catalog">All Memes</a>
`;

export {
    loggedInTemplate,
    guestTemplate
};
