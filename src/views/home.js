import {html, until} from '/src/lib.js';
import {isLogged} from "../common/util.js";
import {getAllRecords} from "../api/data.js";


function homePage(ctx) {
    if (isLogged()) {
        ctx.render(catalogTemplate(loadMemes()));
    } else {
        ctx.render(welcomeTemplate());
    }
}

async function loadMemes() {
    const memes = await getAllRecords();
    return memes.map(memeCardTemplate);
}

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

const catalogTemplate = (memesPromise) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${until(memesPromise, html`<p>Loading &hellip;</p>`)}
            

<!--            <p class="no-memes">No memes in database.</p>-->
        </div>
    </section>
`;

const memeCardTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="${`/details/${meme._id}`}">Details</a>
            </div>
        </div>
    </div>
`;

export {
    homePage
};