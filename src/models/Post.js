import mongoose, {Schema} from "mongoose";

const PostModel = new Schema(
    {
        title: String,
        text:  String,
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', PostModel);

export default Post
