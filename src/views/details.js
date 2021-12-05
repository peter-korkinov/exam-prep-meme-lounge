import {html} from '/src/lib.js';
import {getUserData, isLogged} from "../common/util.js";
import {deleteRecordById} from "../api/data.js";
import {notify} from "../common/notify.js";


async function detailsPage(ctx) {
    ctx.render(detailsTemplate(await loadMeme(ctx), onDelete));

    async function onDelete(event) {
        try {
            await deleteRecordById(event.target.value);
            ctx.page.redirect('/home');
        } catch (err) {
            notify('error', err);
        }
    }
}

async function loadMeme(ctx) {
    try {
        const meme = await ctx.recordPromise;

        if (isLogged() && getUserData().id === meme._ownerId) {
            meme.isOwner = true;
        }

        return meme;
    } catch (err) {
        notify('error', err);
    }
}

const detailsTemplate = (meme, onDelete) => html`
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
                        <button class="button danger" value="${meme._id}" @click=${onDelete}>Delete</button>`
                    : null    
                }
                
            </div>
        </div>
    </section>
`;

export {
    detailsPage
};