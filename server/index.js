import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';
import { router } from './routes'

dotenv.config();

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    app.use(router);

    mongoose.connect(process.env.NODE_DATABASE, () => {
        console.log('Mongo DB is connected');
    })
})