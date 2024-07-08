import connectMongo from "@/lib/connect-mongo";
import { Blog, IBlog } from "@/models/post";


async function getBlogs() {
  await connectMongo();
  const blogs = await Blog.find();
  return blogs;
}

export default async function Home() {
  const blogs = await getBlogs() as IBlog[];
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 text-white">
        {JSON.stringify(blogs)}
        {
          blogs.map((blog) => (
            <div key={blog._id} className="p-4">
              <h1 className="text-2xl font-bold">{blog.name}</h1>
              <p>{blog.description}</p>
            </div>
          ))
        }
      </div>
    </div>

  );
}
