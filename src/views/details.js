import {html} from '/src/lib.js';
import {getUserData, isLogged} from "../common/util.js";


async function detailsPage(ctx) {
    ctx.render(detailsTemplate(await loadMeme(ctx)));
}

async function loadMeme(ctx) {
    const meme = await ctx.recordPromise;
    if (isLogged() && getUserData().id === meme._ownerId) {
        meme.isOwner = true;
    }

    return meme;
}

const detailsTemplate = (meme) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}

        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                ${
                    meme.isOwner
                    ? html`
                        <a class="button warning" href="${`/edit/${meme._id}`}">Edit</a>
                        <button class="button danger">Delete</button>`
                    : null    
                }
                
            </div>
        </div>
    </section>
`;

export {
    detailsPage
};