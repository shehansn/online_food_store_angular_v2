import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.CONNECTION_STRING!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Online_Food_Store_Database_v2_1"
    } as ConnectOptions).then(
        () => console.log("MongoDb Database connect successfully"),
        (error) => console.log('Database connection error', error)
    )
}