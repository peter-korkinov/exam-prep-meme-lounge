import {html} from '/src/lib.js';
import {editRecordById} from "../api/data.js";
import {notify} from "../common/notify.js";


async function editPage(ctx) {
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title && description && imageUrl) {
            try {
                await editRecordById(ctx.params.id, {title, description, imageUrl});
                ctx.page.redirect('/home');
            } catch(err) {
                notify('error', err);
            }
        } else {
            notify('error', 'All fields are required!');
        }
    }

    const meme = await ctx.recordPromise;

    ctx.render(editTemplate(meme, onSubmit));
}

const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
        <form id="edit-form" @submit=${onSubmit}>
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