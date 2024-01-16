import express, { Application } from 'express';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';

const app: Application = express();

export const appDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qwer1234',
    database: 'typeorm',
    logging: true,
    synchronize: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: []
});
export const userRepository = appDataSource.getRepository(UserEntity)

appDataSource.initialize()
    .then(() => console.log('database Connected'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

app.listen(8080, () => {
    console.log('server is Running...');
});