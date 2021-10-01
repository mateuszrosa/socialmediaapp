import pkg from 'mongodb';
const { ObjectId } = pkg;
import { User } from '../models';

export const user = {
    login: async (req, res) => {
        let user = await User.findOne(req.query);
        if (user) {
            console.log('Logged in')
            res.json(user)
        } else {
            res.status(404).json({ "text": "Wrong username or password!" });
        }
    },
    register: async (req, res) => {
        let isUser = await User.findOne({ login: req.body.login });
        if (isUser) {
            res.status(400).json({ "text": "This username already exists" });
        } else {
            const user = new User(req.body);
            try {
                const newUser = await user.save();
                res.json(newUser);
            } catch (e) {
                console.log(e)
            }
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    },
    getUser: async (req, res) => {
        const { userId } = req.query;
        let user = await User.findById(ObjectId(userId));
        if (user) {
            res.json(user)
        } else {
            return res.status(404).send("That user does not exists");
        }
    },
    addFriend: async (req, res) => {
        const { userId, friendId } = req.query;
        let user = await User
            .findByIdAndUpdate(
                ObjectId(userId),
                { $push: { "friends": friendId } },
                { returnOriginal: false, upsert: true });

        let friendUser = await User
            .findByIdAndUpdate(
                ObjectId(friendId),
                { $push: { "friends": userId } },
                { returnOriginal: false, upsert: true });
        res.json({
            user,
            friendUser
        })
    },
    removeFriend: async (req, res) => {
        const { userId, friendId } = req.query;
        let user = await User
            .findByIdAndUpdate(
                ObjectId(userId),
                { $pull: { "friends": friendId } },
                { returnOriginal: false, upsert: true });

        let friendUser = await User
            .findByIdAndUpdate(
                ObjectId(friendId),
                { $pull: { "friends": userId } },
                { returnOriginal: false, upsert: true });

        if (user && friendUser) {
            res.json({
                user,
                friendUser
            })
        } else {
            return res.status(404).send("These users does not exists");
        }
    },
    sendMessage: async (req, res) => {
        const { senderId, senderName, text, to, date } = req.query;
        try {
            await User
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

            const sender = await User
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
            res.json(sender);
        } catch (e) {
            console.log(e);
        }
    },
    removeMessage: async (req, res) => {
        const { id, login, box } = req.query;
        try {
            const user = await User
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
            res.json(user);
        } catch (e) {
            console.log(e);
        }

    }
}