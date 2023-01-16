import pkg from 'mongodb';
const { ObjectId } = pkg;
import { User } from '../models';

export const user = {
    login: async (req, res) => {
        let user = await User.findOne({ login: req.query.login }).select('+password');
        if (!user) {
            return res.status(404).json({ "message": "Wrong login!" });
        }
        const isPasswordValid = user.comparePassword(req.query.password);
        if (!isPasswordValid) {
            return res.status(404).json({ "message": "Wrong password!" });
        }
        console.log('Logged In!');
        user.password = undefined;
        res.json(user);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        try {
            const newUser = await user.save();
            res.json(newUser);
        } catch (e) {
            return res.status(400).json(e.errors);
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users)
        } catch (e) {
            return res.sendStatus(400)
        }
    },
    getUser: async (req, res) => {
        const { userId } = req.query;
        let user = await User.findById(ObjectId(userId));
        if (user) {
            res.json(user)
        } else {
            return res.status(404).json({ "message": "That user does not exists" });
        }
    },
    addFriend: async (req, res) => {
        const { userId, friendId } = req.query;
        try {
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
            if (user && friendUser) {
                res.json({
                    user,
                    friendUser
                })
            } else {
                return res.status(404).json({ "message": "These users does not exists" });
            }
        } catch (e) {
            res.sendStatus(500);
        }
    },
    removeFriend: async (req, res) => {
        const { userId, friendId } = req.query;
        try {
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
                return res.status(404).json({ "message": "These users does not exists" });
            }
        } catch (error) {
            return res.sendStatus(500);
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
            res.status(400).json({ "message": "Can not send that message" })
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
            res.status(400).json({ "message": "Can not remove that message" })
        }

    }
}
