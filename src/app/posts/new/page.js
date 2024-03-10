import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
    async function handleSavePost(formData) {
        "use server";
        console.log("Saving post to the database...");

        const title = formData.get("title");
        const content = formData.get("content");

        await sql`INSERT INTO posts (title, content) VALUES (${title}, ${content})`;
        console.log("Post saved!");
        revalidatePath("/posts");
        redirect("/posts");
    }

    return (
        <form action={handleSavePost}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" />
            <button type="submit">Save</button>
        </form>
    );
}

