import pkg from 'mongodb';
const { ObjectId } = pkg;

export const user = {
    login: async (req, res, usersCollection) => {
        let user = await usersCollection.findOne(req.query);
        if (user) {
            console.log('Logged in')
            res.json(user)
        } else {
            res.status(404).json({ "text": "Wrong username or password" });
        }
    },
    register: async (req, res, usersCollection) => {
        let user = await usersCollection.findOne({ login: req.body.login });
        if (user) {
            res.status(400).json({ "text": "This username already exists" });
        } else {
            usersCollection
                .insertOne(req.body)
                .then((response) => res.json(...response.ops));
        }
    },
    getUsers: (req, res, usersCollection) => {
        usersCollection
            .find()
            .toArray()
            .then(response => res.json(response))
            .catch(err => console.log(err))
    },
    getUser: async (req, res, usersCollection) => {
        const { userId } = req.query;
        let user = await usersCollection.findOne({ _id: ObjectId(userId) });
        if (user) {
            res.json(user)
        } else {
            return res.status(404).send("That user does not exists");
        }
    },
    addFriend: async (req, res, usersCollection) => {
        const { userId, friendId } = req.query;
        let user = await usersCollection
            .findOneAndUpdate(
                { _id: ObjectId(userId) },
                { $push: { "friends": friendId } },
                { returnOriginal: false, upsert: true });

        let friendUser = await usersCollection
            .findOneAndUpdate(
                { _id: ObjectId(friendId) },
                { $push: { "friends": userId } },
                { returnOriginal: false, upsert: true });

        console.log('Added to friends')
        res.json({
            user: user.value,
            friendUser: friendUser.value
        })
    },
    removeFriend: async (req, res, usersCollection) => {
        const { userId, friendId } = req.query;
        let user = await usersCollection
            .findOneAndUpdate(
                { _id: ObjectId(userId) },
                { $pull: { "friends": friendId } },
                { returnOriginal: false, upsert: true });

        let friendUser = await usersCollection
            .findOneAndUpdate(
                { _id: ObjectId(friendId) },
                { $pull: { "friends": userId } },
                { returnOriginal: false, upsert: true });

        if (user && friendUser) {
            res.json({
                user: user.value,
                friendUser: friendUser.value
            })
        } else {
            return res.status(404).send("These users does not exists");
        }
    },
    sendMessage: async (req, res, usersCollection) => {
        const { senderId, senderName, text, to, date } = req.query;
        await usersCollection
            .findOneAndUpdate(
                { login: to },
                {
                    $push: {
                        "inbox": {
                            senderId,
                            senderName,
                            text,
                            to,
                            date,
                            id: new ObjectId()
                        }
                    }
                },
                { returnOriginal: false, upsert: true })
            .then(response => console.log('Message sent'))
            .catch(err => console.log(err));

        await usersCollection
            .findOneAndUpdate(
                { _id: ObjectId(senderId) },
                {
                    $push: {
                        "sent": {
                            senderId,
                            senderName,
                            text,
                            to,
                            date,
                            id: new ObjectId()
                        }
                    }
                },
                { returnOriginal: false, upsert: true })
            .then(response => { res.json(response.value) })
            .catch(err => console.log(err));
    },
    removeMessage: async (req, res, usersCollection) => {
        const { id, login, box } = req.query;
        await usersCollection
            .findOneAndUpdate(
                { login },
                {
                    $pull: {
                        [box]:
                            { id: ObjectId(id) }
                    }
                },
                { returnOriginal: false, upsert: true }
            )
            .then(response => {
                res.json(response.value)
            })
            .catch(err => console.log(err))
    }
}