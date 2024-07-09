import connectMongo from "@/lib/connect-mongo";
import { Blog, IBlog } from "@/models/post";
import { revalidatePath } from "next/cache";
async function getBlogs() {
  await connectMongo();
  const blogs = await Blog.find();
  return JSON.parse(JSON.stringify(blogs)) as IBlog[];
}

async function createBlog(data: FormData) {
  "use server";
  await connectMongo();
  const blog = new Blog({
    name: "Blog 4",
    description: "Description 4",
  });
  revalidatePath("/");
  await blog.save();
}

export default async function Home() {
  const blogs = (await getBlogs()) as IBlog[];
  return (
    <div className="container mx-auto">
      {JSON.stringify(blogs)}
      <div className="grid grid-cols-4 text-white">
        <form className="p-4" action={createBlog}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="description" placeholder="Description" />
          <button type="submit">Create</button>
        </form>
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4">
            <h1 className="text-2xl font-bold">{blog.name}</h1>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
