import {html} from '/src/lib.js';
import {editRecordById} from "../api/data.js";
import {notify} from "../common/notify.js";
import {onSubmit} from "../common/util.js";


async function editPage(ctx) {
    try {
        const meme = await ctx.recordPromise;
        ctx.render(editTemplate(meme, onSubmit, ctx));
    } catch (err) {
        notify('error', err);
    }
}

const editTemplate = (meme, onSubmit, ctx) => html`
    <section id="edit-meme">
        <form id="edit-form" @submit=${(event) => onSubmit(event, ctx, editRecordById)}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" name="title" value="${meme.title}">
                <label for="description">Description</label>
                <textarea id="description" name="description">${meme.description}</textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" name="imageUrl" value="${meme.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export {
    editPage
};