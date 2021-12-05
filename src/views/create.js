import {html} from '/src/lib.js';
import {createRecord} from "../api/data.js";
import {notify} from "../common/notify.js";
import {onSubmit} from "../common/util.js";


async function createPage(ctx) {
    try {
        ctx.render(createTemplate(onSubmit, ctx));
    } catch (err) {
        notify('error', err);
    }
}

const createTemplate = (onSubmit, ctx) => html`
    <section id="create-meme">
        <form id="create-form" @submit=${(event) => onSubmit(event, ctx, createRecord)}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

export {
    createPage
};