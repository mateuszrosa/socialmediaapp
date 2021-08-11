import pkg from 'mongodb';
const { ObjectId } = pkg;

export const post = {
    addPost: async (req, res, postsCollection) => {
        const { userId, text, login, likes, likedBy, date, comments } = req.body;
        postsCollection
            .insertOne(
                {
                    userId,
                    text,
                    login,
                    likes,
                    likedBy,
                    date,
                    comments
                }
            )
            .then(response => res.json(...response.ops))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
    },
    removePost: async (req, res, postsCollection) => {
        const { id } = req.query;
        await postsCollection
            .findOneAndDelete(
                { _id: ObjectId(id) }
            )
            .then((response) => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(() => res.sendStatus(500));
    },
    editPost: async (req, res, postsCollection) => {
        const { id, text } = req.query;
        await postsCollection
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: { "text": text } },
                { returnOriginal: false, upsert: true })
            .then((response) => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(err => console.log(err))
    },
    addLikeToPost: async (req, res, postsCollection) => {
        const { id, userId } = req.query;
        await postsCollection
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $inc: { "likes": 1 }, $push: { "likedBy": userId } },
                { returnOriginal: false, upsert: true })
            .then((response) => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(err => console.log(err))
    },
    addComment: async (req, res, postsCollection) => {
        const { id, userId, text, login, date } = req.query;
        await postsCollection
            .findOneAndUpdate(
                { _id: ObjectId(id) },
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
            .then(response => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(err => console.log(err))
    },
    removeComment: async (req, res, postsCollection) => {
        const { id, commentId } = req.query;
        await postsCollection
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                {
                    $pull: {
                        "comments":
                            { id: ObjectId(commentId) }
                    }
                },
                { returnOriginal: false, upsert: true }
            )
            .then(response => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(err => console.log(err))
    },
    editComment: async (req, res, postsCollection) => {
        const { id, commentId, text, date } = req.query;
        await postsCollection
            .findOneAndUpdate(
                { _id: ObjectId(id), "comments.id": ObjectId(commentId) },
                { $set: { "comments.$.text": text, "comments.$.date": date } },
                { returnOriginal: false, upsert: true }
            )
            .then(response => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response.value);
                }
            })
            .catch(err => console.log(err))
    },
    getPost: async (req, res, postsCollection) => {
        const { id } = req.query;
        await postsCollection
            .findOne(
                { _id: ObjectId(id) }
            )
            .then(response => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response);
                }
            })
            .catch(err => console.log(err))
    },
    getUsersPosts: async (req, res, postsCollection) => {
        const { userId, login } = req.query;
        await postsCollection
            .find({ userId })
            .toArray()
            .then(response => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.json(response);
                }
            })
            .catch(err => console.log(err))
    },
    getPosts: async (req, res, postsCollection) => {
        await postsCollection
            .find()
            .toArray()
            .then((response) => {
                if (!response) {
                    res.sendStatus(404);
                } else {
                    res.send(response)
                }
            })
            .catch(err => console.log(err))
    }
}