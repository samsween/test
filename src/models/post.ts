import mongoose from "mongoose";

export interface IBlog {
	_id: string;
	name: string;
	description: string;
}

const blogSchema = new mongoose.Schema<IBlog>({
	name: String,
	description: String,
});


export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
