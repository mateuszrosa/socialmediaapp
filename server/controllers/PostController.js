import pkg from 'mongodb';
const { ObjectId } = pkg;
import { Post } from '../models';

export const post = {
    addPost: async (req, res) => {
        try {
            const post = await new Post(req.body).save()
            res.json(post);
        } catch (e) {
            res.sendStatus(400)
        }
    },
    removePost: async (req, res) => {
        const { id } = req.query;
        try {
            const post = await Post
                .findByIdAndDelete(ObjectId(id))
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to remove" });
            } else {
                res.json(post)
            }
        } catch (e) {
            res.sendStatus(500)
        }
    },
    editPost: async (req, res) => {
        const { id, text } = req.query;
        try {
            const post = await Post
                .findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: { "text": text } },
                    { returnOriginal: false, upsert: true })
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to edit" });
            } else {
                res.json(post);
            }
        } catch (e) {
            res.sendStatus(500)
        }
    },
    addLikeToPost: async (req, res) => {
        const { id, userId } = req.query;
        try {
            const post = await Post
                .findByIdAndUpdate(
                    ObjectId(id),
                    { $inc: { "likes": 1 }, $push: { "likedBy": userId } },
                    { returnOriginal: false, upsert: true })
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to add like" });
            } else {
                res.json(post);
            }
        } catch (e) {
            res.sendStatus(500)
        }
    },
    addComment: async (req, res) => {
        const { id, userId, text, login, date } = req.query;
        try {
            const post = await Post
                .findByIdAndUpdate(
                    ObjectId(id),
                    {
                        $push: {
                            "comments": {
                                id: new ObjectId(),
                                userId,
                                text,
                                login,
                                date
                            }
                        }
                    },
                    { returnOriginal: false, upsert: true }
                )
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to add comment" });
            } else {
                res.json(post);
            }
        } catch (e) {
            res.sendStatus(500);
        }
    },
    removeComment: async (req, res) => {
        const { id, commentId } = req.query;
        try {
            const post = await Post
                .findByIdAndUpdate(
                    ObjectId(id),
                    {
                        $pull: {
                            "comments":
                                { id: ObjectId(commentId) }
                        }
                    },
                    { returnOriginal: false, upsert: true }
                )
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to remove comment" });
            } else {
                res.json(post)
            }
        } catch (e) {
            res.sendStatus(500);
        }
    },
    editComment: async (req, res) => {
        const { id, commentId, text, date } = req.query;
        try {
            const post = await Post
                .findOneAndUpdate(
                    { _id: ObjectId(id), "comments.id": ObjectId(commentId) },
                    { $set: { "comments.$.text": text, "comments.$.date": date } },
                    { returnOriginal: false, upsert: true })
            if (!post) {
                res.status(404).json({ "message": "Cannot find post to edit comment" })
            } else {
                res.json(post)
            }
        } catch (e) {
            res.sendStatus(500);
        }

    },
    getPost: async (req, res) => {
        const { id } = req.query;
        try {
            const post = await Post
                .findById(ObjectId(id))
            if (!post) {
                res.status(404).json({ "message": "Cannot find post" });
            } else {
                res.json(post)
            }
        } catch (e) {
            res.sendStatus(500);
        }
    },
    getUsersPosts: async (req, res) => {
        const { userId } = req.query;
        try {
            const posts = await Post
                .find({ userId })
            if (!posts) {
                res.status(404).json({ "message": "Cannot find user's posts" });
            } else {
                res.json(posts);
            }
        } catch (e) {
            res.sendStatus(500);
        }

    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post
                .find()
            if (!posts) {
                res.status(404).json({ "message": "Cannot find posts" });
            } else {
                res.json(posts)
            }
        } catch (e) {
            res.sendStatus(500);
        }
    }
}