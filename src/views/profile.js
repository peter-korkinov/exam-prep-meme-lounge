import {html} from '/src/lib.js';
import {getAllRecordsOfUserId} from "../api/data.js";
import {notify} from "../common/notify.js";
import {getUserData} from "../common/util.js";


const profileTemplate = (memes, userData) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" 
                 src="${
                            userData.gender === 'female'
                            ? '/images/female.png'
                            : '/images/male.png'
                        }">
            <div class="user-content">
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${
                memes.length === 0
                ? html`<p class="no-memes">No memes in database.</p>`
                : memes.map(memeCardTemplate)
            }
        </div>
    </section>
`;

const memeCardTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
        <a class="button" href="${`/details/${meme._id}`}">Details</a>
    </div>
`;

async function myProfilePage(ctx) {
    try {
        const userData = getUserData();
        const memes = await getAllRecordsOfUserId(userData.id);
        ctx.render(profileTemplate(memes, userData));
    } catch (err) {
        notify('error', err);
    }
}

export {
    myProfilePage
};