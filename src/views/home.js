import {html, render} from '/src/lib.js';
import {isLogged} from "../util.js";


const welcomeTemplate = () => html`
    <section id="welcome">
        <div id="welcome-container">
            <h1>Welcome To Meme Lounge</h1>
            <img src="/images/welcome-meme.jpg" alt="meme">
            <h2>Login to see our memes right away!</h2>
            <div id="button-div">
                <a href="/login" class="button">Login</a>
                <a href="/register" class="button">Register</a>
            </div>
        </div>
    </section>
`;

const catalogTemplate = () => html`
    <!-- All Memes Page ( for Guests and Users )-->
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
    <!-- Display : All memes in database ( If any ) -->
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">Debugging</p>
                        <img class="meme-image" alt="meme-img" src="/images/2.png">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="#">Details</a>
                    </div>
                </div>
            </div>
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">Java Script</p>
                        <img class="meme-image" alt="meme-img" src="/images/4.png">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="#">Details</a>
                    </div>
                </div>
            </div>
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">Yes, arrays are objects</p>
                        <img class="meme-image" alt="meme-img" src="/images/6.png">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="#">Details</a>
                    </div>
                </div>
            </div>
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">Java Script joke</p>
                        <img class="meme-image" alt="meme-img" src="/images/1.png">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="#">Details</a>
                    </div>
                </div>
            </div>
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">Bad code can present some problems</p>
                        <img class="meme-image" alt="meme-img" src="/images/3.png">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="#">Details</a>
                    </div>
                </div>
            </div>
    <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
        </div>
    </section>
`;

function homePage(ctx) {
    if (isLogged()) {
        ctx.render(catalogTemplate());
    } else {
        ctx.render(welcomeTemplate());
    }
}

export {
    homePage
};