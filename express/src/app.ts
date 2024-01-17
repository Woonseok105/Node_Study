import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { expressRouter } from './router/router';
import { CustomException, NotFoundException } from './exception/exception';

const app: Application = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

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
export const userRepository = appDataSource.getRepository(UserEntity);

appDataSource.initialize()
    .then(() => console.log('database Connected'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

app.use('/', expressRouter());

app.use((req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundException('url not found');
});

app.use((err: CustomException, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const statusCode: number = err.statusCode || 500;
    res.status(statusCode)
        .json({
            statusCode: statusCode,
            message: err.message,
            timeStamp: new Date()
        });
});

app.listen(8080, () => {
    console.log('server is Running...');
});