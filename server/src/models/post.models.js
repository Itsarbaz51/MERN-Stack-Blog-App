import mongoose,{Schema} from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"],
            message: "value is not supported",
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        thumbnail: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema)